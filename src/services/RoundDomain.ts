import {
    Atom,
    Domain
} from 'immview';

export type Round$V = {
    points: number
}

class RoundDomain extends Domain<Round$V> {
    constructor() {
        super(new Atom<Round$V>({ points: 0 }))
    }
    increase() {
        this.next(({ points }) => ({ points: points + 1 }))
    }
    decrease() {
        this.next(({ points }) => ({ points: points - 1 }))
    }
    loose() {
        this.next({ points: 0 })
    }
}

export default new RoundDomain()