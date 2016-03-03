import React from 'react';
import * as I from 'immutable';
import connect from 'immview-react-connect';

import CellComponent from './CellComponent';

export default function ({BoardDomain}) {

    let Cell = CellComponent({BoardDomain});

    let rowStyle = {
        clear: 'both',
    };

    class BoardComponent extends React.Component {
        render() {
            let rows = this.props.rows.toJS();
            return (
                <div style={this.props.style}>
                    {
                        rows.map(row => {
                            return (
                                <div style={rowStyle}>
                                    {
                                        row.map(cell => {
                                            return <Cell cell={cell} />
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

    return connect(BoardComponent, BoardDomain, board => {
        let rows = I.List();
        board.forEach((value, position)=> {
            let x = position.get('x');
            let y = position.get('y');

            let row = rows.get(y) || I.List();
            rows = rows.set(y, row.set(x, value));
        });
        return I.Map({rows});
    });

}
