import {
    Observable,
    Merge,
    Domain
} from 'immview'
import Vector from './Vector'
import DirectionDomain, { DIRECTIONS } from './DirectionDomain'
import RoundDomain from './RoundDomain'
import { BOARD_SIZE } from '../config'

export type SnakeBodyV = Vector[]

const snakeDefaultShape = [new Vector(
    Math.round(BOARD_SIZE / 2),
    Math.round(BOARD_SIZE / 2),
)]

const DIRECTIONS_RESET = new Vector(0, 0)
const DirectionsStream = DirectionDomain.map(v => v)

const SnakePositionsStream =
    DirectionsStream
        .scan((direction, allDirections: SnakeBodyV = snakeDefaultShape) => {
            if (direction === DIRECTIONS_RESET) {
                return snakeDefaultShape
            }
            const lastPosition = allDirections[0]
            const nextPosition = lastPosition.add(direction)
            return [nextPosition, ...allDirections].slice(0, BOARD_SIZE * BOARD_SIZE)
        })

const SnakeBody = new Merge({
    SnakePositions: SnakePositionsStream,
    Round: RoundDomain
}).map(({ SnakePositions, Round }) => {
    return SnakePositions.slice(0, (Round.points + 1))
})

const Snake = Domain.create(
    SnakeBody,
    {
        increase() {
            RoundDomain.increase()
        },
        reset() {
            DirectionsStream.next(DIRECTIONS_RESET)
            DirectionDomain.go(DIRECTIONS.NONE)
            RoundDomain.loose()
        }
    }
)

export default Snake
