import { createEvent } from "./util/event.js";

export const [update, fireUpdate] = createEvent()
export const [lateUpdate, fireLateUpdate] = createEvent()
export const [start, fireStart] = createEvent()
export const [init, fireInit] = createEvent()

export let astroRunning = false;
export let astroCanvas;

export function startEngine(canvas) {
    const ctx = canvas.getContext("2d")
    astroCanvas = canvas;
    //ctx.imageSmoothingEnabled = false;

    fireInit(canvas);
    fireStart(canvas);

    let previousUpdateTime = performance.now();

    const runUpdate = (time) => {
        const deltaTime = (time - previousUpdateTime) / 1000;
        previousUpdateTime = time;

        fireUpdate(deltaTime, canvas, ctx);
        requestAnimationFrame(runUpdate);
    }

    runUpdate(previousUpdateTime);

    astroRunning = true;
}
