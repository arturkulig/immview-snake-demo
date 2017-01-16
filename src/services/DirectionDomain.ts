import {
    Observable,
    Merge,
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

const DirectionDemandStream = new Observable<Vector>(observer => { observer.next(directionVectors.NONE) })

const DirectionsStream = new Merge({ TickerDomain, DirectionDemandStream })
    .bufferCount(2, 1)
    .filter(value => {
        return value[0].TickerDomain.tick !== value[1].TickerDomain.tick
    })
    .map(value => {
        return value[value.length - 1].DirectionDemandStream
    })
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
                DirectionDemandStream.next(directionDictionary[requested])
            }
        }
    }
)