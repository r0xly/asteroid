import { update } from "../astro-engine/astro.js";
import { camera } from "../astro-engine/core/camera.js";
import { isMouseDown, mouseDown, wheel, getLocalMousePosition } from "../astro-engine/core/input.js";
import { Vector } from "../astro-engine/util/vector.js";
import { mouseTool } from "./tool/implementations/mouse-tool.js";
import { getActiveTool } from "./tool/tool-controller.js";

const ZOOM_IN_MULTIPLIER = 1.25;
const ZOOM_OUT_MULTIPLIER = 0.8125;

const dragStartPosition = Vector.Zero;  
const dragStartMouse = Vector.Zero;

const isMouseActive = () => getActiveTool() === mouseTool;

wheel((event) =>  {
    if (!isMouseActive())
        return;

    const zoomFactor = event.deltaY > 0 ? ZOOM_OUT_MULTIPLIER : ZOOM_IN_MULTIPLIER;
    camera.zoom *= zoomFactor;
}); 


mouseDown(() => {
    const mousePosition = getLocalMousePosition();

    dragStartMouse.x = mousePosition.x;
    dragStartMouse.y = mousePosition.y;

    dragStartPosition.x = camera.position.x;
    dragStartPosition.y = camera.position.y;
});

update(() => {
    if (!isMouseDown || !isMouseActive())
        return;

    const mousePosition = getLocalMousePosition();

    camera.position.x = dragStartPosition.x + (dragStartMouse.x - mousePosition.x);
    camera.position.y = dragStartPosition.y + (dragStartMouse.y - mousePosition.y);
});