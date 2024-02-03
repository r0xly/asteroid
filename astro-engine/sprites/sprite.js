export class Sprite {
    constructor(src = "", sWidth = 0, sHeight = 0, inverse = false, sx = 0, sy = 0) {
        const image = new Image();
        this.image = image;

        image.onload = () => {
            this.sx = sx;
            this.sy = sy;
            this.src = src;
            this.inverse = inverse;
            this.sHeight = sHeight || image.height;
            this.sWidth = sWidth || image.width;
        }

        image.src = src;
        this.sx = sx;
        this.sy = sy;
        this.src = src;
        this.inverse = inverse;
        this.sHeight = sHeight || this.image.height;
        this.sWidth = sWidth || this.image.width;
    }

    flip() {
        return new Sprite(this.src, this.sWidth, this.sHeight, !this.inverse, this.sx, this.sy);
    }
}
