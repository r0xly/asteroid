import { Vector } from "../../astro-engine/util/vector.js";
import { TILE_SIZE } from "../grid.js";

/**
 * Returns which tile is at the specified position 
 * @param { Vector } position 
 * @returns { Vector }
 */
export const getSelectedTile = position => new Vector(
    Math.floor(position.x / TILE_SIZE),
    Math.floor(position.y / TILE_SIZE)
)