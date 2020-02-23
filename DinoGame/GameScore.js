/**
 * File: GameScore.js
 * ------------------
 * Class for the game score object
 */
class GameScore {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.score = 0;
    }

    draw(score) {
        push();
        fill(0);
        noStroke();
        textSize(20);
        text(`${score}`, this.x, this.y);
        pop();
    }
}