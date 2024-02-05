import { clearPreviewTiles, setPreviewTile, setTile } from "../grid.js";
import { CURRENT_LAYER } from "../layers.js";
import { selectedSpriteId } from "../tile-selector.js";
import { drawRectangle } from "./rectangle.js";

let startTile;

export const startLineTool = (selectedTile) => {
    startTile = selectedTile;
};

export const endLineTool = (selectedTile) => {
    if (!startTile || !selectedTile)
        return;
    clearPreviewTiles();
    drawLine(startTile, selectedTile);
    startTile = undefined;
};


export const updateLineTool = (selectedTile) => {
    if (!startTile)
        return;

    clearPreviewTiles();
    drawLine(startTile, selectedTile, true);
}

export const drawLine = (pointA, pointB, preview = false) => {
    let x0 = pointA.x;
    let y0 = pointA.y;
    let x1 = pointB.x;
    let y1 = pointB.y;

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = Math.sign(x1 - x0);
    const sy = Math.sign(y1 - y0);
    let err = dx - dy;

    while (true) {
        (preview ? setPreviewTile : setTile)(x0, y0, CURRENT_LAYER, selectedSpriteId);
        
        if (x0 === x1 && y0 === y1) 
            break;

        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }

    }
}