import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useSelectedImage } from "../../hooks/useSelectedImage"
import { getCroppedImg } from '../../utils/CropImage';
import { useNavigate } from 'react-router-dom';

function Crop() {
  const { selectedImage } = useSelectedImage();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const navigate = useNavigate();

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(selectedImage.path, croppedAreaPixels, selectedImage.name);
    console.log('✅ Cropped image saved:', croppedImage);
    navigate('/');
  };

  if (!selectedImage) return <p>No image selected.</p>;

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Cropper
        image={selectedImage.path}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      <button onClick={handleCropSave} style={{ position: 'absolute', bottom: 20, left: 20 }}>
        Save Cropped
      </button>
    </div>
  );
}

export default Crop;
