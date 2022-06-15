const instance = canvasBubbles('canvasBubbles', {
  colorSet: ['', '#d32821', '#53a66f', '#5db5f8'],
  mouseRadius: 100,
  countBubbles: 100,
  minRadius: 7,
  maxRadius: 20,
  count: 10,
});

const instance2 = canvasBubbles('canvasBubbles2', {
  trail: true,
  minRadius: 2,
  maxRadius: 3,
  maxSpeed: 0.7,
  resizeMaxRadius: 20,
});

instance();
instance2();
