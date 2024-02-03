import { Sprite } from "./sprite.js";

export class SpriteSheet {
    #image;
    #spriteWidth;
    #spriteHeight;

    constructor(src, spriteWidth, spriteHeight) {
        this.#image = new Image();
        this.#image.src = src;
        this.#spriteWidth = spriteWidth;
        this.#spriteHeight = spriteHeight;
    }

    getSprite(row = 0, column = 0, inverse = false, offsetX = 0, offsetY = 0) {
        return new Sprite(
            this.#image.src,
            this.#spriteWidth,
            this.#spriteHeight,
            inverse,
            row * this.#spriteWidth,
            column * this.#spriteHeight,
        );
    }
}

