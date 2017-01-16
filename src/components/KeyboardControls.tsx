import * as React from 'react'
import { default as DirectionDomain, DIRECTIONS } from '../services/DirectionDomain'

enum KEYS {
    SPACE = 32,
    UP = 38,
    DOWN = 40,
    LEFT = 37,
    RIGHT = 39,
};

const DirectionDict = {
    [KEYS.SPACE]: DIRECTIONS.NONE,
    [KEYS.UP]: DIRECTIONS.UP,
    [KEYS.DOWN]: DIRECTIONS.DOWN,
    [KEYS.LEFT]: DIRECTIONS.LEFT,
    [KEYS.RIGHT]: DIRECTIONS.RIGHT,
}

export default class KeyboardControls extends React.Component<{}, {}> {
    stopListening: () => void

    componentDidMount() {
        function handler(event: KeyboardEvent) {
            const direction = DirectionDict[event.keyCode]
            if (direction !== undefined) {
                DirectionDomain.go(direction)
            }
        }
        window.addEventListener('keydown', handler)
        this.stopListening = () => {
            window.removeEventListener('keydown', handler)
        }
    }

    componentWillUnmount() {
        this.stopListening && this.stopListening()
        this.stopListening = null
    }

    render() {
        return null
    }
}