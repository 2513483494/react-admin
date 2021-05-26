import React, { Component } from 'react'
import pathName from '../../config/pathName'
import store from 'store'

export default class Line extends Component {
    componentDidMount() {
        store.set('globalTitle',pathName[this.props.location.pathname])
    }
    render() {
        return (
            <div>
                line
            </div>
        )
    }
}
