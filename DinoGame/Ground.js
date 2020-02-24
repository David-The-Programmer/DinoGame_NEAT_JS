/**
 * File: Ground.js
 * ------------------
 * Class for the ground object (for generating the obstacles)
 */
class Ground {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw() {
        stroke(0);
        line(this.x, this.y, this.x + this.width, this.y);
    }
}