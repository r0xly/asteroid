import { Sprite } from "../../astro-engine/sprites/sprite.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH, TILE_SIZE } from "../grid.js";
import { getActiveLayer } from "./layer-controller.js";

const isTileInGridBounds = (x, y) => 
    GRID_WIDTH >= (2 * TILE_SIZE * Math.abs(x)) && 
    GRID_HEIGHT >= (2 * TILE_SIZE * Math.abs(y))

/**
 * Returns the tile at the specified position 
 * @param { Vector } position - The world position 
 * @returns { Vector } - The tile position
 */
export const getTilePosition = position => new Vector(
    Math.floor(position.x / TILE_SIZE),
    Math.floor(position.y / TILE_SIZE)
);

let previewTiles = [];
let previewModeEnabled = false;

export const enablePreviewMode = () => {
    previewModeEnabled = true; 
}

export const disablePreviewMode = () => {
    previewModeEnabled = false; 
    clearPreview();
}

export const clearPreview = () => {
    while (previewTiles.length > 0) {
        const { x, y, layer } = previewTiles.pop();
        layer.drawTile(x, y, layer.getTile(x, y));
    }
}
/**
 * Draw's a tile at the specificed layer and position 
 * @param { number } x - The tile's x coordinate
 * @param { number } y - The tile's y coordinate
 * @param { Sprite = } sprite - The type of tile to draw
 * @param { import("./layer.js").Layer } layer - The layer where the tile will be drawn on
 */
export const drawTile = (x, y, sprite, layer = getActiveLayer()) => {
    if (!isTileInGridBounds(x, y))
        return;
    
    if (!previewModeEnabled)
        return layer.setTile(x, y, sprite);

    previewTiles.push({ x: x, y: y, layer: layer });
    layer.drawTile(x, y, sprite);
}
