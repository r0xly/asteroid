import { Vector } from "../../../astro-engine/util/vector.js";
import { clearPreview, disablePreviewMode, drawTile, enablePreviewMode } from "../../grid/tile-controller.js";
import { selectedSpriteId } from "../../tile-selector.js";
import { createTool } from "../tool-builder.js";

const isPointInsidecirlce = (center, point, diameter) => {
    const dx = center.x - point.x;
    const dy = center.y - point.y;

    const distnaceSqaured = dx * dx + dy * dy;

    return 4 * distnaceSqaured <= diameter * diameter;
}


/**
 * Draws a circle from an center point to an end point
 * @param { Vector } centerPoint - The tile ID where the line starts
 * @param { Vector } endPoint - The tile ID where the line ends
 * @param { Object = } tileType - The tile to draw
 * @param { import("../../grid/layer.js").Layer = } layer - The layer which the tile will be drawn at  
 */

export const drawCircle = (centerPoint, endPoint, tileType, layer) => {
    const radius = centerPoint.sub(endPoint).magnitude;

    const bottom = Math.floor(centerPoint.y + radius);
    const right = Math.floor(centerPoint.x + radius);
    const left = Math.ceil(centerPoint.x - radius);
    const top = Math.ceil(centerPoint.y - radius);

    for (let y = top; y <= bottom; y++) 
        for (let x = left; x <= right; x++) 
            if (isPointInsidecirlce(centerPoint, new Vector(x, y), radius * 2)) 
                drawTile(x, y, tileType, layer);
}



let startPoint = Vector.Zero;
let mouseDown = false;

const onMouseDown = tileId =>  {
    mouseDown = true;
    startPoint = tileId;

    enablePreviewMode();
}

const onMouseUp = tileId => {
    mouseDown = false;

    disablePreviewMode();
    drawCircle(startPoint, tileId, selectedSpriteId);
}

const onMouseMove = tileId => {
    if (!mouseDown)
        return;

    clearPreview();
    drawCircle(startPoint, tileId, selectedSpriteId);
}

export const circleTool = createTool("Circle", "c", onMouseDown, onMouseUp, onMouseMove);;