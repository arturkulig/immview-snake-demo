import {
    Data,
    Domain,
} from 'immview';
import {
    Map,
} from 'immutable';

const now = () => Map({ tick: +(new Date()) });

class Ticker extends Domain {
    constructor(tempo = 200) {
        super(
            /** structure */
            new Data(now()),

            /** actions */
            {
                tick: function () {
                    this.stream.write(now());
                }
            }
        );

        setInterval(this.tick, tempo);
    }
}

export default new Ticker;
