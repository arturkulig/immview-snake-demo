import {
    Observable,
    Combine,
    Domain
} from 'immview'
import Vector from './Vector'
import Direction$, { DIRECTIONS } from './DirectionDomain'
import Round$ from './RoundDomain'
import { BOARD_SIZE } from '../config'

export type SnakeBodyV = Vector[]

const snakeDefaultShape = [new Vector(
    Math.round(BOARD_SIZE / 2),
    Math.round(BOARD_SIZE / 2),
)]

const DIRECTIONS_RESET = new Vector(0, 0)
const direction$ = Direction$.map(v => v)

const snakePositions$ =
    direction$
        .scan((allDirections: SnakeBodyV = snakeDefaultShape, direction) => {
            if (direction === DIRECTIONS_RESET) {
                return snakeDefaultShape
            }
            const lastPosition = allDirections[0]
            const nextPosition = lastPosition.add(direction)
            return [nextPosition, ...allDirections].slice(0, BOARD_SIZE * BOARD_SIZE)
        })

const snakeBody$ = new Combine({
    snakePositions: snakePositions$,
    round: Round$
}).map(function takeLastSnakePositions({ snakePositions, round }) {
    return snakePositions.slice(0, (round.points + 1))
})

export default Domain.create(
    'Snake',
    snakeBody$,
    {
        increase() {
            Round$.increase()
        },
        reset() {
            direction$.next(DIRECTIONS_RESET)
            Direction$.go(DIRECTIONS.NONE)
            Round$.loose()
        }
    }
)
