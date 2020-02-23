/**
 * Dino.js
 * -----------
 * Class for the Dinosaur object
 */
class Dino {
    constructor(x, y, w, h, lift, gravity, yDuck, widthDuck, heightDuck, index) {
        this.x = x + (w * 0.2);
        this.y = y + (h * 0.2);
        this.width = w * 0.8;
        this.height = h * 0.8;
        this.velocity = 0;
        this.jumping = false;
        this.falling = false;
        this.ducking = false;

        // amount of force the dino has to lift itself
        this.lift = lift;

        // gravitational force the dino experiences
        this.gravity = gravity;

        this.originalY = this.y;
        this.originalWidth = this.width;
        this.originalHeight = this.height;

        // y of the dino when ducking
        this.yDuck = yDuck;

        // width of the dino when ducking
        this.widthDuck = widthDuck;

        // height of the dino when ducking
        this.heightDuck = heightDuck;

        // index(s) of the images to use for animation
        this.imgIndex = [];

        // timer for animation
        this.animationTimer = 0;

        // game score of the dino
        this.gameScore = 0;

        // index of the NEAT players playing the dino
        this.index = index;

    }

    // function to draw the dino
    // receives an array of images
    draw(images) {
        stroke(255, 0, 0);
        noFill();
        rect(this.x, this.y, this.width, this.height);
        // important, the array of images passed in must be in this sequence
        /**
         * 1) Dino Run Img 1
         * 2) Dino Run Img 2
         * 3) Dino Jump Img
         * 4) Dino Duck Img 1
         * 5) Dino Duck Img 2
         */
        // time for animation
        // if the img index length is one, 
        // only display that image
        let imgX = this.x - (2 * (this.width / 8));
        let imgY = this.y - (2 * (this.height / 8));
        let imgWidth = (this.width / 8) * 12;
        let imgHeight = (this.height / 8) * 12;

        if (this.imgIndex.length == 1) {
            image(images[this.imgIndex[0]], imgX, imgY, imgWidth, imgHeight);
        } else {
            // if the dino is ducking, adjust the coords and dimensions of image accordingly
            if (this.imgIndex[0] == 3 && this.imgIndex[1] == 4) {
                imgX = this.x;
                imgY = this.y;
                imgWidth = (this.width / 8) * 9;
                imgHeight = (this.height / 8) * 10;
            }
            // if the img index length is more than 1, alternate between the two images every 5 frames
            if (this.animationTimer >= 0 && this.animationTimer < 5) {
                image(images[this.imgIndex[0]], imgX, imgY, imgWidth, imgHeight);
            } else if (this.animationTimer >= 5 && this.animationTimer < 10) {
                image(images[this.imgIndex[1]], imgX, imgY, imgWidth, imgHeight);
            }
        }
        this.animationTimer++;
        // reset the animation timer every 10 frames
        if (this.animationTimer == 10) {
            this.animationTimer = 0;
        }
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
                this.velocity += 0.005;
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
            this.velocity += this.gravity;
            this.velocity *= 0.97;
        }
    }

    // function for collision
    // accepts the nearest obstacle in front of it
    // returns boolean
    collided(obstacle) {
        if (obstacle.x + obstacle.width > this.x && obstacle.x < this.x + this.width) {
            if (obstacle.y + obstacle.height > this.y && obstacle.y < this.y + this.height) {
                return true;
            }
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
    // receives the y of ground, y of peak point and outputs of NEAT 
    run(yOfGround, yOfPeakPoint, outputs) {
        // if Neural Net decides to jump, trigger jumping
        // if not, trigger ducking
        // if not, do nothing
        if(outputs[0] >= outputs[1] && outputs[0] >= outputs[2] &&
            this.isOnGround(yOfGround) && !this.falling && !this.ducking && !this.jumping) {
            this.triggerJumping();
            this.setToStandingPos();
        } else if(outputs[1] >= outputs[0] && outputs[1] >= outputs[2] &&
            this.isOnGround(yOfGround) && !this.falling && !this.ducking && !this.jumping) {
            this.triggerDucking();
        }
        // if the jumping is triggered, cause the dino to keep jumping upwards
        if (this.jumping) {
            this.imgIndex = [2];
            this.jump(yOfPeakPoint);

        } else if (this.falling) {
            // if the falling is now triggered (after dino has reached peak point), 
            // cause dino to keep falling (until it reaches the ground)
            this.imgIndex = [2];
            this.fall(yOfGround);

        } else if (this.ducking) {
            // if ducking is triggered, cause the dino to duck
            this.imgIndex = [3, 4];
            this.duck();

        } else {
            // if no keys are pressed,
            // and the dino is not in any state of jumping, falling or ducking,
            // set the dino to be in the standing position
            this.imgIndex = [0, 1];
            this.setToStandingPos();
        }
        // update the y coords
        this.update();
        // increment game score every 4 frames
        if (frameCount % 4 == 0) {
            this.gameScore++;
        }
    }

    // function to generate inputs for NEAT players
    // receives the all the obstacles
    // returns an array of inputs
    genInputs(obstacles) {
        // first, need to get the nearest incoming obstacle (to the dino)
        // to store array of indexes of obstacles
        let indexOfObst = [];
        for (let i = 0; i < obstacles.length; i++) {
            indexOfObst.push(i);
        }
        for (let i = indexOfObst.length - 1; i >= 0; i--) {
            // need to remove all obstacles that have gone past the dino
            if (obstacles[indexOfObst[i]].x + obstacles[indexOfObst[i]].width < this.x) {
                indexOfObst.splice(i, 1);
            }
        }
        // nearest obstacle
        let nearestObst = obstacles[indexOfObst[0]];

        // inputs to be returned
        let inputs = [];
        // inputs
        /**
         * 1) Distance to the nearest incoming obstacle
         * 2) Y of the obstacle
         * 3) Y of obstacle + height of obstacle
         * 4) Dino Y position
         * 5) Speed of obstacles
         * 6) Bias
         */
        inputs[0] = nearestObst.x - (this.x + this.width);
        inputs[1] = nearestObst.y;
        inputs[2] = nearestObst.y + nearestObst.height;
        inputs[3] = this.y;
        inputs[4] = nearestObst.speed;
        inputs[5] = 1;
        return inputs;
    }

    // function to calculate the fitness of a dino
    calcFitness() {
        return this.gameScore ** 2;
    }
}