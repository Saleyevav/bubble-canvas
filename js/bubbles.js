'use strict';
const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const context = canvas.getContext('2d');
let mouseX = undefined;
let mouseY = undefined;
canvas.onmousemove = (e) => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
};

function Bubble(minRadius, maxRadius) {
  const colorSet = ['', '#86C232', '#3CB371', '#222629'];
  //   const colorSet = ['', '#222629', '#222629', '#222629'];
  this.x = random(maxRadius, canvas.width - maxRadius);
  this.y = random(maxRadius, canvas.height - maxRadius);
  this.dx = random(-3, 3);
  this.dy = random(-3, 3);
  this.radius = random(minRadius, maxRadius);
  const color =
    colorSet[random(1, colorSet.length)] + getOpacity(this.radius, maxRadius);
  this.color = color;

  //console.log(this.radius / (maxRadius / 100) + '|' + this.color);
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
    this.changeColor(50);
    this.draw();
  };
  this.changeColor = function (rad) {
    if (
      this.x > mouseX - rad &&
      this.x < mouseX + rad &&
      this.y > mouseY - rad &&
      this.y < mouseY + rad
    ) {
      this.color = 'red';
    } else {
      this.color = color;
    }
  };
  function getOpacity(radius, maxRadius) {
    let per = radius / (maxRadius / 100);
    if (per >= 85) return 'E6';
    if (per >= 50 && per < 85) return 'BF';
    if (per >= 25 && per < 50) return '66';
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

const bubbles = generateBubbles(500, 1, 10);

requestAnimationFrame(function measure(time) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let bubble of bubbles) {
    bubble.move();
  }
  requestAnimationFrame(measure);
});
