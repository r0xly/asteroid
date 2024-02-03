import { startEngine } from "./astro-engine/astro.js";
import "./tile-map-editor/camera-controller.js";
import "./astro-engine/core/render.js";
import "./tile-map-editor/grid.js";
import "./tile-map-editor/shortcuts.js";
import { gameObject } from "./astro-engine/core/gameObject.js";
import { Sprite } from "./astro-engine/sprites/sprite.js";
import { setBackgroundColor } from "./astro-engine/core/render.js";

const canvas = document.getElementById("canvas");
startEngine(canvas);


window.onresize = event => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

/** 
gameObject({
    render: new Sprite("https://www.omarsabry.net/mmo-game/assets/main.png"),
    size: [1600 / 2 , 960 / 2]
})
*/

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;