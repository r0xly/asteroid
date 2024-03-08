/**
 * @typedef { Object } Layer
 * @param { import("../../astro-engine/core/gameObject.js").GameObject } gameObject
 * @param { (x: number, y: number) => void } drawTile
 * @param { CanvasRenderingContext2D } ctx
 * @param { HTMLCanvasElement } canvas
 * @param { number } order 
 */

import { gameObject } from "../../astro-engine/core/gameObject.js";
import { Sprite } from "../../astro-engine/sprites/sprite.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH, TILE_SIZE } from "../grid.js";


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
    ctx.translate(GRID_WIDTH / 2, GRID_HEIGHT / 2);

    const object = gameObject({
        layer: order,
        size: new Vector(GRID_WIDTH, GRID_HEIGHT),
        render: canvas,
    });

    /**
     * @param { number } x 
     * @param { number } y
     */
    const drawTile = (x, y) => {
        y += 1;
        ctx.fillRect(x * TILE_SIZE, -y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    const layer = {
        order: order,
        gameObject: object,
        canvas: canvas,
        ctx: ctx,
        drawTile: drawTile,
    }

    return layer;
}

let selectedLayer = createLayer(1);

export const getSelectedLayer = () => selectedLayer;