import {
    Observable,
    Domain
} from 'immview';

export type Round$V = {
    points: number
}

const round$ = Observable.of<Round$V>({ points: 0 })

export default Domain.create(
    'Round',
    round$,
    {
        increase() {
            round$.next(({points}) => ({ points: points + 1 }))
        },
        decrease() {
            round$.next(({points}) => ({ points: points - 1 }))
        },
        loose() {
            round$.next({ points: 0 })
        }
    }
)
