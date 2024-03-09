import { Vector } from "../../../astro-engine/util/vector.js";
import { getSelectedLayer } from "../../grid/layer-controller.js";
import { clearPreview, disablePreviewMode, drawTile, enablePreviewMode } from "../../grid/tile-controller.js";
import { selectedSpriteId } from "../../tile-selector.js";
import { createTool, toolKeybindMap } from "../tool-builder.js";


/**
 * Draws a rectnalge between two points
 * @param { Vector } startPoint - The tile ID where the line starts
 * @param { Vector } endPoint - The tile ID where the line ends
 * @param { Object = } tileType - The tile to draw
 * @param { import("../../grid/layer-controller.js").Layer = } layer - The layer which the tile will be drawn at  
 */
export const drawRectangle = (startPoint, endPoint, tileType, layer) => {
    const startX = Math.min(startPoint.x, endPoint.x);
    const startY = Math.min(startPoint.y, endPoint.y); 
    const endX = Math.max(startPoint.x, endPoint.x);
    const endY = Math.max(startPoint.y, endPoint.y);

    for (let x = startX; x <= endX; x++)
        for (let y = startY; y <= endY; y++)
            drawTile(x, y, tileType, layer);
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
    drawRectangle(startPoint, tileId, selectedSpriteId);
}

const onMouseMove = tileId => {
    if (!mouseDown)
        return;

    clearPreview();
    drawRectangle(startPoint, tileId, selectedSpriteId);
}

export const lineTool = createTool("Rectangle", "r", onMouseDown, onMouseUp, onMouseMove);;