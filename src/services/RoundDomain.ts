import {
    Observable,
    Domain
} from 'immview';

export type RoundDomainV = {
    points: number
}

const Round = new Observable<RoundDomainV>(({next}) => { next({ points: 0 }) })

export default Domain.create(
    Round,
    {
        increase() {
            Round.next(({points}) => ({ points: points + 1 }))
        },
        decrease() {
            Round.next(({points}) => ({ points: points - 1 }))
        },
        loose() {
            Round.next({ points: 0 })
        }
    }
)
