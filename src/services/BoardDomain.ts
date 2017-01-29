import {
    Observable,
    Combine,
    Domain
} from 'immview'
import { BOARD_SIZE } from '../config'
import Treat$ from './TreatDomain'
import Snake$ from './SnakeDomain'
import Vector from './Vector'
import Matrix from './Matrix'

export enum FIELD_TYPES {
    EMPTY = 0,
    SNAKE = 1,
    TREAT = 2,
}

const board$ = new Combine({
    snake: Snake$,
    treat: Treat$,
}).buffer(1).map(
    ([{snake, treat}]): Matrix<FIELD_TYPES> => {

        /** board rules */
        const snakeHead = snake[0]

        /** 
         * 1. if head touches a treat, player gets a points
         */
        if (snakeHead.is(treat)) {
            Treat$.spawn()
            Snake$.increase()
        }

        /** 
         * 2. if snake head reaches same position
         * as any previous position of a body
         * player looses
         */
        if (snake.slice(1).find(v => v.is(snakeHead))) {
            Snake$.reset()
            Treat$.spawn()
            return new Matrix<FIELD_TYPES>(FIELD_TYPES.EMPTY)
        }

        /** 
         * 3. if treat appeared on position of snake's body
         * but not the head
         * then respawn the treat without points increase
         */
        if (snake.slice(1).find(v => v.is(treat))) {
            Treat$.spawn()
        }

        /** 
         * 4. if head touches board borders
         * respawn both snake and treat
         */
        if (
            snakeHead.x < 0 || snakeHead.x >= BOARD_SIZE ||
            snakeHead.y < 0 || snakeHead.y >= BOARD_SIZE
        ) {
            Snake$.reset()
            Treat$.spawn()
            return new Matrix<FIELD_TYPES>(FIELD_TYPES.EMPTY)
        }

        let board = new Matrix<FIELD_TYPES>(FIELD_TYPES.EMPTY)

        snake.forEach((position) => {
            board = board.set(position, FIELD_TYPES.SNAKE)
        })

        board = board.set(treat, FIELD_TYPES.TREAT)

        return board
    }
    )

export default Domain.create(
    'Board',
    board$,
    {}
)
