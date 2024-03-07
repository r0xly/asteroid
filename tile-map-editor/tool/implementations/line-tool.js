import { Vector } from "../../../astro-engine/util/vector.js";
import { setTile } from "../../grid.js";
import { CURRENT_LAYER } from "../../layers.js";
import { selectedSpriteId } from "../../tile-selector.js";
import { createTool } from "../tool-builder.js";


/**
 * Draws a line between two points
 * @param {Vector} startPoint - The tile ID where the line starts
 * @param {Vector} endPoint - The tile ID where the line ends
 * @param {Object} tileType - The tile to draw
 * @param {number} layer - The layer which the tile will be drawn at  
 */
export const drawLine = (startPoint, endPoint, tileType, layer) => {
    let x0 = startPoint.x;
    let y0 = startPoint.y;
    let x1 = endPoint.x;
    let y1 = endPoint.y;

    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = Math.sign(x1 - x0);
    const sy = Math.sign(y1 - y0);
    let err = dx - dy;

    while (true) {
        setTile(x0, y0, layer, tileType);
        
        if (x0 === x1 && y0 === y1) 
            break;

        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

let startPoint = Vector.Zero;

const onMouseDown = (tileId) => {
    startPoint.x = tileId.x;
    startPoint.y = tileId.y;
}

const onMouseUp = (tileId) => {
    drawLine(startPoint, tileId, selectedSpriteId, CURRENT_LAYER);
}

const onMouseMove = (tileId) => {

}

export const lineTool = createTool("Line", "l", onMouseDown, onMouseUp, onMouseMove);;