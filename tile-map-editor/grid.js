import { update } from "../astro-engine/astro.js";
import { deleteObject, gameObject } from "../astro-engine/core/gameObject.js";
import { spriteImage } from "./tile-selector.js";

export let TILE_SIZE = 32;
export let GRID_WIDTH = 50 * 32;
export let GRID_HEIGHT = 50 * 32;


const layers = {};
let previewTiles = [];

export const setPreviewTile = (x, y, layer, tiledId) =>  {
    if (GRID_WIDTH < (2 * TILE_SIZE * Math.abs(x)) || GRID_HEIGHT < (2 * TILE_SIZE * Math.abs(y)))
        return;

    
    previewTiles.push(gameObject({
        size: [TILE_SIZE, TILE_SIZE],
        position: [TILE_SIZE * x, TILE_SIZE * y],
        render: spriteImage.getSprite(tiledId.x, tiledId.y),
    }))
}

export const clearPreviewTiles = () => 
    previewTiles.forEach(deleteObject);

export function setTile(x, y, layer, tileId) {
    if (GRID_WIDTH < (2 * TILE_SIZE * Math.abs(x)) || GRID_HEIGHT < (2 * TILE_SIZE * Math.abs(y)))
        return;

    if (!layers[layer])
        layers[layer] = {};

    const tiles = layers[layer];
    const tileIndex = `${x},${y}`;

    if (tiles[tileIndex])
        deleteObject(tiles[tileIndex].tileObject);

    const tileObject = gameObject({
        size: [TILE_SIZE, TILE_SIZE],
        position: [TILE_SIZE * x, TILE_SIZE * y],
        render: spriteImage.getSprite(tileId.x, tileId.y),
    });

    tiles[`${x},${y}`] = {
        id: tileId,
        tileObject: tileObject,
    };
} 

const tileObjects = [];

function drawGrid() {
    tileObjects.forEach(deleteObject);

    for (let x = -GRID_WIDTH / 2; x < GRID_WIDTH / 2; x += TILE_SIZE)
        for (let y = -GRID_HEIGHT / 2; y < GRID_HEIGHT / 2; y += TILE_SIZE)
            tileObjects.push(gameObject({
                position: [x, y],
                positionPivot: [0, 1],
                size: [TILE_SIZE, TILE_SIZE],
                layer: -1,
                color: "none",
                strokeWidth: 1,
                strokeColor: "#464646",
            }));
}

drawGrid();