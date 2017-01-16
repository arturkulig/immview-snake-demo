import {
    Observable,
    Domain
} from 'immview'
import { BOARD_SIZE } from '../config'
import Vector from './Vector'

function randomBoardDistance() {
    return Math.floor(Math.random() * BOARD_SIZE)
}

export type TreatV = Vector

const TreatStream = new Observable<TreatV>(({next}) => {
    next(new Vector(
        randomBoardDistance(),
        randomBoardDistance()
    ))
})

export default Domain.create(
    TreatStream,
    {
        spawn() {
            TreatStream.next(new Vector(
                randomBoardDistance(),
                randomBoardDistance()
            ))
        }
    }
)