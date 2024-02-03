import { update } from "../astro.js";
import { gameObjects, queryObjects } from "./gameObject.js";

export class HitBox {
    constructor(onHit) {
        this.onHit = onHit;
        this.active = false;
    }
}

function getGameObjectBounds(gameObject) {
    const halfWidth = gameObject.size.x / 2;
    const halfHeight = gameObject.size.y / 2;

    const x = gameObject.position.x;
    const y = gameObject.position.y;

    return [x + halfWidth, x - halfWidth, y + halfHeight, y - halfHeight];
}


update(deltaTime => {
    for (const [gameObject, hitBox] of queryObjects("HitBox")) {
        const [right, left, top, bottom] = getGameObjectBounds(gameObject);

        gameObjects.forEach(object => {
            if (object === gameObject)
                return;

            const x = object.position.x;
            const y = object.position.y;

            if (x > left && x < right && y > bottom && y < top) {
                if (hitBox.active === false) 
                    hitBox.onHit(object);

                hitBox.active = true;
            } else {
            }
        })
    }
})