export default class Vector {
    constructor(public x: number, public y: number) { }

    is(other: Vector) {
        return (
            this.x === other.x &&
            this.y === other.y
        )
    }

    add(other: Vector) {
        return new Vector(this.x + other.x, this.y + other.y)
    }
}