'use strict';
const canvasBubbles = (function () {
  function Canvas(canvasId, options) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;
    console.log(canvasId + '|' + this.canvas.width + 'x' + this.canvas.height);
    let mouseX = undefined;
    let mouseY = undefined;
    const canvas = this.canvas;
    const context = this.context;

    this.canvas.onmousemove = (e) => {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    };

    window.onresize = (e) => {
      console.log('resize: ' + this.canvas.id + '|' + this.canvas.width);
      this.canvas.height = canvas.clientHeight;
      this.canvas.width = canvas.clientWidth;
    };

    this.animate = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let bubble of this.bubbles) {
        bubble.move();
      }
      requestAnimationFrame(this.animate);
    };
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
    this.start = () => {
      this.bubbles = generateBubbles(
        options.countBubbles,
        options.minRadius,
        options.maxRadius
      );
      this.animate();
    };
    function Bubble(minRadius, maxRadius) {
      const colorSet = options.colorSet;
      const mouseRadius = options.mouseRadius;
      this.x = random(maxRadius, canvas.width - maxRadius);
      this.y = random(maxRadius, canvas.height - maxRadius);
      this.dx = random(-3, 3);
      this.dy = random(-3, 3);
      this.radius = random(minRadius, maxRadius);
      this.startRadius = this.radius;
      const color = colorSet[random(1, colorSet.length)];
      this.color = color + getOpacity(this.radius, maxRadius);
      this.startColor = this.color;
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
        this.resize(mouseRadius);
        this.draw();
      };
      this.resize = function (mouseRadius) {
        if (
          this.x > mouseX - mouseRadius &&
          this.x < mouseX + mouseRadius &&
          this.y > mouseY - mouseRadius &&
          this.y < mouseY + mouseRadius
        ) {
          this.color = color;
          if (this.radius < 50) {
            this.radius += 3;
          }
        } else {
          if (this.radius > this.startRadius) {
            this.radius -= 3;
          } else {
            this.radius = this.startRadius;
            this.color = this.startColor;
          }
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
  }

  return function (
    canvasId,
    options = {
      colorSet: ['', '#251D3A', '#2A2550', '#B20600'],
      mouseRadius: 100,
      countBubbles: 500,
      minRadius: 1,
      maxRadius: 10,
    }
  ) {
    return new Canvas(canvasId, options);
  };
})();

const instance = canvasBubbles('canvasBubbles', {
  colorSet: ['', '#d32821', '#53a66f', '#5db5f8'],
  mouseRadius: 100,
  countBubbles: 500,
  minRadius: 7,
  maxRadius: 20,
});
instance.start();
const instance2 = canvasBubbles('canvasBubbles2');
instance2.start();
