function lerp(a, b, t) {
    return a + (b - a) * t;
}

// @ts-nocheck
export class Vector {
    static get Zero() {
        return new Vector(0, 0);
    }

    static get One() {
        return new Vector(1, 1);
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(x = 0, y = 0) {
        if (typeof(x) === "object") 
            return new Vector(this.x + x.x, this.y + x.y);

        return new Vector(this.x + x, this.y + y);
    }

    sub(x = 0, y = 0) {
        if (typeof(x) === "object") 
            return new Vector(this.x - x.x, this.y - x.y);

        return new Vector(this.x - x, this.y - y);
    }

    lerp(goal, alpha) {
        return new Vector(lerp(this.x, goal.x, alpha), lerp(this.y, goal.y, alpha));
    }

    mul(x) {
        return new Vector(this.x * x, this.y * x);
    }

    get unit() {
        const magnitude = this.magnitude == 0 ? 1 : this.magnitude;

        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    get magnitude() { 
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}