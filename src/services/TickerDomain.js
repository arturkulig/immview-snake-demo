import {
    Data,
    Domain
} from 'immview';

class Ticker extends Domain {
    constructor(tempo = 200) {
        super(
            /** structure */
            new Data({}),

            /** actions */
            {
                tick: function () {
                    this.data.set('tick', +(new Date()));
                }
            }
        );

        setInterval(this.tick, tempo);
    }
}

export default new Ticker;
