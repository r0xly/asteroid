import { Layer } from "./layer.js"


/** @type { Map<number, Layer> } */
export const layerOrderMap = new Map();

/**
 * Creates a new canvas layer object 
 * @param {number} order - The layer which is will be rendered on
 */
export const createLayer = (order) => {
    const layer = new Layer(order);
    layerOrderMap.set(order, layer);

    return layer;
} 

let activeLayer = createLayer(1);

export const getActiveLayer = () => activeLayer;