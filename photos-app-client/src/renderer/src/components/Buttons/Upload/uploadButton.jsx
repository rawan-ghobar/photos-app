import PropTypes from 'prop-types';
import { FaPlus } from "react-icons/fa6";
import './uploadButton.css';

function UploadButton({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onUpload) {
      onUpload(file);
      setTimeout(() => {
        window.dispatchEvent(new Event("refreshGallery"));
      }, 300);
    }
  };

  return (
    <li className="upload-btn-container">
      <button
        type="button"
        className="upload-btn"
        onClick={() => document.getElementById('fileInput').click()}
      >
        <FaPlus className="sidebar-icon" />
        <span>Upload Photo</span>
      </button>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
      />
    </li>
  );
}

UploadButton.propTypes = {
  onUpload: PropTypes.func,
};

export default UploadButton;
