import { startEngine } from "./astro-engine/astro.js";
import "./astro-engine/core/render.js";

import "./tile-map-editor/camera-controller.js";
import "./tile-map-editor/tool/tool-controller.js";

import "./tile-map-editor/grid.js";
import "./tile-map-editor/tile-selector.js";
import "./tile-map-editor/grid/layer-controller.js";
import { gameObject } from "./astro-engine/core/gameObject.js";
import { Sprite } from "./astro-engine/sprites/sprite.js";
import { createLayer } from "./tile-map-editor/grid/layer-controller.js";
import { Vector } from "./astro-engine/util/vector.js";


const canvas = document.getElementById("canvas");
startEngine(canvas);

const updateCanvasSize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

window.onresize = updateCanvasSize;
updateCanvasSize();

/** 
gameObject({
    render: new Sprite("https://www.omarsabry.net/mmo-game/assets/main.png"),
    size: [1600 / 2 , 960 / 2]
})
*/

