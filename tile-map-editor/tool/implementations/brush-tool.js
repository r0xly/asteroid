import { getSelectedSprite } from "../../tilemap/tilemap-controller.js";
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
    previousTile = undefined;
}


const onMouseMove = tileId => {
    if (brushActive && previousTile)
        drawLine(previousTile, tileId, getSelectedSprite());

    previousTile = tileId;
}

export const brushTool = createTool("Brush", "b", onMouseDown, onMouseUp, onMouseMove);