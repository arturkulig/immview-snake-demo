import './array.find'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { diagnose } from 'immview'
diagnose.on({
    timeline: false,
    tableSummary: true,
    tableClear: false,
    tableDetails: true,
})
import App from './components/App'
const appContainer = document.createElement('DIV')
document.body.appendChild(appContainer)
ReactDOM.render(<App />, appContainer)
