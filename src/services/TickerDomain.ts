import {
    Observable,
    Domain,
} from 'immview'
import Round$ from './RoundDomain'
import { PULSE_IN_MS } from '../config'

export type Ticker$V = {
    tick: number
}

const now = (): Ticker$V => ({ tick: +(new Date()) })

const ticker$ = new Observable<Ticker$V>(function ticker({next}) {
    let points = 0
    const push = () => {
        next(now())
        setTimeout(push, PULSE_IN_MS / 2 / (points + 1) + PULSE_IN_MS / 2)
    }
    push()
    const round$Sub = Round$.subscribe(state => {
        points = state.points
    })
    return () => {
        round$Sub.unsubscribe()
    }
})

export default Domain.create(
    'Ticker',
    ticker$,
    {}
)
