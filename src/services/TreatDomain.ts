import {
    Observable,
    Domain
} from 'immview'
import { BOARD_SIZE } from '../config'
import Vector from './Vector'

function randomBoardDistance() {
    return Math.floor(Math.random() * BOARD_SIZE)
}

export type Treat$V = Vector

const treat$ = new Observable<Treat$V>().startWith(new Vector(
    randomBoardDistance(),
    randomBoardDistance()
))

export default Domain.create(
    'Treat',
    treat$,
    {
        spawn() {
            treat$.next(() => new Vector(
                randomBoardDistance(),
                randomBoardDistance()
            ))
        }
    }
)