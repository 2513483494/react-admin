import React from "react"
import $ from "jquery"
import {
	Chart,
	Coord,
	Tooltip,
	Geom,
	Legend,
	View,
} from "bizcharts"
import DataSet from "@antv/data-set"
import * as turf from "@turf/turf"

// 显示九段线且无交互版：https://codesandbox.io/s/blissful-bird-1i1y5?file=/src/App.js

function keepMapRatio(mapData, c, type) {
	if (mapData && turf) {
		// 获取数据外接矩形，计算宽高比
		const bbox = turf.bbox(mapData)
		const width = bbox[2] - bbox[0]
		const height = bbox[3] - bbox[1]
		const ratio = height / width

		const cWidth = c.width
		const cHeight = c.height
		const cRatio = cHeight / cWidth

		let scale = {}

		if (cRatio >= ratio) {
			const halfDisRatio = (cRatio - ratio) / 2 / cRatio
			scale = {
				x: {
					range: [0, 1],
				},
				y: {
					range: [halfDisRatio, 1 - halfDisRatio],
				},
			}
		} else {
			const halfDisRatio = ((1 / cRatio - 1 / ratio) / 2) * cRatio
			scale = {
				y: {
					range: [0, 1],
				},
				x: {
					range: [halfDisRatio, 1 - halfDisRatio],
				},
			}
		}
		const curScaleXRange = c.getScaleByField('x').range
		const curScaleYRange = c.getScaleByField('y').range
		console.log(curScaleYRange, scale.y.range)
		debugger
		if (
			curScaleXRange[0] !== scale.x.range[0] ||
			curScaleXRange[1] !== scale.x.range[1] ||
			curScaleYRange[0] !== scale.y.range[0] ||
			curScaleYRange[1] !== scale.y.range[1]
		) {
			setTimeout(() => {
				c.scale(scale)
				c.render(true)
			}, 1)
		}
	}
}

class Pie extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mapData: undefined,
		}
	}
	componentDidMount() {
		const dataUrl =
			"https://gw.alipayobjects.com/os/bmw-prod/d4652bc5-e971-4bca-a48c-5d8ad10b3d91.json"
		$.ajax({
			url: dataUrl,
			success: (d) => {
				const feas = d.features
					.filter((feat) => feat.properties.name)
					.map((v) => {
						return {
							...v,
							properties: {
								...v.properties,
								size: Math.floor(Math.random() * 300),
							},
						}
					})
				const res = { ...d, features: feas }
				this.setState({ mapData: res })
			},
		})
	}

	render() {
		const { mapData } = this.state

		let bgView
		if (mapData) {
			// data set
			const ds = new DataSet()

			// draw the map
			const dv = ds
				.createView("back")
				.source(mapData, {
					type: "GeoJSON",
				})
				.transform({
					type: "geo.projection",
					projection: "geoMercator",
					as: ["x", "y", "centroidX", "centroidY"],
				})

			bgView = new DataSet.View().source(dv.rows)


		}

		const scale = {
			x: { sync: true },
			y: { sync: true },
		}

		const centerData = bgView
			? bgView.rows.map((p) => {
				return {
					x: p.centroidX,
					y: p.centroidY,
					name: p.nam,
					size: p.properties.size,
				}
			})
			: []

		return (
			<div style={{ width: "100%" }}>
				{
					<Chart
						// 清空默认的坐标轴legend组件
						pure
						height={500}
						scale={scale}
						// 不支持dataSet数据格式了
						data={bgView ? bgView.rows : bgView}
						autoFit
						placeholder={<div>Loading</div>}
						padding="20"
						onAfterRender={(e, c) => {
							keepMapRatio(this.state.mapData, c, "rerender")
						}}
					>
						<Coord reflect="y" />
						<Tooltip title="name" />
						<Legend />
						<View data={bgView ? bgView.rows : bgView}>
							<Geom
								type="polygon"
								position="x*y"
								color="#007090"
								style={{
									stroke: "#ccc",
								}}
								// tooltip={[
								// 	"name*properties",
								// 	(t, p) => {
								// 		return {
								// 			//自定义 tooltip 上显示的 title 显示内容等。
								// 			name: "Size",
								// 			title: t,
								// 			value: p.size,
								// 		}
								// 	},
								// ]}
								tooltip={false}
								label='name'
							></Geom>
						</View>
						<View data={centerData}>
							<Geom
								type="point"
								position="x*y"
								color={["size", "#00ff00-#ff0000"]}
								size="size"
								shape="circle"
							></Geom>
						</View>
					</Chart>
				}
			</div>
		)
	}
}
// CDN END
export default Pie