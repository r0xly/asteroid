import { update } from "../astro-engine/astro.js";
import { gameObject } from "../astro-engine/core/gameObject.js";

export let TILE_SIZE = 32;
export let GRID_WIDTH = 42 * 32;
export let GRID_HEIGHT = 26 * 32;

const tiles = {};

export function getTile(x, y) {

}

export function setTile(x, y, tile) {
    tiles[""]
} 

const tileObjects = [];

function drawGrid() {
    for (let x = -GRID_WIDTH / 2; x < GRID_WIDTH / 2; x += TILE_SIZE)
        for (let y = -GRID_HEIGHT / 2; y < GRID_HEIGHT / 2; y += TILE_SIZE)
            gameObject({
                position: [x, y],
                size: [TILE_SIZE, TILE_SIZE],
                layer: -1,
                color: "none",
                strokeWidth: 1,
                strokeColor: "#464646",
            });
}

drawGrid();