/**
 * @typedef {{[timestamp: number] : import("./sprite.js").Sprite}} KeyFrames
 * 
*  @typedef {Object} SpriteAnimationData
 * @property {boolean=} playOnCreation 
 * @property {number=} playbackSpeed 
 * @property {KeyFrames} keyFrames 
 * @property {number} timeLength 
 * @property {number=} priority 
 * @property {boolean=} loop 
 * 
 * @typedef {Object} SpriteAnimation 
 * @property {import("../core/gameObject.js").GameObject[]} gameObjects
 * @property {number} currentTimestampIndex
 * @property {number} playbackSpeed 
 * @property {number} timePosition 
 * @property {KeyFrames} keyFrames 
 * @property {string[]} timestamps
 * @property {number} timeLength 
 * @property {boolean} playing 
 * @property {number} priority
 * @property {boolean} loop
 */

import { update } from "../astro.js";

/**
 * @type {SpriteAnimation[]}
 */
const spriteAnimations = [];

/**
 * @param {SpriteAnimationData} animationData 
 * @param {...import("../core/gameObject.js").GameObject} gameObject
 * @returns {SpriteAnimation} 
 */
export function createSpriteAnimation(animationData, ...gameObject) {

    const animation =  {
        timestamps: Object.keys(animationData.keyFrames),
        playbackSpeed: animationData.playbackSpeed || 1,
        playing: animationData.playOnCreation || false,
        priority: animationData.priority || 0,
        timeLength: animationData.timeLength,
        keyFrames: animationData.keyFrames,
        loop: animationData.loop || false,
        gameObjects: gameObject,
        currentTimestampIndex: -1,
        timePosition: 0,
    };

    spriteAnimations.push(animation);

    return animation;
}

/**
 * @param {...SpriteAnimation} spriteAnimation 
 */
export function playSpriteAnimation(...spriteAnimation) {
    spriteAnimation.forEach(animation => animation.playing = true);
}

/**
 * @param {...SpriteAnimation} spriteAnimation 
 */
export function stopSpriteAnimation(...spriteAnimation) {
    spriteAnimation.forEach(animation => { 
        if (!animation.playing)
            return;

        resetSpriteAnimation(animation)
        animation.playing = false;
    });
}

function isHighestPriority(spriteAnimation, gameObject) {
    let priority = spriteAnimation.priority;

    for (const animation of spriteAnimations)
        if (animation.gameObjects.includes(gameObject) && animation.priority > priority && animation.playing)
            return false;
    return true;

}


/**
 * @param {SpriteAnimation} animation 
 */
function resetSpriteAnimation(animation) {
    animation.playing = animation.loop;
    animation.timePosition = 0;
    animation.currentTimestampIndex = 0;
    
    animation.gameObjects.forEach(gameObject => {
        if (!isHighestPriority(animation, gameObject))
            return;
        gameObject.renderOverride = undefined;
    });
}

/**
 * @param {SpriteAnimation} animation 
 */
function updateSpriteAnimationFrame(animation) {
    animation.currentTimestampIndex++;
    animation.gameObjects.forEach(gameObject =>  {
        if (!isHighestPriority(animation, gameObject))
            return;

        gameObject.renderOverride = animation.keyFrames[animation.timestamps[animation.currentTimestampIndex]]
    });
}

/**
 * @param {SpriteAnimation} animation 
 * @param {number} deltaTime 
 */
function updateSpriteAnimation(animation, deltaTime) {
    animation.timePosition += deltaTime * animation.playbackSpeed;

    if (animation.timePosition >= animation.timeLength)
        resetSpriteAnimation(animation);
    else if (animation.timePosition >= parseFloat(animation.timestamps[animation.currentTimestampIndex + 1]))
        updateSpriteAnimationFrame(animation);
        
}

update(deltaTime => {
    spriteAnimations.forEach(animation => {
        if (animation.playing)
            updateSpriteAnimation(animation, deltaTime);
    });
});