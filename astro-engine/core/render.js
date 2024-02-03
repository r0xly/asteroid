import { update } from "../astro.js";
import { Sprite } from "../sprites/sprite.js";
import { createEvent } from "../util/event.js";
import { Vector } from "../util/vector.js";
import { camera } from "./camera.js";
import { gameObjects } from "./gameObject.js";
import { TextLabel } from "./text-label.js";

let backgroundColor;

export function setBackgroundColor(color) {
    backgroundColor = color;
}

const getFontLineHeight = (ctx) => {
    const { actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText('abcdefghijklmnopqrstuvwxyz');
    return actualBoundingBoxAscent + actualBoundingBoxDescent + 4;
}

function renderTextLabel(ctx, position, size, textLabel){
    ctx.font = textLabel.font;
    ctx.textAlign = textLabel.textAlign;
    ctx.fillStyle = textLabel.fillStyle;

    const words = textLabel.content.split(" ");
    const lineHeight = textLabel.lineHeight || getFontLineHeight(ctx);
    textLabel.lineHeight = lineHeight;

    let y = position.y + lineHeight;
    let x = position.x;
    let line = " ";

    if (textLabel.textAlign === "center")
        x += size.x / 2;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > size.x && i > 0) {
            ctx.fillText(line, x, y);
            console.log(x)
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    ctx.fillText(line, x, y);

}

function renderRect(ctx, position, size, color="white") {
    if (color === "none")
        return;
    ctx.fillStyle = color;
    ctx.fillRect(
        position.x,
        position.y,
        size.x,
        size.y
    );
}

function renderRectStroke(ctx, position, size, strokeWidth, strokeColor) {
    if (strokeWidth === 0)
        return;
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(position.x, position.y, size.x, size.y);
}

function renderSprite(ctx, position, size, { image, sx, sy, sWidth, sHeight, })  {
    ctx.drawImage(
        image, 
        sx,
        sy,
        sWidth,
        sHeight,
        position.x,
        position.y,
        size.x,
        size.y
    )
}

update((deltaTime, canvas, ctx) => {
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = backgroundColor;
    if (backgroundColor)
        ctx.fillRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.scale(camera.zoom, camera.zoom);

    ctx.translate(-camera.position.x, camera.position.y);

    for (const object of gameObjects) {
        if (object === undefined) 
            continue;

        const render = object.renderOverride || object.render;
        const position = new Vector(
            (object.position.x  ) - (object.positionPivot.x * object.size.x),
            -(object.position.y ) - (object.positionPivot.y * object.size.y),
        );


        ctx.globalAlpha = object.alpha;

        if (object.flipHorizontally) {
            ctx.scale(-1, 1);
            position.x *= -1;
            position.x -= object.size.x;
        }

        if (object.parent) {
            position.x += object.parent.position.x;
            position.y -= object.parent.position.y;
        }

        ctx.translate(object.position.x, -(object.position.y))
        ctx.rotate(-object.rotation);
        ctx.translate(-(object.position.x), (object.position.y))

        if (render instanceof Sprite)
            renderSprite(ctx, position, object.size, render);
        else if (render instanceof TextLabel)
            renderTextLabel(ctx, position, object.size, render);
        else { 
            renderRect(ctx, position, object.size, object.color);
        }

        renderRectStroke(ctx, position, object.size, object.strokeWidth, object.strokeColor);

    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
});