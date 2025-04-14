import { useEffect, useRef } from 'react';
import { useSelectedImage } from '../../hooks/useSelectedImage';
import { applyBWEffect } from '../../utils/bwEffect';
import { useNavigate } from 'react-router-dom';

function Effect() {
  const { selectedImage } = useSelectedImage();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage || !canvasRef.current) return;

    const image = new Image();
    image.src = selectedImage.path;

    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        imageData.data[i] = avg;
        imageData.data[i + 1] = avg;
        imageData.data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [selectedImage]);

  const handleSave = async () => {
    const buffer = await applyBWEffect(selectedImage.path);
    const name = `${selectedImage.name} - bw.jpeg`;
    window.electronAPI.saveImageWithNewName(name, buffer);
    window.dispatchEvent(new Event("refreshGallery"));
    navigate('/');
  };

  if (!selectedImage) return <p>No image selected.</p>;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%' }}></canvas>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave}>💾 Save Black & White</button>
      </div>
    </div>
  );
}

export default Effect;
