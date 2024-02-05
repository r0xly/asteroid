import { keyDown } from "../astro-engine/core/input.js";
import { setTool, tools } from "./tool-selector.js";

const toolKeyMap = {
    "r": "rectangle",
    "esc": "mouse",
    "v": "mouse",
    "l": "line",
    "b": "brush",
}

keyDown(key => {
    if (toolKeyMap[key])
        setTool(toolKeyMap[key]);
});