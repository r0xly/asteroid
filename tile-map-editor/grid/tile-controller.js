import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH, TILE_SIZE } from "../grid.js";
import { getSelectedLayer } from "./layer-controller.js";

const isTileInGridBounds = (x, y) => GRID_WIDTH > (2 * TILE_SIZE * Math.abs(x)) && GRID_HEIGHT > (2 * TILE_SIZE * Math.abs(y))

/**
 * Returns the tile at the specified position 
 * @param { Vector } position 
 * @returns { Vector }
 */
export const getSelectedTile = position => new Vector(
    Math.floor(position.x / TILE_SIZE),
    Math.floor(position.y / TILE_SIZE)
)

/**
 * Draw's a tile at a specific layer and position 
 * @param { number } x - The tile's x coordinate
 * @param { number } y - The tile's y coordinate
 * @param { Object } tileType - The type of tile to draw
 * @param { import("./layer-controller.js").Layer } layer - The layer where the tile will be drawn on
 */
export function drawTile(x, y, tileType, layer = getSelectedLayer()) {
    if (!isTileInGridBounds(x, y))
        return;
    
    layer.drawTile(x, y)    
}