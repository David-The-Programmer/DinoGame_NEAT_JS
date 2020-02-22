/**
 * File: sketch.js
 * ----------------
 * This file is the main program for the game itself only
 */

// Width of the canvas
const CANVAS_WIDTH = 800;

// Height of the canvas
const CANVAS_HEIGHT = 300;

// Width of the dino
const DINO_WIDTH = 36;

// Height of the Dino
const DINO_HEIGHT = 42;

// width of the dino when ducking
const DINO_DUCK_WIDTH = 50;

// height of the dino when ducking
const DINO_DUCK_HEIGHT = 26;

// x position of the dino
const X_OF_DINO = 100;

// y coordinate of the ground level
const Y_OF_GROUND = CANVAS_HEIGHT * (3 / 4);

// starting y postion of the dino
const Y_OF_DINO = Y_OF_GROUND - DINO_HEIGHT;

// y position of the peak (the bottom of the dino has to reach the peak)
const Y_OF_PEAK = Y_OF_DINO / 1.2;

// y position of the dino when ducking
const Y_OF_DINO_DUCKING = Y_OF_DINO + (DINO_HEIGHT - DINO_DUCK_HEIGHT);

// starting upward force
const LIFT = -5.1;

// downward force
const GRAVITY = -1 * LIFT;

// minimum width of the obstacle
const MIN_CACTUS_WIDTH = 15;

// minimum HEIGHT of the obstacle
const MIN_CACTUS_HEIGHT = 30;

// mid width of the obstacle
const MID_CACTUS_WIDTH = 30;

// mid HEIGHT of the obstacle
const MID_CACTUS_HEIGHT = 20;

// maximum width of the obstacle
const MAX_CACTUS_WIDTH = 20;

// maximum HEIGHT of the obstacle
const MAX_CACTUS_HEIGHT = 40;

const BIRD_WIDTH = 40;

const BIRD_HEIGHT = 34;

// y coordinate of the line above the ground
const Y_OF_GROUND_LINE = Y_OF_GROUND - 5;

// minimum width between each obstacles
const MIN_DIST_BTWN_OBS = DINO_WIDTH * 8;

// amount which the speed increases by 
const SPEED_INCREASE = -0.00001;

// speed of the movement of the obstacles
let obstSpeed = -5;

// Dino object
let dino;

// Ground object
let ground;

// Obstacle objects
let obstacles = [];

// Obstacle generator
let obstGenerator;

// sprites for use
let dinoRunImg1;
let dinoRunImg2;
let dinoJumpImg;
let smallCactusImg;
let manySmallCactusImg;
let largeCactusImg;
let dinoDuckImg1;
let dinoDuckImg2;
let birdImg1;
let birdImg2;

// need to preload all the sprites for use here
function preload() {
    dinoRunImg1 = loadImage('assets/dinorun0000.png');
    dinoRunImg2 = loadImage('assets/dinorun0001.png');
    dinoJumpImg = loadImage('assets/dino0000.png');
    smallCactusImg = loadImage('assets/cactusSmall0000.png');
    manySmallCactusImg = loadImage('assets/cactusSmallMany0000.png');
    largeCactusImg = loadImage('assets/cactusBig0000.png');
    dinoDuckImg1 = loadImage('assets/dinoduck0000.png');
    dinoDuckImg2 = loadImage('assets/dinoduck0001.png');
    birdImg1 = loadImage('assets/berd.png');
    birdImg2 = loadImage('assets/berd2.png');
}

function setup() {
    // init stuff here
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    dino = new Dino(X_OF_DINO, Y_OF_DINO, DINO_WIDTH, DINO_HEIGHT, LIFT, GRAVITY,
        Y_OF_DINO_DUCKING, DINO_DUCK_WIDTH, DINO_DUCK_HEIGHT);
    ground = new Ground(0, Y_OF_GROUND, CANVAS_WIDTH, CANVAS_HEIGHT - Y_OF_GROUND);
    let minCactusDimensions = new Dimension(MIN_CACTUS_WIDTH, MIN_CACTUS_HEIGHT);
    let midCactusDimensions = new Dimension(MID_CACTUS_WIDTH, MID_CACTUS_HEIGHT);
    let maxCactusDimensions = new Dimension(MAX_CACTUS_WIDTH, MAX_CACTUS_HEIGHT);
    let birdDimensions = new Dimension(BIRD_WIDTH, BIRD_HEIGHT);
    obstGenerator = new ObstaclesGenerator(minCactusDimensions, midCactusDimensions, maxCactusDimensions,
        birdDimensions, dino, ground);

    obstacles.push(obstGenerator.generateObst());
}

function draw() {
    // main game loop here
    background(255);
    ground.draw();
    dino.run(Y_OF_GROUND, Y_OF_PEAK);
    // if the last obstacle is a certain distance away from the end of the canvas,
    // generate new obstacle
    if (CANVAS_WIDTH - (obstacles[obstacles.length - 1].x + obstacles[obstacles.length - 1].width) >= MIN_DIST_BTWN_OBS) {
        obstacles.push(obstGenerator.generateObst());
    }
    // if the obstacle has moved out of the canvas, remove it
    for (let i = obstacles.length - 1; i >= 0; i--) {
        if (obstacles[i].x + obstacles[i].width <= 0) {
            obstacles.splice(i, 1);
        }
    }
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        obstacles[i].move(obstSpeed);
        if (dino.collided(obstacles[i])) {
            noLoop();
        }
    }
    dino.draw();
    // increase speed every frame
    obstSpeed += SPEED_INCREASE;

}