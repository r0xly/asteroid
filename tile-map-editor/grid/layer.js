//@ts-nocheck
import { gameObject } from "../../astro-engine/core/gameObject.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH, TILE_SIZE } from "../grid.js";

export class Layer {
    canvas = document.createElement("canvas");
    tiles = new Map();
    
    constructor(order = 1) {
        this.canvas.width = GRID_WIDTH;
        this.canvas.height = GRID_HEIGHT;

        const ctx = this.canvas.getContext("2d");

        ctx.translate(GRID_WIDTH / 2, GRID_HEIGHT / 2);
        ctx.imageSmoothingEnabled = false;
        this.ctx = ctx;
        
        gameObject({
            size: new Vector(GRID_WIDTH, GRID_HEIGHT),
            render: this.canvas,
            layer: order
        })
    }

    drawTile = (x, y, sprite) =>  {
        y += 1;

        this.ctx.clearRect(x * TILE_SIZE, -y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

        if (sprite) {
            const { image, sx, sy, sWidth, sHeight } = sprite;

            this.ctx.drawImage(image, sx, sy, sWidth, sHeight, x * TILE_SIZE, -y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }

    setTile = (x, y, sprite) => {
        if (this.getTile(x, y) === sprite)
            return;

        this.drawTile(x, y, sprite);
        this.tiles.set(`${x},${y}`, sprite);
    }

    getTile = (x, y) => {
        return this.tiles.get(`${x},${y}`);
    }
}