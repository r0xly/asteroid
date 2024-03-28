import { keyDown, mouseDown, mouseMove, mouseUp } from "../../astro-engine/core/input.js";
import { getTilePosition } from "../grid/tile-controller.js";
import { toolKeybindMap } from "./tool-builder.js";

import { mouseTool } from "./implementations/mouse-tool.js";
import "./implementations/rectangle-tool.js";
import "./implementations/circle-tool.js";
import "./implementations/line-tool.js";
import "./implementations/brush-tool.js";

let activeTool = mouseTool;

/**
 * Returns the tool that is currently active
 * @returns { import("./tool-builder.js").Tool }
 */
export const getActiveTool = () => activeTool;

// Handles tool events 
mouseUp(mousePosition => activeTool.onMouseUp(getTilePosition(mousePosition)));
mouseDown(mousePosition => activeTool.onMouseDown(getTilePosition(mousePosition)));
mouseMove(mousePosition => activeTool.onMouseMove(getTilePosition(mousePosition)));


// Handles tool keybinds
keyDown(key => {
    const tool = toolKeybindMap.get(key);

    if (tool)
        activeTool = tool;
});