import { startEngine } from "./astro-engine/astro.js";
import "./tile-map-editor/camera-controller.js";
import "./astro-engine/core/render.js";
import "./tile-map-editor/grid.js";
import { gameObject } from "./astro-engine/core/gameObject.js";
import { Sprite } from "./astro-engine/sprites/sprite.js";
import { setBackgroundColor } from "./astro-engine/core/render.js";

const canvas = document.getElementById("canvas");
startEngine(canvas);


window.onresize = event => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}


canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;