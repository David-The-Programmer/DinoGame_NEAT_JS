/**
 * Obstacle.js
 * ------------
 * Class for the obstacle objects
 */
class Obstacle {
    constructor(x, y, w, h, name) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        // name of the obstacle
        // All possible names include:
        // sm-cactus
        // md-cactus
        // lg-cactus
        // bird
        this.name = name;
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