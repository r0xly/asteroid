import { keyDown } from "../astro-engine/core/input.js";
import { setTool, tools } from "./tool-selector.js";

const toolKeyMap = {
    "v": "mouse",
    "esc": "mouse",
    "b": "brush",
}

keyDown(key => {
    if (toolKeyMap[key])
        setTool(toolKeyMap[key]);
});