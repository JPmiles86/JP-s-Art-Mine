// my-gallery/src/Diptychs/scaleCanvas.js

export function scaleCanvas(canvas, originalWidth, originalHeight, container, callback) {
  console.log('scaleCanvas called with container:', container);

  const containerWidth = container.clientWidth;
  const aspectRatio = originalWidth / originalHeight;

  // Dynamically calculate the container height based on the aspect ratio
  const containerHeight = containerWidth / aspectRatio;
  container.style.height = `${containerHeight}px`;

  let scaleFactor = containerWidth / originalWidth;

  console.log('Scale factor:', scaleFactor);

  canvas.setWidth(originalWidth * scaleFactor);
  canvas.setHeight(originalHeight * scaleFactor);

  const group = canvas.getObjects().find(obj => obj.type === 'group');
  if (group) {
    group.scaleX = scaleFactor;
    group.scaleY = scaleFactor;

    group.set({
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
    });

    group.setCoords();
  }

  console.log('Canvas dimensions after scaling:', canvas.getWidth(), canvas.getHeight());
  canvas.renderAll();

  // Execute the callback function after scaling is complete
  if (callback && typeof callback === 'function') {
    callback(canvas.getHeight()); // This sends the height back up to the component
  }
}