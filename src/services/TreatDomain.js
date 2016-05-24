import { Map } from 'immutable';
import {
    Data,
    Domain
} from 'immview';

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

export default class TreatDomain extends Domain {
    constructor({boardSize}) {
        let treatData = new Data(Map({x: randomInt(boardSize), y: randomInt(boardSize)}));
        super(
            /** structure */
            treatData,
            /** actions */
            {
                spawn({ x = randomInt(boardSize), y = randomInt(boardSize) } = {}) {
                    treatData.write(Map({x, y}));
                }
            }
        );
    }
}
