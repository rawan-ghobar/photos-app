import { useContext } from 'react';
import { SelectedImageContext } from '../context/SelectedImageContext';

export const useSelectedImage = () => useContext(SelectedImageContext);
