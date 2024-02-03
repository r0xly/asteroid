import { isMouseDown } from "../../astro-engine/core/input.js";
import { setTile } from "../grid.js";
import { CURRENT_LAYER } from "../layers.js";

export function updateBrushTool(deltaTime, selectedTile, previousSelectedTile) {
    if (!isMouseDown || (selectedTile.x === previousSelectedTile.x && selectedTile.y === previousSelectedTile.y))
        return;

    setTile(selectedTile.x, selectedTile.y, CURRENT_LAYER, "cyan");
}