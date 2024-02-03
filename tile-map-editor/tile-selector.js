import { SpriteSheet } from "../astro-engine/sprites/spriteSheet.js";
import { TILE_SIZE } from "./grid.js";

const spritesheet = document.getElementById("spritesheet");
const img = document.getElementById("image");
const spriteSelector = document.getElementById("sprite-selector")

export const spriteImage = new SpriteSheet(img.src, 16, 16);

export const selectedSpriteId = {
    x: 0,
    y: 0
}

spritesheet.onmousedown = ({ clientX, clientY })=> {
    const { left, top } = spritesheet.getBoundingClientRect();

    const x = Math.floor((clientX - left) / (16 * 4));
    const y = Math.floor((clientY - top) / (16 * 4));


    selectedSpriteId.x = x;
    selectedSpriteId.y = y;

    spriteSelector.style.left = x * 16 * 4 + "px";
    spriteSelector.style.top = y * 16 * 4 + "px";
    
}