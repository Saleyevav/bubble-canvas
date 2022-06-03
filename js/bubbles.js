'use strict';
let canvas = document.getElementById('canvas');
canvas.height = 480;
canvas.width = 640;
let context = canvas.getContext('2d');

function Bubble(minRadius, maxRadius) {
  const colorSet = ['', '#86C232', '#3CB371', '#222629'];

  this.x = random(maxRadius, canvas.width - maxRadius);
  this.y = random(maxRadius, canvas.height - maxRadius);
  this.dx = random(-3, 3);
  this.dy = random(-3, 3);
  this.radius = random(minRadius, maxRadius);
  this.color =
    colorSet[random(1, colorSet.length)] + getOpacity(this.radius, maxRadius);
  console.log(this.radius + '|' + this.color);
  this.draw = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  };
  this.move = function () {
    if (this.x > canvas.width - this.radius || this.x < this.radius) {
      this.dx = this.dx * -1;
    }
    if (this.y > canvas.height - this.radius || this.y < this.radius) {
      this.dy = this.dy * -1;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
  function getOpacity(radius, maxRadius) {
    let per = Math.round(radius / (maxRadius / 100));
    // console.log(per);
    if (per > 85) return 'E6';
    if (per > 50 && per < 85) return 'BF';
    if (per > 25 && per < 50) return '66';
    return '26';
  }
  function random(min, max) {
    let result = 0;
    while (!result) {
      result = Math.floor(Math.random() * (max - min)) + min;
    }
    return result;
  }
}

function generateBubbles(count, minRadius, maxRadius) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(new Bubble(minRadius, maxRadius));
  }
  arr.sort(function (a, b) {
    return a.radius - b.radius;
  });
  return arr;
}

const bubbles = generateBubbles(100, 1, 20);

requestAnimationFrame(function measure(time) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let bubble of bubbles) {
    bubble.move();
  }
  requestAnimationFrame(measure);
});
