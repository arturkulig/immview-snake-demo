import {
    Atom,
    Domain
} from 'immview'
import { BOARD_SIZE } from '../config'
import Vector from './Vector'

function randomBoardDistance() {
    return Math.floor(Math.random() * BOARD_SIZE)
}

export type Treat$V = Vector

const treat$ = new Atom<Treat$V>(new Vector(
    randomBoardDistance(),
    randomBoardDistance()
))

export default Domain.create(
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