// @ts-nocheck
import { start, update } from "../astro-engine/astro.js";
import { camera } from "../astro-engine/core/camera.js";
import { gameObject } from "../astro-engine/core/gameObject.js";
import { getMousePosition, isMouseDown, mouseDown,  mousePosition,  mouseUp } from "../astro-engine/core/input.js";
import { Vector } from "../astro-engine/util/vector.js";


window.onwheel = function(event) {
    const zoomFactor = event.deltaY > 0 ? 0.8125 : 1.25;
    camera.zoomPoint.x = mousePosition.x; 
    camera.zoomPoint.y = mousePosition.y; 
    camera.zoom *= zoomFactor;

} 


let mouseX = 0;
let mouseY = 0;
let startX = 0;
let startY = 0;

mouseDown(() => {
    mouseX = mousePosition.x;
    mouseY = mousePosition.y;
    startX = camera.position.x;
    startY = camera.position.y;
});


update((deltaTime) => {
    if (!isMouseDown)
        return;

    let deltaX = mouseX - mousePosition.x;
    let deltaY = mouseY - mousePosition.y;

    camera.position.x = startX + deltaX;
    camera.position.y = startY + deltaY;
});