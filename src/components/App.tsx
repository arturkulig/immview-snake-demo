import * as React from 'react'
import Board from './Board'
import KeyboardControls from './KeyboardControls'
import TouchControls from './TouchControls'
import Points from './Points'

const boardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    padding: '0',
    margin: '0',
    height: '100vh',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
}

export default function App() {
    return (
        <div style={boardStyle} >
            <Board />
            <Points />
            <KeyboardControls />
            <TouchControls />
        </div>
    )
}
