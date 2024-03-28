/** @type { import("./tilemap-builder.js").Tilemap } */
let activeTilemap;

/**
 * @param { import("./tilemap-builder.js").Tilemap } tilemap 
 */
export const setActiveTilemap = tilemap => activeTilemap = tilemap;

export const getActiveTilemap = () => activeTilemap;

export const getSelectedSprite = (x = activeTilemap.selectedTile.x, y = activeTilemap.selectedTile.y) => 
    activeTilemap.spriteSheet.getSprite(x, y);