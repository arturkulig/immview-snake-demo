import * as React from 'react'
import connect from 'immview-react-connect'
import BoardDomain, { FIELD_TYPES } from '../services/BoardDomain'
import Vector from '../services/Vector'
import { BOARD_SIZE } from '../config'

import Cell from './Cell'

const rowStyle = {
    clear: 'both',
}

class BoardComponent extends React.Component<{ rows: FIELD_TYPES[][], style: {} }, {}> {
    render() {
        const { rows, style } = this.props
        return (
            <div style={this.props.style}>
                {
                    rows.map((row, i) => {
                        return (
                            <div key={i} style={rowStyle}>
                                {
                                    row.map((cell, j) => {
                                        return <Cell key={j} cell={cell} />
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    BoardComponent,
    BoardDomain,
    board => {
        const rows: FIELD_TYPES[][] = []
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                const row = rows[i] = rows[i] || []
                row[j] = board.get(new Vector(j, i))
            }
        }
        return { rows }
    }
)
