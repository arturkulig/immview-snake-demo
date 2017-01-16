import {
    Observable,
    Domain,
} from 'immview';
import { PULSE_IN_MS } from '../config'

export type TickerDomainV = {
    tick: number
}

const now = (): TickerDomainV => ({ tick: +(new Date()) });

const Ticker = new Observable<TickerDomainV>(({next}) => { next(now()) })

export default Domain.create(
    Ticker,
    {}
)

setInterval(() => {
    Ticker.next(now())
}, PULSE_IN_MS)