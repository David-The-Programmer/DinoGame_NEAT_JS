/**
 * File: TextTag.js
 * ------------------
 * Class for the Text Tag object
 */
class TextTag {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    draw(string) {
        push();
        fill(0);
        noStroke();
        textSize(20);
        text(string, this.x, this.y);
        pop();
    }
}