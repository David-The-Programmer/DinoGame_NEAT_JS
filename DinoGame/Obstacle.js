/**
 * Obstacle.js
 * ------------
 * Class for the obstacle objects
 */
class Obstacle {
    constructor(x, y, w, h, name) {
        this.x = x;
        this.y = y + (h * 0.1);
        this.width = w * 0.9;
        this.height = h * 0.9;
        // name of the obstacle
        // All possible names include:
        // sm-cactus
        // md-cactus
        // lg-cactus
        // bird
        this.name = name;

        // timer for animation
        this.animationTimer = 0;

        // speed of movement of the obstacle
        this.speed = 0;
    }

    // function to draw the cactus and birds
    // receives an array of images
    draw(images) {
        stroke(0, 255, 0);
        noFill();
        rect(this.x, this.y, this.width, this.height);
        // important, the array of images passed in must be in this sequence
        /**
         * 1) sm-cactus
         * 2) md-cactus
         * 3) lg-cactus
         * 4) bird img 1
         * 5) bird img 2
         */
        // time for animation
        // if the img index length is one, 
        // only display that image
        let imgX = this.x - (2 * (this.width / 8));
        let imgY = this.y - (this.height / 8);
        let imgWidth = (this.width / 8) * 11;
        let imgHeight = (this.height / 8) * 11;

        if (this.name == "sm-cactus") {
            image(images[0], imgX, imgY, imgWidth, imgHeight);

        } else if (this.name == "md-cactus") {
            image(images[1], imgX, imgY, imgWidth, imgHeight);

        } else if (this.name == "lg-cactus") {
            image(images[2], imgX, imgY, imgWidth, imgHeight);
        } else {
            if (this.animationTimer >= 0 && this.animationTimer < 10) {
                image(images[3], imgX, imgY, imgWidth, imgHeight);
            } else if (this.animationTimer >= 10 && this.animationTimer < 20) {
                image(images[4], imgX, imgY, imgWidth, imgHeight);
            }
        }
        this.animationTimer++;
        // reset the animation timer every 20 frames
        if (this.animationTimer == 20) {
            this.animationTimer = 0;
        }
        
    }

    move(s) {
        this.speed = s;
        this.x += this.speed;
    }

}