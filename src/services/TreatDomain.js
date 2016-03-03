import * as I from 'immutable';
import {
    Data,
    Domain
} from 'immview';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default class TreatDomain extends Domain {
    constructor({boardSize}) {
        let treatData = new Data(I.Map({x: randomInt(boardSize), y: randomInt(boardSize)}));
        super(
            /** structure */
            treatData,
            /** actions */
            {
                spawn({x=randomInt(boardSize),y=randomInt(boardSize)}={}) {
                    treatData.update(() => I.Map({x, y}));
                }
            }
        );
    }
}
