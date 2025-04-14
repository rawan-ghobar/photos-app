import { createImage, getCroppedCanvas } from './imageUtils';

export async function getCroppedImg(imageSrc, croppedAreaPixels, originalName) {
  const image = await createImage(imageSrc);
  const canvas = getCroppedCanvas(image, croppedAreaPixels);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
  const arrayBuffer = await blob.arrayBuffer();

  const croppedName = `${originalName} - cropped.jpeg`;

  window.electronAPI.saveImageWithNewName(croppedName, arrayBuffer);
  return croppedName;
}
