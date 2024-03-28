import { Sprite } from "../../../astro-engine/sprites/sprite.js";
import { Vector } from "../../../astro-engine/util/vector.js";
import { clearPreview, disablePreviewMode, drawTile, enablePreviewMode } from "../../grid/tile-controller.js";
import { getSelectedSprite } from "../../tilemap/tilemap-controller.js";
import { createTool } from "../tool-builder.js";


/**
 * Draws a line between two points
 * @param { Vector } startPoint - The tile ID where the line starts
 * @param { Vector } endPoint - The tile ID where the line ends
 * @param { Sprite = } sprite - The tile sprite to draw
 * @param { import("../../grid/layer.js").Layer = } layer - The layer which the tile will be drawn at  
 */
export const drawLine = (startPoint, endPoint, sprite, layer) => {
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
        drawTile(x0, y0, sprite, layer);
        
        if (x0 === x1 && y0 === y1) 
            break;

        const e2 = 2 * err;

        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
}

let startPoint = Vector.Zero;
let mouseDown = false;

const onMouseDown = tileId => {
    mouseDown = true;
    startPoint = tileId;

    enablePreviewMode();
}


const onMouseUp = tileId => {
    mouseDown = false;

    disablePreviewMode();
    drawLine(startPoint, tileId, getSelectedSprite());
}

const onMouseMove = tileId => {
    if (!mouseDown)
        return;

    clearPreview();
    drawLine(startPoint, tileId, getSelectedSprite());
}

export const lineTool = createTool("Line", "l", onMouseDown, onMouseUp, onMouseMove);