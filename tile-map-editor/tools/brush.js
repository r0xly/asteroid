import { isMouseDown } from "../../astro-engine/core/input.js";
import { setTile } from "../grid.js";
import { CURRENT_LAYER } from "../layers.js";
import { selectedSpriteId } from "../tile-selector.js";

export const updateBrushTool = (deltaTime, selectedTile, previousSelectedTile) => {
    if (!isMouseDown)
        return;

    setTile(selectedTile.x, selectedTile.y, CURRENT_LAYER, selectedSpriteId);
}