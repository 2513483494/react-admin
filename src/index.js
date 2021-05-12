import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import storageUtils from './utils/storageUtiles'
import memoryUtils from './utils/memoryUtils'

const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App/>, document.getElementById('root'))