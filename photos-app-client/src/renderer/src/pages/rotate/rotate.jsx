import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelectedImage } from '../../hooks/useSelectedImage';
import { rotateImageBuffer } from '../../utils/rotateImage';
import './rotate.css';

function Rotate() {
  const { selectedImage } = useSelectedImage();
  const [angle, setAngle] = useState(0);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage || !canvasRef.current) return;

    const image = new Image();
    image.src = selectedImage.path;

    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const { width, height } = image;

      canvas.width = height;
      canvas.height = width;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(image, -width / 2, -height / 2);
    };
  }, [angle, selectedImage]);

  const handleRotate = () => {
    setAngle(prev => (prev + 90) % 360);
  };

  const handleSave = async () => {
    const buffer = await rotateImageBuffer(selectedImage.path, angle);
    const rotatedName = `${selectedImage.name} - rotated.jpeg`;
    window.electronAPI.saveImageWithNewName(rotatedName, buffer);

    window.dispatchEvent(new Event("refreshGallery"));
    navigate('/');
  };

  if (!selectedImage) return <p>No image selected.</p>;

  return (
    <div className="rotate-container">
      <canvas ref={canvasRef} className="rotate-canvas"></canvas>
      <div className="rotate-buttons">
        <button onClick={handleRotate} className="rotate-button">Rotate</button>
        <button onClick={handleSave} className="rotate-button">Save</button>
      </div>
    </div>
  );
}

export default Rotate;
