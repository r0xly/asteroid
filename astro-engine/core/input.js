import { astroCanvas, start } from "../astro.js";
import { createEvent } from "../util/event.js";
import { Vector } from "../util/vector.js";
import { camera } from "./camera.js";

export let keysDown = {};
export let isMouseDown = false;

export const [keyUp, emitKeyUp] = createEvent();
export const [keyDown, emitKeyDown] = createEvent();
export const [mouseUp, emitMouseUp] = createEvent();
export const [mouseDown, emitMouseDown] = createEvent();

let localMousePosition = new Vector();


start(canvas => {
    canvas.onmousemove = ({ clientX, clientY }) => {
        if (!astroCanvas)
            return;

        const { left, top } = astroCanvas.getBoundingClientRect();

        localMousePosition.x = (clientX - left - astroCanvas.width / 2) / camera.zoom;
        localMousePosition.y = -(clientY - top - astroCanvas.height / 2) / camera.zoom;
    }

    canvas.onmousedown = event => {
        emitMouseDown();
        isMouseDown = true;
    }
    canvas.onmouseup = event => {
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



})

export const getMousePosition = () => localMousePosition.add(camera.position.x, camera.position.y);    
export const getLocalMousePosition = () => new Vector(localMousePosition.x, localMousePosition.y);


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