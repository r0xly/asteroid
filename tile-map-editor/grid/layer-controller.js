import { Layer } from "./layer.js"


/** @type { Map<number, Layer> } */
export const layerOrderMap = new Map();

/**
 * Creates a new layer object 
 * @param {number} order - The order to be displayed
 */
export const createLayer = (order) => {
    const layer = new Layer(order);
    layerOrderMap.set(order, layer);

    return layer;
} 

let activeLayer = createLayer(1);

export const getSelectedLayer = () => activeLayer;