// my-gallery/src/Diptychs/downloadDiptych.js
export function downloadDiptych(dataURL, photoId, DiptychIdCode) {
  const filename = generateFilename(photoId, DiptychIdCode);
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link); // Append to body to ensure visibility in the DOM
  link.click();
  document.body.removeChild(link); // Clean up
}

// A utility function to generate the filename
export function generateFilename(photoId, DiptychIdCode) {
  return `JPM_${photoId}_${DiptychIdCode}.png`;
}

// This function can be used in the component's useEffect or any event handler to set the download URL
export async function setDownloadURL(canvas, photoId, DiptychIdCode, fullSize = true) {
  const dataURL = canvas.toDataURL({
    format: 'png',
    multiplier: fullSize ? canvas.width / canvas.getWidth() : 1,
  });
  return dataURL; // This dataURL can be saved in a state or passed directly to downloadDiptych function
}
