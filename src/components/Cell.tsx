import * as React from 'react'
import { BOARD_SIZE } from '../config'
import { FIELD_TYPES } from '../services/BoardDomain'

export default class CellComponent extends React.Component<{ cell: FIELD_TYPES }, {}> {
    unsubscribeFromAll: () => void

    componentWillMount() {
        const handleResizeBound = () => this.handleResize()
        window.addEventListener('resize', handleResizeBound)
        this.unsubscribeFromAll = () => {
            window.removeEventListener('resize', handleResizeBound)
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromAll && this.unsubscribeFromAll()
        this.unsubscribeFromAll = null
    }

    shouldComponentUpdate(nextProps) {
        return this.props.cell !== nextProps.cell
    }

    handleResize() {
        this.forceUpdate()
    }

    render() {
        const cellStyle = {
            float: 'left',
            width: Math.min(window.innerWidth, window.innerHeight) * 0.8 / BOARD_SIZE,
            height: Math.min(window.innerWidth, window.innerHeight) * 0.8 / BOARD_SIZE,
            textAlign: 'center',
            transition: 'background .2s'
        }

        const cellFuncStyles = {
            [FIELD_TYPES.EMPTY]: {
                ...cellStyle,
                background: '#787964',
            },
            [FIELD_TYPES.SNAKE]: {
                ...cellStyle,
                background: 'black',
            },
            [FIELD_TYPES.TREAT]: {
                ...cellStyle,
                background: '#787964',
                border: '5px solid black',
                position: 'relative',
                zIndex: '2',
                boxSizing: 'border-box',
            },
        }

        return (
            <div style={cellFuncStyles[this.props.cell]}></div>
        )
    }
}
