/**
 * Dino.js
 * -----------
 * Class for the Dinosaur object
 */
class Dino {
    constructor(x, y, w, h, lift) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.velocity = 0;
        this.jumping = false;
        this.falling = false;
        this.gameOver = false;

        // amount of force the dino has to lift itself
        this.lift = lift;
    }

    draw() {
        stroke(255, 0, 0);
        noFill();
        rect(this.x, this.y, this.width, this.height);
    }

    // updates the y coords of the dino
    update() {
        this.y += this.velocity;
    }

    // function for the dino to jump
    // should only jump if the dino is on the ground
    // receives
    jump() {
        if(this.velocity == 0) {
            this.velocity = this.lift;
        } else {
            this.velocity += 0.05;
        }
    }

    // function for the dino to fall
    // should only fall after reach
    // receives the downward force
    fall(downwardForce) {
        this.velocity += downwardForce;
    }


    // function to check if the dino has reached the peak point
    // receives the peak point y coords
    // returns boolean
    reachedPeak(yOfPeakPoint) {
        if (this.y + this.height <= yOfPeakPoint) {
            this.y = yOfPeakPoint - this.height;
            return true;
        }
    }

    // function to check if the dino is on the ground
    // receives the ground y coords
    // returns boolean
    isOnGround(yOfGround) {
        if (this.y + this.height >= yOfGround) {
            this.y = yOfGround - this.height;
            return true;
        }
    }

    // function to trigger jumping
    triggerJumping() {
        this.jumping = true;
    }

    // function for the entire jumping sequence
    // receives the y coords of ground, y coords of peak point and gravity forces
    jumpSeq(yOfGround, yOfPeakPoint, gravity) {
        // if jumping / falling, cannot allow key input from user to take effect
        // only when on ground, allow key input from user to take effect
        // only when the dino is in the state of jumping, 
        // check if dino has reached the peak height from its jump
        // if it reaches the peak, set dino to be in falling state
        if (this.jumping) {
            if (this.reachedPeak(yOfPeakPoint)) {
                this.jumping = false;
                this.falling = true;
                this.velocity = 0;
            } else {
                this.jump();
            }
        }
        // only when the dino is in the state of falling,
        // check if dino has reached the ground
        // if it reaches the ground, set the dino out of falling state
        // reset its velocity
        if (this.falling) {
            if (this.isOnGround(yOfGround)) {
                this.falling = false;
                this.velocity = 0;
            } else {
                this.fall(gravity);
            }
        }
        // update the y coords
        this.update();
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
        if (((this.x <= (obstacle.x + obstacle.width)) || ((this.x + this.width) >= obstacle.x))
            && ((this.y <= (obstacle.y + obstacle.height)) || ((this.y + this.height) >= obstacle.y))) {
            return true;
        }
    }
}