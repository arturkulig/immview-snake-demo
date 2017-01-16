import Vector from './Vector'

const emptyMap = new Map()

export default class Matrix<T> {
    private positions: Map<number, Map<number, T>>
    constructor(private defaultValue: T) {
        this.positions = new Map()
    }

    get(position: Vector): T {
        return (
            this.positions.get(position.x) ||
            emptyMap
        ).get(position.y) || this.defaultValue
    }

    set(position: Vector, value: T): Matrix<T> {
        const clone = new Matrix<T>(this.defaultValue)
        clone.positions = mapMap(this.positions, cloneMap)
        const row = clone.positions.get(position.x) || new Map()
        clone.positions.set(position.x, row)
        row.set(position.y, value)
        return clone
    }
}

function cloneMap<K, V>(subject: Map<K, V>): Map<K, V> {
    return mapMap(subject, v => v)
}

function mapMap<K, V, U>(subject: Map<K, V>, func: (item: V) => U): Map<K, U> {
    const result = new Map()
    const entries = subject.entries()
    let entryResult: IteratorResult<[K, V]>
    while ((entryResult = entries.next(), !entryResult.done)) {
        result.set(entryResult.value[0], func ? func(entryResult.value[1]) : entryResult.value[1])
    }
    return result
}