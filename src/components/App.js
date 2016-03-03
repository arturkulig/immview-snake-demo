import React from 'react';

import BoardDomain from '../services/BoardDomain';
import SnakeDomain from '../services/SnakeDomain';
import TreatDomain from '../services/TreatDomain';
import RoundDomain from '../services/RoundDomain';

let di = {};

di.boardSize = 20;
di.RoundDomain = new RoundDomain(di);
di.TreatDomain = new TreatDomain(di);
di.SnakeDomain = new SnakeDomain(di);
di.BoardDomain = new BoardDomain(di);

import BoardComponent from '../components/BoardComponent';
let Board = BoardComponent(di);

const boardStyle = {
    'display': 'flex',
    'alignItems': 'center',
    'width': '100vw',
    'padding': '0',
    'margin': '0',
    'height': '100vh',
    'justifyContent': 'center',
    'position': 'absolute',
    'top': '0',
    'left': '0',
};

export default class App extends React.Component {
    render() {
        return (
            <div style={boardStyle}>
                <Board />
            </div>
        );
    }
}
