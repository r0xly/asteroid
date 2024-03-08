/** 
import { clearPreviewTiles, setPreviewTile, setTile } from "../../grid.js";
//import { setTool, tools } from "../../tool-selector.js";

let startTile;


export const updateRectangleTool = (selectedTile) => {
    if (!startTile)
        return;

    clearPreviewTiles();
    drawRectangle(startTile, selectedTile, true);
}

export const startRectangleTool = (selectedTile) => {
    startTile = selectedTile;
};

export const endRectangleTool = (selectedTile) => {
    if (!startTile || !selectedTile)
        return clearPreviewTiles();
    drawRectangle(startTile, selectedTile);
    //setTool(tools.mouse);
    startTile = undefined;
}

export const drawRectangle = (pointA, pointB, preview = false)  => {
    const startX = Math.min(pointA.x, pointB.x);
    const startY = Math.min(pointA.y, pointB.y); 
    const endX = Math.max(pointA.x, pointB.x);
    const endY = Math.max(pointA.y, pointB.y);

    for (let x = startX; x <= endX; x++)
        for (let y = startY; y <= endY; y++)
            (preview ? setPreviewTile : setTile)(x, y, getSelectedLayer(), selectedSpriteId);
}
*/