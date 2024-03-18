/**
 * @typedef { (tileId: import("../../astro-engine/util/vector.js").Vector) => void } ToolEvent
 * 
 * @typedef { Object } Tool
 * @property { ToolEvent } onMouseDown 
 * @property { ToolEvent } onMouseUp 
 * @property { ToolEvent } onMouseMove
 * @property { string } keybind
 * @property { string } name
 */

const defaultToolBehavior = () => {};

/** @type { Map<string, Tool> } */
export const toolKeybindMap = new Map();

/** @type { Map<string, Tool> } */
export const toolNameMap = new Map();

/**
 * Creates a tool object and binds it to a key
 * @param { string } name - The tool's name 
 * @param { string } keybind - The tool's keybind (must be unique)
 * @param { ToolEvent = } onMouseDown - Runs when the mouse button is pressed down if the tool is active
 * @param { ToolEvent = } onMouseUp - Runs when the mouse button is let go if the and tool if active
 * @param { ToolEvent = } onMouseMove - Runs while the mouse is moving and tool is active
 * @returns { Tool }
 */
export const createTool = (name, keybind, onMouseDown, onMouseUp, onMouseMove) => {
    /** @type { Tool } */
    const tool =  {
        onMouseDown: onMouseDown || defaultToolBehavior,
        onMouseMove: onMouseMove || defaultToolBehavior,
        onMouseUp: onMouseUp || defaultToolBehavior,
        keybind: keybind,
        name: name,
    }

    toolKeybindMap.set(keybind, tool);
    toolNameMap.set(keybind, tool);

    return tool;
}