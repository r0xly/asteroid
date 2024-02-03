// @ts-nocheck
import { start, update } from "../astro-engine/astro.js";
import { camera } from "../astro-engine/core/camera.js";
import { gameObject } from "../astro-engine/core/gameObject.js";
import { isMouseDown, mouseDown, getLocalMousePosition } from "../astro-engine/core/input.js";
import { Vector } from "../astro-engine/util/vector.js";
import { activeTool, tools } from "./tool-selector.js";

const ZOOM_IN_MULTIPLIER = 1.25;
const ZOOM_OUT_MULTIPLIER = 0.8125;

window.onwheel = function(event) {
    if (activeTool !== tools.mouse)
        return;

    const zoomFactor = event.deltaY > 0 ? ZOOM_OUT_MULTIPLIER : ZOOM_IN_MULTIPLIER;
    camera.zoom *= zoomFactor;
} 


const dragStartPosition = Vector.Zero;  
const dragStartMouse = Vector.Zero;

mouseDown(() => {
    const mousePosition = getLocalMousePosition();

    dragStartMouse.x = mousePosition.x;
    dragStartMouse.y = mousePosition.y;

    dragStartPosition.x = camera.position.x;
    dragStartPosition.y = camera.position.y;
});

update(() => {
    if (!isMouseDown || activeTool !== tools.mouse)
        return;

    const mousePosition = getLocalMousePosition();

    camera.position.x = dragStartPosition.x + (dragStartMouse.x - mousePosition.x);
    camera.position.y = dragStartPosition.y + (dragStartMouse.y - mousePosition.y);
});