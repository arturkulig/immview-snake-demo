import { Map } from 'immutable';
import {
    Data,
    Domain
} from 'immview';

export default class RoundDomain extends Domain {
    constructor() {
        let roundData = new Data(Map({
            points: 0,
        }));

        super(
            /** structure */
            roundData,
            /** actions */
            {
                increase() {
                    roundData.write(data => data.set('points', data.get('points') + 1));
                },
                loose() {
                    roundData.write(data => data.set('points', 0));
                }
            }
        )
    }
}
