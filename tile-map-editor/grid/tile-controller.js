import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH, TILE_SIZE } from "../grid.js";
import { getSelectedLayer } from "./layer-controller.js";

const isTileInGridBounds = (x, y) => GRID_WIDTH >= (2 * TILE_SIZE * Math.abs(x)) && GRID_HEIGHT >= (2 * TILE_SIZE * Math.abs(y))

const tiles = new Map();

const setTile = (x, y, tileType) => {
    tiles.set(`${x},${y}`, tileType)
}

const getTile = (x, y) => {
    return tiles.get(`${x},${y}`);
}

/**
 * Returns the tile at the specified position 
 * @param { Vector } position 
 * @returns { Vector }
 */
export const getSelectedTile = position => new Vector(
    Math.floor(position.x / TILE_SIZE),
    Math.floor(position.y / TILE_SIZE)
);


let previewMode = false;
let previewTiles = [];

/**
 * Draw's a tile at the specificed layer and position 
 * @param { number } x - The tile's x coordinate
 * @param { number } y - The tile's y coordinate
 * @param { Object } tileType - The type of tile to draw
 * @param { import("./layer-controller.js").Layer } layer - The layer where the tile will be drawn on
 */
export const drawTile = (x, y, tileType, layer = getSelectedLayer()) => {
    if (!isTileInGridBounds(x, y))
        return;
    
    if (!previewMode) {
        setTile(x, y, new Vector(tileType.x, tileType.y));
    } else
        previewTiles.push({
            x: x,
            y: y,
        });
    layer.drawTile(x, y, tileType)    
}

export const enablePreviewMode = () => {
    previewMode = true; 
}

export const disablePreviewMode = () => {
    previewMode = false; 
    clearPreview();
}

export const clearPreview = () => {
    while (previewTiles.length > 0) {
        let { x, y } = previewTiles.pop();
        getSelectedLayer().drawTile(x, y, getTile(x, y));
    }
}