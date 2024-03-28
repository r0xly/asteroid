//@ts-nocheck

import { startEngine } from "./astro-engine/astro.js";
import "./astro-engine/core/render.js";

import "./tile-map-editor/tool/tool-controller.js";
import "./tile-map-editor/grid/layer-controller.js";
import "./tile-map-editor/camera-controller.js";
import "./tile-map-editor/grid.js";
import { getActiveTilemap, setActiveTilemap } from "./tile-map-editor/tilemap/tilemap-controller.js";
import { createTilemap, tilemapNameMap } from "./tile-map-editor/tilemap/tilemap-builder.js";

const canvas = document.getElementById("canvas");
startEngine(canvas);

const updateCanvasSize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

window.onresize = updateCanvasSize;
updateCanvasSize();

const tilemapImage = document.getElementById("tilemap-image");
const tilemapSelectionList = document.getElementById("tilemap-selection-list");

tilemapSelectionList.onchange = e => {
    const tilemap = tilemapNameMap.get(tilemapSelectionList.value);
    setActiveTilemap(tilemap);
    tilemapImage.src = tilemap.spriteSheet.src;
    tilemapSelectionBox.style.width = tilemap.tileWidth + "px";
    tilemapSelectionBox.style.height = tilemap.tileHeight + "px";
    tilemapSelectionBox.style.left = "0px";
    tilemapSelectionBox.style.right = "0px";

    tilemapSelectionList.value = tilemap.name;
}

const addTilemap = (name, tileWidth, tileHeight, imageSrc) => {
    setActiveTilemap(createTilemap(name, "default", imageSrc, tileWidth, tileHeight));
    tilemapImage.src = imageSrc;
    tilemapSelectionBox.style.width = tileWidth + "px";
    tilemapSelectionBox.style.height = tileHeight + "px";
    tilemapSelectionBox.style.left = "0px";
    tilemapSelectionBox.style.right = "0px";

    const optionElement = document.createElement("option");
    optionElement.value = name;
    optionElement.innerHTML = name;
    tilemapSelectionList.appendChild(optionElement);
    tilemapSelectionList.value = name;
}

const tilemapContainer = document.getElementById("tilemap-container");
const tilemapSelectionBox = document.getElementById("tilemap-selection-box");

tilemapContainer.onmousedown = ( { clientX, clientY } ) => {
    const { left, top } = tilemapContainer.getBoundingClientRect();
    const tilemap = getActiveTilemap();

    const x = Math.floor((clientX - left) / tilemap.tileWidth);
    const y = Math.floor((clientY - top) / tilemap.tileHeight);

    tilemapSelectionBox.style.left = x * tilemap.tileWidth + "px";
    tilemapSelectionBox.style.top = y * tilemap.tileHeight + "px";
    tilemap.selectedTile.x = x;
    tilemap.selectedTile.y = y;
}

const importTilemapForm = document.getElementById("import-tilemap-form");

importTilemapForm.onsubmit = e => {
    if (e.submitter.value !== "Import")
        return;

    const formData = new FormData(importTilemapForm);

    const tileWidth = formData.get("width");
    const tileHeight = formData.get("height");
    const imageFile = formData.get("source");
    const name = formData.get("name");

    addTilemap(name, tileWidth, tileHeight, URL.createObjectURL(imageFile));
}

const importTilemapDialog = document.getElementById("import-tilemap-dialog");
const importTilemapButton = document.getElementById("import-tilemap-button");

importTilemapButton.onclick = () => importTilemapDialog.showModal();

addTilemap("default", 16, 16, "./plains.png")