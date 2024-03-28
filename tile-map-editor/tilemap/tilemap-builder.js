/**
 * @typedef { "default" | "auto-tiled" } TilemapType
 * 
 * @typedef { Object } Tilemap
 * @property { { x: number, y: number } } selectedTile
 * @property { SpriteSheet } spriteSheet
 * @property { TilemapType } type
 * @property { number } tileHeight 
 * @property { number } tileWidth 
 * @property { string } name
 */

import { SpriteSheet } from "../../astro-engine/sprites/spriteSheet.js";

/** @type { Map<string, Tilemap> } */
export const tilemapNameMap = new Map();

/**
 * Creates a new Tilemap object
 * @param { string } imageSrc The tilemap's image source
 * @param { string } name The tilemap's name (must be unique)
 * @param { number } tileWidth The width of each tile on the image
 * @param { number } tileHeight The height of each tile on the image
 * @param { TilemapType } type The type of tilemap
 * @returns { Tilemap }
 */
export const createTilemap = (name, type, imageSrc, tileWidth, tileHeight) => {
    /** @type { Tilemap } */
    const tilemap = {
        spriteSheet: new SpriteSheet(imageSrc, tileWidth, tileHeight),
        selectedTile: { x: 0, y: 0 },
        tileHeight: tileHeight,
        tileWidth: tileWidth, 
        name: name,
        type: type,
    }

    tilemapNameMap.set(name, tilemap);

    return tilemap;
}