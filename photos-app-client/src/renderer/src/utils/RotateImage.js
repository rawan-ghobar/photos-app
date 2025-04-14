export async function rotateImageBuffer(dataURL, angle) {
  const image = await loadImage(dataURL);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const rad = (angle * Math.PI) / 180;

  if (angle % 180 === 0) {
    canvas.width = image.width;
    canvas.height = image.height;
  } else {
    canvas.width = image.height;
    canvas.height = image.width;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rad);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
  return await blob.arrayBuffer();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
