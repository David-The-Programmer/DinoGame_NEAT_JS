/**
 * Obstacle.js
 * ------------
 * Class for the obstacle objects
 */
class Obstacle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    draw() {
        stroke(0, 255, 0);
        noFill();
        rect(this.x, this.y, this.width, this.height);
    }

    move(s) {
        this.x += s;
    }

}