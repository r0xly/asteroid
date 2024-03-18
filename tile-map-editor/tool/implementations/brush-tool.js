import { drawTile } from "../../grid/tile-controller.js";
import { selectedSpriteId } from "../../tile-selector.js";
import { createTool } from "../tool-builder.js"
import { drawLine } from "./line-tool.js";

let brushActive = false;
let previousTile;

const onMouseDown = tileId => {
    brushActive = true;
    previousTile = tileId;
}

const onMouseUp = tileId => {
    brushActive = false;
}

const onMouseMove = tileId => {
    if (brushActive && previousTile !== undefined)
        drawLine(previousTile, tileId, selectedSpriteId);

    previousTile = tileId;
}

export const brushTool = createTool("Brush", "b", onMouseDown, onMouseUp, onMouseMove);