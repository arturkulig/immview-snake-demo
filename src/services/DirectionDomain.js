import * as I from 'immutable';

import {
    View,
    Data,
    Domain
} from 'immview';

import Ticker from './TickerDomain';

const keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
};

const directionVectors = {
    NONE: I.Map({x: 0, y: 0}),
    UP: I.Map({x: 0, y: -1}),
    DOWN: I.Map({x: 0, y: 1}),
    LEFT: I.Map({x: -1, y: 0}),
    RIGHT: I.Map({x: 1, y: 0}),
};

const directionDictionary = {
    [keys.UP]: directionVectors.UP,
    [keys.DOWN]: directionVectors.DOWN,
    [keys.LEFT]: directionVectors.LEFT,
    [keys.RIGHT]: directionVectors.RIGHT,
    [keys.SPACE]: directionVectors.NONE,
};

class Direction extends Domain {
    constructor() {

        let direction = directionVectors.NONE;

        window.addEventListener('keydown', event => {
            let newDirection = directionDictionary[event.keyCode];
            // if there is a direction set for the key
            if (
                newDirection && (
                    // ..and if current is no direction at all
                    direction === directionVectors.NONE ||
                        // ..or new one (sth like pause)
                    newDirection === directionVectors.NONE ||
                        //or new direction is not opposite to previous
                    (
                        (
                            newDirection.get('x') !== 0 || direction.get('x') !== 0
                        ) &&
                            //(continuing above)
                        (
                            newDirection.get('y') !== 0 || direction.get('y') !== 0
                        )
                    )
                )
            ) {
                direction = newDirection;
            }
        });

        let directionData = new View(
            Ticker,
            data => {
                //if there is and would be tick with NONE direction, do not tick
                if (
                    directionData &&
                    directionData.structure &&
                    //I.is(directionData.structure.get('direction'), directionVectors.NONE) &&
                    I.is(direction, directionVectors.NONE)
                ) {
                    return directionData.structure;
                }
                // else - send new direction
                return I.Map({
                    tick: data.get('tick'),
                    direction: direction || directionVectors.NONE,
                });
            }
        );

        super(
            /** structure */
            directionData,
            /** actions */
            {}
        );
    }
}

export default new Direction;
