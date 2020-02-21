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

// Dino object
let dino;

// Obstacle objects
let obstacles;

function setup() {
    // init stuff here
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    dino = new Dino(X_OF_DINO, Y_OF_DINO, DINO_WIDTH, DINO_HEIGHT, LIFT, GRAVITY, 
        Y_OF_DINO_DUCKING, DINO_DUCK_WIDTH, DINO_DUCK_HEIGHT);
}

function draw() {
    // main game loop here
    background(255);
    dino.run(Y_OF_GROUND, Y_OF_PEAK);
    dino.draw();
}