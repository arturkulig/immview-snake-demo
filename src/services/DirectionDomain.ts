import {
    Observable,
    Domain
} from 'immview'
import Vector from './Vector'
import TickerDomain from './TickerDomain'

export enum DIRECTIONS {
    NONE,
    UP,
    DOWN,
    LEFT,
    RIGHT
}

const directionVectors = {
    NONE: new Vector(0, 0),
    UP: new Vector(0, -1),
    DOWN: new Vector(0, 1),
    LEFT: new Vector(-1, 0),
    RIGHT: new Vector(1, 0),
}

const directionDictionary = {
    [DIRECTIONS.UP]: directionVectors.UP,
    [DIRECTIONS.DOWN]: directionVectors.DOWN,
    [DIRECTIONS.LEFT]: directionVectors.LEFT,
    [DIRECTIONS.RIGHT]: directionVectors.RIGHT,
    [DIRECTIONS.NONE]: directionVectors.NONE,
}

let _requestedDirection = directionVectors.NONE

function isAcceptableNewDirection(oldDir: Vector, newDir: Vector) {
    return (
        oldDir === directionVectors.NONE ||
        newDir === directionVectors.NONE ||
        (
            oldDir.x !== newDir.x &&
            oldDir.y !== newDir.y
        ) || (
            oldDir.x === newDir.x &&
            oldDir.y === newDir.y
        )
    )
}

const DirectionsStream = TickerDomain
    .map(() => _requestedDirection)
    .scan((requestedDirection, lastAcceptableDirection: Vector) => {
        if (!lastAcceptableDirection) return directionVectors.NONE
        return (
            isAcceptableNewDirection(lastAcceptableDirection, requestedDirection)
                ? requestedDirection
                : lastAcceptableDirection
        )
    })

export default Domain.create(
    DirectionsStream,
    {
        go(requested: DIRECTIONS) {
            if (directionDictionary[requested]) {
                _requestedDirection = directionDictionary[requested]
            }
        }
    }
)