import Headbar from "../../components/headbar/headbar";
import Sidebar from "../../components/sidebar/sidebar";
import { useEffect, useState } from 'react';
import './landing.css';
import { useSelectedImage } from '../../hooks/useSelectedImage';

function Landing() {
  const [images, setImages] = useState([]);
  const { selectedImage, setSelectedImage } = useSelectedImage();

  const loadImages = () => {
    try {
      const loaded = window.electronAPI.getSavedImages();
      setImages(loaded);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    const refresh = () => loadImages();
    window.addEventListener("refreshGallery", refresh);
    return () => window.removeEventListener("refreshGallery", refresh);
  }, []);

  return (
    <div className="landing-container">
      <Sidebar />
      <div className="main-content">
        <Headbar />
        <div className="photo-gallery">
          {images.map((img, idx) => (
            <div
              className={`photo-container ${selectedImage?.path === img.path ? 'selected' : ''}`}
              key={idx}
              onDoubleClick={() => console.log("Preview logic coming soon")}
            >
              <div
                className="photo-thumbnail-wrapper"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.path}
                  alt={img.name}
                  className="photo-thumbnail"
                />
                <button
                  className="delete-button"
                  title="Delete Photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.electronAPI.deleteImage(img.realPath); // ✅ use realPath
                    setTimeout(() => {
                      window.dispatchEvent(new Event("refreshGallery"));
                    }, 300);
                  }}
                >
                  🗑️
                </button>
              </div>
              <h3 className="photo-title">{img.name}</h3>
              <p className="photo-date">{img.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Landing;
