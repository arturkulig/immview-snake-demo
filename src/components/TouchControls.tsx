import * as React from 'react'
import { default as DirectionDomain, DIRECTIONS } from '../services/DirectionDomain'
import Vector from '../services/Vector'

const TouchControlsStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: 3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
}

const touchPeaks = [
    { point: new Vector(0.5, 0), direction: DIRECTIONS.UP },
    { point: new Vector(0.5, 1), direction: DIRECTIONS.DOWN },
    { point: new Vector(0, 0.5), direction: DIRECTIONS.LEFT },
    { point: new Vector(1, 0.5), direction: DIRECTIONS.RIGHT },
]

export default class TouchControls extends React.Component<{}, {}> {
    stopListening: () => void

    handleTouch(event: React.TouchEvent<{}>) {
        const pointed = new Vector(event.touches[0].pageX / window.innerWidth, event.touches[0].pageY / window.innerHeight)
        let leastDistance: number = Number.MAX_VALUE
        let direction: DIRECTIONS
        for (let i = 0; i < touchPeaks.length; i++) {
            const distance = touchPeaks[i].point.distance(pointed)
            if (distance < leastDistance) {
                leastDistance = distance
                direction = touchPeaks[i].direction
            }
        }
        if (direction !== undefined) {
            DirectionDomain.go(direction)
        }
    }

    render() {
        return <div style={TouchControlsStyle} onTouchStart={event => this.handleTouch(event)}></div>
    }
}