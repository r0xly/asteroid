import { Sprite } from "../sprites/sprite.js";
import { Vector } from "../util/vector.js";
import { TextLabel } from "./text-label.js";


/**
 * @typedef {Object} GameObject
 * @property {{[componentId: string]: Object}} components
 * @property {Sprite|string|undefined=} renderOverride
 * @property {Vector} positionPivot
 * @property {Vector} rotationPivot
 * @property {Sprite|string|TextLabel} render
 * @property {number} rotation
 * @property {Vector} position
 * @property {number} strokeWidth
 * @property {string} strokeColor
 * @property {Vector} size
 * @property {string} color
 * @property {number} layer
 * @property {boolean} flipHorizontally
 * @property {number} alpha
 * @property {GameObject|undefined} parent
 */

/**
 * An arrray of all GameObjects, organized by layer.
 * @type {GameObject[]}
*/
export let gameObjects = [];

function resortObjectsByLayer() {
    gameObjects = gameObjects.sort((objectA, objectB) => {
        if (objectA.layer < objectB.layer) 
            return - 1;
        else if (objectA.layer > objectB.layer) 
            return 1;

        return 0;
    });
}


export function addComponent(gameObject, ...components) {
    components.forEach(component => {
        gameObject.components[component.constructor.name] = component;
    });

}

export function removeComponent(gameObject, ...componentIds) {
    componentIds.forEach(id => {
       delete gameObject.components[id] ;
    });
}

/**
 * @param {GameObject} gameObject 
 * @param  {...string} componentIds 
 */
export function getComponent(gameObject, ...componentIds) {
    let components = [];

    for (const id of componentIds) {
        let component = gameObject.components[id];
        
        if (component)  {
            components.push(component);

        }
    }

    return components.length === componentIds.length ? components : undefined;
}

export function queryObjects(...componentIds) {
    let query = [];

    gameObjects.forEach(object  => {
        let components = getComponent(object, ...componentIds);

        if (components) 
            query.push([object, ...components])
    });

    return query;
    /** 
    return gameObjects
        .filter(object => getComponent(object, ...componentIds))
        .map(object => [object, ...getComponent(object, ...componentIds)])
    */
}

export function addPosition(gameObject, x ,y) {
    gameObject.position = gameObject.position.add(x, y);
}

export function deleteObject(gameObject) {
    gameObjects.forEach(object => {
        if (object.parent === gameObject)
            deleteObject(object);
    });

    delete gameObjects[gameObjects.indexOf(gameObject)];
}


/**
 * @param {{
 *  position?: number[] | Vector,
 *  size?: number[] | Vector,
 *  positionPivot?: number[] | Vector,
 *  rotationPivot?: number[] | Vector
 *  alpha?: number,
 *  rotation?: number,
 *  components?: Object[],
 *  render?: string|Sprite|TextLabel,
 *  strokeWidth?: number,
 *  strokeColor?: string,
 *  layer?: number,
 *  parent?: GameObject,
 *  color?: string,
 * }} properties
 * 
 * @return {GameObject}
 */
export function gameObject(properties) {
    const gameObject = {
        positionPivot: new Vector(0.5, 0.5),
        size: new Vector(100, 100),
        rotationPivot: Vector.Zero,
        position: Vector.Zero,
        flipHorizontally: false,
        components: {},
        parent: undefined,
        render: "rect",
        color: "white",
        rotation: 0,
        strokeWidth: 0,
        strokeColor: "black",
        alpha: 1,
        layer: 0,
    }

    for (const [property, value] of Object.entries(properties)) {
        if (property === "components")
            addComponent(gameObject, ...value)
        else if (Array.isArray(value))
            gameObject[property] = new Vector(value[0] || 0, value[1] || 0)
        else 
            gameObject[property] = value;
    }

    gameObjects.push(gameObject);
    resortObjectsByLayer();

    return gameObject;
}