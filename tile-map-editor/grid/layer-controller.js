/**
 * @typedef { Object } Layer
 * @param { (x: number, y: number) => void } drawTile
 */

import { gameObject } from "../../astro-engine/core/gameObject.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH, TILE_SIZE } from "../grid.js";
import { selectedSpriteId, spriteImage } from "../tile-selector.js";


/**
 * Creates a new layer object
 * @param { number } order - The layer's order (higher orders get displayed on top
 * @returns { Layer }
 */
export const createLayer = (order) => {
    const canvas = document.createElement("canvas");
    canvas.width = GRID_WIDTH;
    canvas.height = GRID_HEIGHT;

    const ctx = canvas.getContext("2d");
    ctx?.translate(GRID_WIDTH / 2, GRID_HEIGHT / 2);
    ctx.imageSmoothingEnabled = false;

    gameObject({
        layer: order,
        size: new Vector(GRID_WIDTH, GRID_HEIGHT),
        render: canvas,
    });

    /** @type { Layer } */
    const layer = {
        drawTile: (x, y, tileType) => {
            
            ctx?.clearRect(
                x * TILE_SIZE,
                -(y + 1) * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
                )
                
            if (tileType) {
                const { image, sx, sy, sWidth, sHeight } = spriteImage.getSprite(tileType.x, tileType.y);
                ctx?.drawImage(
                    image,
                    sx,
                    sy,
                    sWidth,
                    sHeight,
                    x * TILE_SIZE, 
                    -(y + 1) * TILE_SIZE, 
                    TILE_SIZE, 
                    TILE_SIZE
                );
                }

        },
    }

    return layer;
}

let selectedLayer = createLayer(1);

export const getSelectedLayer = () => selectedLayer;