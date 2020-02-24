/**
 * File: TextTag.js
 * ------------------
 * Class for the Text Tag object
 */
class TextTag {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.text = "";
    }

    // function to update the text of the text tag
    updateText(newText) {
        this.text = newText;
    }

    // function to update coords of text
    updateCoords(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        push();
        fill(0);
        noStroke();
        text(this.text, this.x, this.y);
        pop();
    }

    // function to get the width of the text in the text tag
    getWidth() {
        textSize(20);
        return textWidth(this.text);
    }

    // function to get the height of the text in the text tag
    getHeight() {
        textSize(20);
        return textAscent() + textDescent();
    }
}