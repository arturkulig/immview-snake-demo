import * as React from 'react';
import { FIELD_TYPES } from '../services/BoardDomain'

const cellStyle = {
    float: 'left',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    transition: 'background .2s'
};

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
};

export default class CellComponent extends React.Component<{ cell: FIELD_TYPES }, {}> {
    render() {
        return (
            <div style={cellFuncStyles[this.props.cell]}></div>
        );
    }
}
