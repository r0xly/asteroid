export class TextLabel {
    constructor(content, font, fillStyle, textAlign, wrapBackground = false) {
        this.content = content;
        this.font = font;
        this.fillStyle = fillStyle;
        this.textAlign = textAlign;
        this.wrapBackground = wrapBackground;
    }
}