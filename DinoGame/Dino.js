/**
 * Dino.js
 * -----------
 * Class for the Dinosaur object
 */
class Dino {
    constructor(x, y, w, h, v) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.velocity = v;
    }

    draw() {
        stroke(255, 0, 0);
        noFill();
        rect(this.x, this.y, this.width, this.height);
    }

    // function for the dino to jump
    // should only jump if the dino is on the ground
    jump(upwardForce) {
        this.velocity += upwardForce;
    }

    // function for the dino to fall
    // should only fall after reach
    fall(downwardForce) {
        this.velocity += downwardForce;
    }

    // function for collision
    // accepts the nearest obstacle in front of it
    // returns boolean
    collided(obstacle) {
        // (if the x of dino <= x of obstacle + obstacle width || 
        // if the x of dino + dino width >= x of obstacle) &&
        // (if the y of dino <= y of obstacle + obstacle height ||
        // if the y of dino + dino height >= y of obstacle)
        // If the conditions above are fulfilled, then dino has collided with obstacle
        if(((this.x <= (obstacle.x + obstacle.width)) || ((this.x + this.width) >= obstacle.x)) 
        && ((this.y <= (obstacle.y + obstacle.height)) || ((this.y + this.height) >= obstacle.y))) {
            return true;
        }
    }
}