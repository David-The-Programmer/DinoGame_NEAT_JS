/**
 * File: ObstaclesGenerator.js
 * ----------------------------
 * Class for the generator of the obstacles
 */
class ObstaclesGenerator {
    // receives objects for dimensions for the small, mid, large cactus and bird
    // also receives the dino object and canvas width
    constructor(minCactusDimensions, midCactusDimensions, maxCactusDimensions, birdDimensions, dino, canvasWidth) {
        this.minCactusDimensions = minCactusDimensions;
        this.midCactusDimensions = midCactusDimensions;
        this.maxCactusDimensions = maxCactusDimensions;
        this.birdDimensions = birdDimensions;
        this.dino = dino;
        this.canvasWidth = canvasWidth;
    }

    // function to generate the obstacles
    generateObst() {
        // generate a random number to pick the obstacle to generate
        let obstNum = Math.floor(random(0, 4));

        // obstacle width
        let obstWidth = 0;

        // obstacle height 
        let obstHeight = 0;

        // x of obstacle
        let obstX = this.canvasWidth + Math.floor(random(0, 120));

        // y of obstacle
        let obstY = 0;

        if(obstNum == 0) {
            obstWidth = this.minCactusDimensions.width;
            obstHeight = this.minCactusDimensions.height;
            obstY = 
        }
    }

    // function to generate cactus
    generateCactus() {

    }

    // function to generate bird 
    generateBird() {

    }

}