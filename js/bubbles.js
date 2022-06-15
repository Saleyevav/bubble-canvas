/**CanvasBubble v1.0.0
 *Developed by Alexandr Saleyev
 *email: saleyevav@yandex.ru
 *15.06.2022
 */

'use strict';
const canvasBubbles = (function () {
  const defaultOptions = {
    colorSet: ['', '#d32821', '#53a66f', '#5db5f8'],
    mouseRadius: 100,
    countBubbles: 500,
    minRadius: 7,
    maxRadius: 20,
    maxSpeed: 3,
    resizeMaxRadius: 50,
    trail: false,
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
      result = Math.random() * (max - min) + min;
    }
    return result;
  }

  function Bubble(canvas, context, options) {
    const { maxRadius, minRadius } = options;
    const colorSet = options.colorSet;
    const mouseRadius = options.mouseRadius;
    const resizeMaxRadius = options.resizeMaxRadius;
    const maxSpeed = options.maxSpeed;
    let mouseX = 0;
    let mouseY = 0;
    let x = random(maxRadius, canvas.width - maxRadius);
    let y = random(maxRadius, canvas.height - maxRadius);
    let dx = random(-maxSpeed, maxSpeed);
    let dy = random(-maxSpeed, maxSpeed);
    let radius = Math.floor(random(minRadius, maxRadius));
    const startRadius = radius;

    const nativeColor = colorSet[Math.floor(random(1, colorSet.length))];
    let color = nativeColor + getOpacity(radius, maxRadius);
    const startColor = color;

    function draw() {
      context.beginPath();
      context.fillStyle = color;
      context.arc(x, y, radius, 0, 2 * Math.PI);
      context.fill();
    }

    function resize(mouseRadius) {
      if (
        x > mouseX - mouseRadius &&
        x < mouseX + mouseRadius &&
        y > mouseY - mouseRadius &&
        y < mouseY + mouseRadius
      ) {
        color = nativeColor;
        if (radius < resizeMaxRadius) {
          radius += 3;
        }
      } else {
        if (radius > startRadius) {
          radius -= 3;
        } else {
          radius = startRadius;
          color = startColor;
        }
      }
    }

    this.move = function () {
      if (x > canvas.width - radius || x < radius) {
        dx = dx * -1;
      }
      if (y > canvas.height - radius || y < radius) {
        dy = dy * -1;
      }
      x += dx;
      y += dy;

      resize(mouseRadius);
      draw();
    };

    this.setMouseXY = function (x, y) {
      mouseX = x;
      mouseY = y;
    };
  }

  return function (canvasId, clientOptions) {
    const options = {
      ...defaultOptions,
      ...clientOptions,
    };

    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    let mouseX = undefined;
    let mouseY = undefined;
    canvas.addEventListener('mousemove', function (e) {
      mouseX = e.offsetX;
      mouseY = e.offsetY;
    });

    window.addEventListener('resize', function () {
      canvas.height = canvas.clientHeight;
      canvas.width = canvas.clientWidth;
    });

    function generateBubbles() {
      const arr = [];
      for (let i = 0; i < options.countBubbles; i++) {
        arr.push(new Bubble(canvas, context, options));
      }
      arr.sort(function (a, b) {
        return a.radius - b.radius;
      });
      return arr;
    }
    const bubbles = generateBubbles();

    function animate() {
      if (!options.trail) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (let bubble of bubbles) {
        bubble.setMouseXY(mouseX, mouseY);
        bubble.move();
      }
      requestAnimationFrame(animate);
    }

    return function () {
      generateBubbles();
      animate();
    };
  };
})();
