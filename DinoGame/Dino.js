/**
 * Dino.js
 * -----------
 * Class for the Dinosaur object
 */
class Dino {
    constructor(x, y, w, h, lift, gravity, yDuck, widthDuck, heightDuck) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.velocity = 0;
        this.jumping = false;
        this.falling = false;
        this.ducking = false;
        this.gameOver = false;

        // amount of force the dino has to lift itself
        this.lift = lift;

        // gravitational force the dino experiences
        this.gravity = gravity;

        this.originalY = y;
        this.originalWidth = w;
        this.originalHeight = h;

        // y of the dino when ducking
        this.yDuck = yDuck;

        // width of the dino when ducking
        this.widthDuck = widthDuck;

        // height of the dino when ducking
        this.heightDuck = heightDuck;
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

    // function to check if the dino has reached the peak point
    // receives the peak point y coords
    // returns boolean
    reachedPeak(yOfPeakPoint) {
        if (this.y + this.height <= yOfPeakPoint) {
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

    // function to trigger ducking
    triggerDucking() {
        this.ducking = true;
    }

    // function for the jumping sequence
    // receives the y coords of peak point
    jump(yOfPeakPoint) {
        // only when the dino is in the state of jumping, 
        // check if dino has reached the peak height from its jump
        // if it reaches the peak, set dino to be in falling state
        if (this.reachedPeak(yOfPeakPoint)) {
            this.jumping = false;
            this.falling = true;
            this.velocity = 0;
        } else {
            if (this.velocity == 0) {
                this.velocity = this.lift;
            } else {
                this.velocity += 0.03;
            }
        }
    }

    // function for the falling sequence
    // receives the y coords of the ground
    fall(yOfGround) {
        // only when the dino is in the state of falling,
        // check if dino has reached the ground
        // if it reaches the ground, set the dino out of falling state
        // reset its velocity
        if (this.isOnGround(yOfGround)) {
            this.falling = false;
            this.velocity = 0;
        } else {
            if (this.velocity == 0) {
                this.velocity = this.gravity;
            } else {
                this.velocity -= 0.03;
            }
        }
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

    // function to set the dino to standing position
    setToStandingPos() {
        this.y = this.originalY;
        this.width = this.originalWidth;
        this.height = this.originalHeight;
    }

    // function to make the dino duck
    duck() {
        this.y = this.yDuck;
        this.width = this.widthDuck;
        this.height = this.heightDuck;
        this.ducking = false;
    }

    // function to run the main game
    // receives the y of ground, y of peak point, 
    run(yOfGround, yOfPeakPoint) {
        // trigger jumping when space is pressed an the dino is on the ground
        if (keyIsPressed && key == " " && this.isOnGround(yOfGround) && !this.falling) {
            this.triggerJumping();
        } else if (keyIsPressed && keyCode == DOWN_ARROW && this.isOnGround(yOfGround)) {
            // trigger the dino to duck when down arrow key is pressed
            this.triggerDucking();
        }
        // if the jumping is triggered, cause the dino to keep jumping upwards
        if (this.jumping) {
            this.jump(yOfPeakPoint);

        } else if (this.falling) {
            // if the falling is now triggered (after dino has reached peak point), 
            // cause dino to keep falling (until it reaches the ground)
            this.fall(yOfGround);

        } else if (this.ducking) {
            // if ducking is triggered, cause the dino to duck
            this.duck();

        } else {
            // if no keys are pressed,
            // and the dino is not in any state of jumping, falling or ducking,
            // set the dino to be in the standing position
            this.setToStandingPos();
        }
        // update the y coords
        this.update();

    }
}