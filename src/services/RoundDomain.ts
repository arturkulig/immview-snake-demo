import {
    Observable,
    Domain
} from 'immview';

export type Round$V = {
    points: number
}

const round$ = new Observable<Round$V>().startWith({ points: 0 })

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
