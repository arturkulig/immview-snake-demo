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

    multiply(other: Vector) {
        return new Vector(this.x * other.x, this.y * other.y)
    }

    distance(to: Vector) {
        return Math.sqrt(Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y, 2))
    }
}