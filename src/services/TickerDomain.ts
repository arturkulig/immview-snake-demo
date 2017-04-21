import {
    Observable,
    Domain,
} from 'immview'
import Round$ from './RoundDomain'
import { PULSE_IN_MS } from '../config'

export type TickerV = number

const ticker$ = new Observable<TickerV>()

const push = () => {
    ticker$.next(Date.now())
    setTimeout(push, PULSE_IN_MS / 2 / (Round$.deref().points + 1) + PULSE_IN_MS / 2)
}
push()

export default Domain.create(
    'Ticker',
    ticker$,
    {}
)
