"use strict";
let canvas = document.getElementById("canvas");
canvas.height = 480;
canvas.width = 640;
let context = canvas.getContext('2d');

function Bubble(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        context.beginPath();
        context.fillStyle = color;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
    // this.makeLife = function() {
    //     this.
    // }
    this.move = function () {
        if (this.x > (canvas.width - this.radius) || this.x < this.radius) {
            this.dx = this.dx * -1;
        }
        if (this.y > (canvas.height - this.radius) || this.y < this.radius) {
            this.dy = this.dy * -1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }

}

const colorSet = [
    '#86C232',
    '#3CB371',
    '#222629'
]

function random(min,max){
    return Math.floor(Math.random() * (max - min)) + min
}

function generateBubbles(count,minRadius, maxRadius) {
    const arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(new Bubble(
            random(maxRadius,canvas.width-maxRadius),
            random(maxRadius,canvas.height-maxRadius),
            random(1,5),
            random(1,5),
            random(minRadius,maxRadius),
            colorSet[random(0,colorSet.length)] + random(10,90)
        ))
    }
    return arr;
}

const bubbles = generateBubbles(100,3,15);

requestAnimationFrame(function measure(time) {

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let bubble of bubbles) {
        bubble.move();
    }
    requestAnimationFrame(measure);
})



