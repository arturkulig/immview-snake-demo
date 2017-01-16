import {
    Observable,
    Domain,
} from 'immview'
import RoundDomain from './RoundDomain'
import { PULSE_IN_MS } from '../config'

export type TickerDomainV = {
    tick: number
}

const now = (): TickerDomainV => ({ tick: +(new Date()) })

const Ticker = new Observable<TickerDomainV>(({next}) => {
    let points = 0
    const push = () => {
        next(now())
        setTimeout(push, PULSE_IN_MS / 2 / (points + 1) + PULSE_IN_MS / 2)
    }
    push()
    RoundDomain.subscribe(state => {
        points = state.points
    })
})

export default Domain.create(
    Ticker,
    {}
)
