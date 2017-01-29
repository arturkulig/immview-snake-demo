import {
    Observable,
    Combine,
    Domain
} from 'immview'
import Vector from './Vector'
import Ticker$ from './TickerDomain'

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

const directionDemand$ = new Observable<Vector>(observer => { observer.next(directionVectors.NONE) })

const direction$ = new Combine({ ticker: Ticker$, directionDemand: directionDemand$ })
    .bufferCount(2, 1)
    .filter(value => {
        return value[0].ticker.tick !== value[1].ticker.tick
    })
    .map(value => {
        return value[value.length - 1].directionDemand
    })
    .scan((lastAcceptableDirection: Vector, requestedDirection) => {
        if (!lastAcceptableDirection) return directionVectors.NONE
        return (
            isAcceptableNewDirection(lastAcceptableDirection, requestedDirection)
                ? requestedDirection
                : lastAcceptableDirection
        )
    })

export default Domain.create(
    'Direction',
    direction$,
    {
        go(requested: DIRECTIONS) {
            if (directionDictionary[requested]) {
                directionDemand$.next(directionDictionary[requested])
            }
        }
    }
)