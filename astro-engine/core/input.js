import { astroCanvas } from "../astro.js";
import { createEvent } from "../util/event.js";
import { Vector } from "../util/vector.js";
import { camera } from "./camera.js";

export let keysDown = {};
export let isMouseDown = false;
export let mousePosition = new Vector();

export const [keyUp, emitKeyUp] = createEvent();
export const [keyDown, emitKeyDown] = createEvent();
export const [mouseUp, emitMouseUp] = createEvent();
export const [mouseDown, emitMouseDown] = createEvent();

window.onmousemove = ({ clientX, clientY }) => {
    if (!astroCanvas)
        return;

    const { left, top }= astroCanvas.getBoundingClientRect();
    mousePosition.x = (clientX - left - astroCanvas.width / 2) / camera.zoom;
    mousePosition.y = -(clientY - top - astroCanvas.height / 2) / camera.zoom;
}

export function getMousePosition() {
    return mousePosition.add(camera.position.x * camera.zoom, camera.position.y * camera.zoom);    
}

window.onmousedown = event => {
    emitMouseDown();
    isMouseDown = true;
}

window.onmouseup = event => {
    emitMouseUp();
    isMouseDown = false;
}

window.onkeyup = event => {
    const key = event.key.toLocaleLowerCase();

    emitKeyUp(key);

    delete keysDown[key];
}

window.onkeydown = event => {
    const key = event.key.toLocaleLowerCase();

    if (event.target.nodeName === "INPUT")
        return;

    emitKeyDown(key);

    keysDown[key] = true;
}

window.onblur = () => {
    for (const key in keysDown)
        emitKeyUp(key);

    keysDown = {};
}

window.addEventListener("visibilitychange", () => {
    for (const key in keysDown)
        emitKeyUp(key);

    keysDown = {};
});