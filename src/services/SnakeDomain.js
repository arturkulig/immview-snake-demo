import * as I from 'immutable';

import {
    View,
    Data,
    Domain
} from 'immview';

import Direction from './DirectionDomain';

/**
 * I.List<{x,y}>
 */
class SnakePositions extends View {
    constructor({boardSize}) {

        let snakeStartPosition = I.Map({
            x: Math.round(boardSize / 2),
            y: Math.round(boardSize / 2),
        });

        super(
            Direction,
            data => {
                if (this && this.structure) {
                    let positions = this.structure;
                    let lastPosition = positions.last();
                    return positions.push(I.Map({
                        x: Math.max(0, Math.min(boardSize - 1, lastPosition.get('x') + data.get('direction').get('x'))),
                        y: Math.max(0, Math.min(boardSize - 1, lastPosition.get('y') + data.get('direction').get('y'))),
                    }));
                } else {
                    return I.List([snakeStartPosition]);
                }
            }
        );
    }
}

/**
 * I.List<{x,y}>
 */
class SnakeBody extends View {
    constructor({RoundDomain,snakePositions}) {
        super(
            {
                RoundDomain,
                snakePositions,
            },
            data => {
                if (
                    data &&
                    data.get('RoundDomain') &&
                    data.get('snakePositions')
                ) {
                    return data.get('snakePositions').takeLast(data.getIn(['RoundDomain', 'points']) + 1);
                } else {
                    return I.List();
                }
            }
        )
    }
}

class Snake extends Domain {
    constructor({boardSize,RoundDomain}) {

        let snakePositions = new SnakePositions({boardSize});

        super(
            /** structure */
            new SnakeBody({RoundDomain, snakePositions}),
            /** actions */
            {
                grow() {
                    snakeLength.set('length', snakeLength.get('length') + 1);
                }
            }
        );
    }
}

export default Snake;
