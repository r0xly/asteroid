import { gameObject } from "../../astro-engine/core/gameObject.js";
import { Sprite } from "../../astro-engine/sprites/sprite.js";
import { Vector } from "../../astro-engine/util/vector.js";
import { GRID_HEIGHT, GRID_WIDTH } from "../grid.js";


export const createLayer = (layer) => {
    const layerCanvas = document.createElement("canvas");
    layerCanvas.width = GRID_WIDTH;
    layerCanvas.height = GRID_HEIGHT;
    const layerCtx = layerCanvas.getContext("2d");

    layerCtx.fillRect(0, 0, 100, 100);


    const object = gameObject({
        layer: 0,
        size: new Vector(GRID_WIDTH, GRID_HEIGHT),
        render: new Sprite(layerCanvas.toDataURL()),
    })

    return object;
}