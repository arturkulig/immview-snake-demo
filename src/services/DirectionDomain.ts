import {
    Atom,
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

const directionDemand$ = new Atom<Vector>(directionVectors.NONE)

const direction$ = new Combine({ ticker: Ticker$, directionDemand: directionDemand$ })
    .scan(function bufferTwo(result, item) {
        return result.concat([item]).slice(-2)
    }, [{ directionDemand: directionVectors.NONE }] as { ticker: number, directionDemand: Vector }[])
    .filter(function isNextTick(value) {
        return value[0].ticker !== value[1].ticker
    })
    .map(function pickDemandedDirection(value) {
        return value[value.length - 1].directionDemand
    })
    .scan(function releaseAcceptableDirection(lastAcceptableDirection: Vector, requestedDirection) {
        return (
            isAcceptableNewDirection(lastAcceptableDirection, requestedDirection)
                ? requestedDirection
                : lastAcceptableDirection
        )
    }, directionVectors.NONE)

export default Domain.create(
    direction$,
    {
        go(requested: DIRECTIONS) {
            if (directionDictionary[requested]) {
                directionDemand$.next(directionDictionary[requested])
            }
        }
    }
)