import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SelectedImageContext = createContext();

export const SelectedImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SelectedImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </SelectedImageContext.Provider>
  );
};

SelectedImageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
