import { keyDown, mouseDown, mouseMove, mouseUp } from "../../astro-engine/core/input.js";
import { getSelectedTile } from "../util/selection.js";
import { mouseTool } from "./implementations/mouse-tool.js";
import { toolKeybindMap } from "./tool-builder.js";

import "./implementations/line-tool.js";

let activeTool = mouseTool;

/**
 * Returns which tool is currently active
 * @returns { import("./tool-builder.js").Tool }
 */
export const getActiveTool = () => activeTool;

// Handles tool events 
mouseUp(mousePosition => activeTool.onMouseUp(getSelectedTile(mousePosition)));
mouseDown(mousePosition => activeTool.onMouseDown(getSelectedTile(mousePosition)));
mouseMove(mousePosition => activeTool.onMouseMove(getSelectedTile(mousePosition)));


// Handles tool keybinds
keyDown(key => {
    const tool = toolKeybindMap.get(key);

    if (tool)
        activeTool = tool;
});