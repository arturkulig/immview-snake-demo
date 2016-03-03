import React from 'react';

export default function ({BoardDomain}) {

    let cellStyle = {
        float: 'left',
        width: '20px',
        height: '20px',
        textAlign: 'center',
        transition: 'background .2s'
    };

    let cellFuncStyles = {
        [BoardDomain.fieldTypes.EMPTY]: {
            background: '#787964',
        },
        [BoardDomain.fieldTypes.SNAKE]: {
            background: 'black',
        },
        [BoardDomain.fieldTypes.TREAT]: {
            background: '#787964',
            outline: '10px solid black',
            position: 'relative',
            zIndex: '2',
            transform: 'rotate(45deg) scale(0.7)',
        },
    };

    class CellComponent extends React.Component {
        render() {
            let thisCellStyle = {
                ...cellStyle,
                ...cellFuncStyles[this.props.cell]
            };
            return (
                <div style={thisCellStyle}></div>
            );
        }
    }

    return CellComponent;

}
