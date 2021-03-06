# Bubble Canvas

This is javascript module that draws the effect of bubbles on the canvas

### Screenshot

![Screenshot](./images/bubbles.png)

### Demo

[codesandbox.io](https://codesandbox.io/s/bubble-canvas-c12nv1)

### Installation

1. Put bubbles.js in your project
2. HTML:
   ```html
   <canvas id="canvasId"></canvas>
   <script src="bubbles.js"></script>
   ```
3. Javascript:

   ```javascript
   const instance = canvasBubbles('canvasId');
   instance();
   ```

   More styling options:

   ```javascript
   const instance = canvasBubbles('canvasId', {
     colorSet: ['', '#d32821', '#53a66f', '#5db5f8'],
     mouseRadius: 50,
     countBubbles: 400,
     minRadius: 7,
     maxRadius: 20,
     maxSpeed: 3,
     resizeMaxRadius: 50,
     trail: false,
   });
   instance();
   ```

   **Properties**

   - **colorSet**: `Array` (`['', '#d32821', '#53a66f', '#5db5f8']` by default) Array of bubble colors in HEX format
   - **mouseRadius**: `Number` (`100` by default) Size of area around cursor, where bubbles change its radius
   - **countBubbles**: `Number` (`500` by default) Number of bubbles
   - **minRadius**: `Number` (`7` by default) Minimum bubble radius
   - **maxRadius**: `Number` (`20` by default) Maximum bubble radius
   - **maxSpeed**: `Number` (`3` by default) Maximum bubble speed
   - **resizeMaxRadius**: `Number` (`50` by default) The radius of the bubble when hovering over it
   - **trail**: `Boolean` (`false` by default) If trail==true than trail effect is on
