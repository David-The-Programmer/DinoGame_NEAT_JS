/**
 * File: sketch.js
 * ----------------
 * Main program that is run NEAT on the Dinosaur game
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
const Y_OF_PEAK = Y_OF_DINO / 1.25;

// y position of the dino when ducking
const Y_OF_DINO_DUCKING = Y_OF_DINO + (DINO_HEIGHT - DINO_DUCK_HEIGHT);

// starting upward force
const LIFT = -6.7;

// downward force
const GRAVITY = 0.4;

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
const SPEED_INCREASE = -0.0001;

// original speed of obstacles
const ORIG_OBST_SPEED = -5;

// speed of the movement of the obstacles
let obstSpeed = ORIG_OBST_SPEED;

// Array of Dinos
let dinos = [];

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

// game score to be displayed
let gameScoreTag = new TextTag();

// high score to be displayed
let highScoreTag = new TextTag();

// number of generations to be displayed
let numGensTag = new TextTag();

// number of dinos alive
let numDinosAliveTag = new TextTag();

// high score
let highScore = 0;

// NEAT players population
let population;

// Slider to speed up training 
let slider;

// need to preload all the sprites for use here
function preload() {
    dinoRunImg1 = loadImage('./DinoGame/assets/dinorun0000.png');
    dinoRunImg2 = loadImage('./DinoGame/assets/dinorun0001.png');
    dinoJumpImg = loadImage('./DinoGame/assets/dino0000.png');
    smallCactusImg = loadImage('./DinoGame/assets/cactusSmall0000.png');
    manySmallCactusImg = loadImage('./DinoGame/assets/cactusSmallMany0000.png');
    largeCactusImg = loadImage('./DinoGame/assets/cactusBig0000.png');
    dinoDuckImg1 = loadImage('./DinoGame/assets/dinoduck0000.png');
    dinoDuckImg2 = loadImage('./DinoGame/assets/dinoduck0001.png');
    birdImg1 = loadImage('./DinoGame/assets/berd.png');
    birdImg2 = loadImage('./DinoGame/assets/berd2.png');
}

function setup() {
    // init stuff here
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    ground = new Ground(0, Y_OF_GROUND, CANVAS_WIDTH, CANVAS_HEIGHT - Y_OF_GROUND);

    // init the NEAT players as new population
    population = new Population();
    population.init(NEAT_CONFIGS);
    population.initPopulation();

    // init the dinos
    for (let i = 0; i < NEAT_CONFIGS.total_pop; i++) {
        dinos.push(new Dino(X_OF_DINO, Y_OF_DINO, DINO_WIDTH, DINO_HEIGHT, LIFT, GRAVITY,
            Y_OF_DINO_DUCKING, DINO_DUCK_WIDTH, DINO_DUCK_HEIGHT, i));
    }

    // init the dimensions of obstacles
    let minCactusDimensions = new Dimension(MIN_CACTUS_WIDTH, MIN_CACTUS_HEIGHT);
    let midCactusDimensions = new Dimension(MID_CACTUS_WIDTH, MID_CACTUS_HEIGHT);
    let maxCactusDimensions = new Dimension(MAX_CACTUS_WIDTH, MAX_CACTUS_HEIGHT);
    let birdDimensions = new Dimension(BIRD_WIDTH, BIRD_HEIGHT);

    // init the obstacle generator to generate obstacles
    obstGenerator = new ObstaclesGenerator(minCactusDimensions, midCactusDimensions, maxCactusDimensions,
        birdDimensions, dinos[0], ground);

    obstacles.push(obstGenerator.generateObst());
    // init slider to speed up the training process
    slider = createSlider(1, 50, 1);
    slider.position((CANVAS_WIDTH - slider.width) / 2, CANVAS_HEIGHT);
}

function draw() {
    for (let x = 0; x < slider.value(); x++) {
        // main game loop here
        background(255);
        ground.draw();

        // Once all the dinos die, 
        // need to generate new population
        if (dinos.length == 0) {
            // need to remove all the obstacles and start over
            obstacles = [];
            obstacles.push(obstGenerator.generateObst());
            // reset variables too
            obstSpeed = ORIG_OBST_SPEED;
            population.getNewPopulation();
            // init the dinos
            for (let i = 0; i < NEAT_CONFIGS.total_pop; i++) {
                dinos.push(new Dino(X_OF_DINO, Y_OF_DINO, DINO_WIDTH, DINO_HEIGHT, LIFT, GRAVITY,
                    Y_OF_DINO_DUCKING, DINO_DUCK_WIDTH, DINO_DUCK_HEIGHT, i));
            }
        } else {
            for (let i = 0; i < dinos.length; i++) {
                // need to get inputs from dino here
                // need to send inputs to NEAT 
                // by calling population.population[index].player(inputs)
                // function above would give output
                // use output to select course of action (jump or duck)
                // pass output to dino.run()
                // softmax the output when passing into dino.run()
                let outputs = population.population[dinos[i].index].play(dinos[i].genInputs(obstacles));
                dinos[i].run(Y_OF_GROUND, Y_OF_PEAK, softMax(outputs));
                dinos[i].draw([dinoRunImg1, dinoRunImg2, dinoJumpImg, dinoDuckImg1, dinoDuckImg2])
            }
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
                obstacles[i].draw([smallCactusImg, manySmallCactusImg, largeCactusImg, birdImg1, birdImg2]);
                obstacles[i].move(obstSpeed);
                for (let j = dinos.length - 1; j >= 0; j--) {
                    if (dinos[j].collided(obstacles[i])) {
                        // once a dino dies, set fitness score of NEAT player
                        // by calling population.population[index].setScore(fitnessScore)
                        population.population[dinos[j].index].setScore(dinos[j].calcFitness())
                        dinos.splice(j, 1);
                    }
                }
            }
            // increase speed every frame
            obstSpeed += SPEED_INCREASE;
        }
        displayStats();

    }
}

// function to display the game stats
// Score, High Score, Generation Number and No. of dino alive
function displayStats() {
    let score = calcCurrentScore(dinos);
    highScore = calcHighScore(score, highScore);

    gameScoreTag.updateText(`${score}`);
    highScoreTag.updateText(`HI ${highScore}`);
    numGensTag.updateText(`Generation: ${population.generation}`);
    numDinosAliveTag.updateText(`Number of dinos alive: ${dinos.length} / ${NEAT_CONFIGS.total_pop}`);

    gameScoreTag.updateCoords(CANVAS_WIDTH - gameScoreTag.getWidth(), gameScoreTag.getHeight());
    highScoreTag.updateCoords(CANVAS_WIDTH - (highScoreTag.getWidth() * 2), highScoreTag.getHeight());
    numGensTag.updateCoords((CANVAS_WIDTH / 2) - (numGensTag.getWidth() / 2), numGensTag.getHeight());
    numDinosAliveTag.updateCoords((CANVAS_WIDTH / 2) - (numDinosAliveTag.getWidth() / 2),
        numGensTag.getHeight() + numDinosAliveTag.getHeight());

    gameScoreTag.draw();
    highScoreTag.draw();
    numGensTag.draw();
    numDinosAliveTag.draw();
}

// function to calculate the current highest score of the current generation
// receives the current generation of dinos
// returns the current highest score
function calcCurrentScore(dinos) {
    let score = 0;
    for (let i = 0; i < dinos.length; i++) {
        if (score < dinos[i].gameScore) {
            score = dinos[i].gameScore;
        }
    }
    return score;
}

// function to calculate the highest score out of all the generations
// receives the current score and current high score
// returns the high score
function calcHighScore(currentScore, currentHighScore) {
    let highScore = currentHighScore;
    if (highScore < currentScore) {
        highScore = currentScore;
    }
    return highScore;
}