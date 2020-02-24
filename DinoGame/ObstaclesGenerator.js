/**
 * File: ObstaclesGenerator.js
 * ----------------------------
 * Class for the generator of the obstacles
 */
class ObstaclesGenerator {
    // receives objects for dimensions for the small, mid, large cactus and bird
    // also receives the dino object and ground object
    constructor(minCactusDimensions, midCactusDimensions, maxCactusDimensions, birdDimensions, dino, ground) {
        this.minCactusDimensions = minCactusDimensions;
        this.midCactusDimensions = midCactusDimensions;
        this.maxCactusDimensions = maxCactusDimensions;
        this.birdDimensions = birdDimensions;
        this.dino = dino;
        this.ground = ground;
    }

    // function to generate the obstacles
    // returns a new obstacle object
    generateObst() {
        // generate a random number to pick the obstacle to generate
        let obstNum = Math.floor(random(0, 4));

        // obstacle width
        let obstWidth = 0;

        // obstacle height 
        let obstHeight = 0;

        // x of obstacle
        let obstX = this.ground.width + Math.floor(random(0, 120));

        // y of obstacle
        let obstY = 0;

        // name of the obstacle
        // All possible names include:
        // sm-cactus
        // md-cactus
        // lg-cactus
        // bird
        let name = "";

        // if the rand number is 0, then generate the small cactus
        if (obstNum == 0) {
            obstWidth = this.minCactusDimensions.width;
            obstHeight = this.minCactusDimensions.height;
            obstY = this.ground.y - obstHeight;
            name = "sm-cactus";

        } else if (obstNum == 1) {
            // if the rand number is 1, then generate the mid-sized cactus
            obstWidth = this.midCactusDimensions.width;
            obstHeight = this.midCactusDimensions.height;
            obstY = this.ground.y - obstHeight;
            name = "md-cactus";

        } else if (obstNum == 2) {
            // if the rand number is 2, then generate the large cactus
            obstWidth = this.maxCactusDimensions.width;
            obstHeight = this.maxCactusDimensions.height;
            obstY = this.ground.y - obstHeight;
            name = "lg-cactus";

        } else if (obstNum == 3) {
            // if the rand number is 3, then generate the bird
            obstWidth = this.birdDimensions.width;
            obstHeight = this.birdDimensions.height;

            // now need to calculate the y of the bird
            let birdYLevel = Math.floor(random(0, 3));
            // zero being the lowest height the bird is placed at, let the bird be just above the ground
            if (birdYLevel == 0) {
                obstY = this.ground.y - obstHeight;

            } else if (birdYLevel == 1) {
                obstY = this.ground.y - this.dino.heightDuck - obstHeight;

            } else {
                obstY = this.ground.y - this.dino.height - obstHeight;
            }
            name = "bird";
        }

        // now return the new obstacle object
        return new Obstacle(obstX, obstY, obstWidth, obstHeight, name);
    }

}