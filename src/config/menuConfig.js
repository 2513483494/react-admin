const menuConfig = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        isPublic: true, // 公开的
      },
      {
        title: '商品',
        key: '/products',
        children: [ // 子菜单列表
          {
            title: '品类管理',
            key: '/category',
          },
          {
            title: '商品管理',
            key: '/manage',
          },
        ]
      },
    
      {
        title: '用户管理',
        key: '/user',
      },
      {
        title: '角色管理',
        key: '/role',
      },
    
      {
        title: '图形图表',
        key: '/charts',
        children: [
          {
            title: '柱形图',
            key: '/charts/bar',
          },
          {
            title: '折线图',
            key: '/charts/line',
          },
          {
            title: '饼图',
            key: '/charts/pie',
          },
        ]
      },
    
      {
        title: '订单管理',
        key: '/order',
      },
]

export default menuConfig