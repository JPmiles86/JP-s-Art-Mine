// GalleryBackgroundSelector.tsx
import React from 'react';
import styles from './GalleryBackgroundSelector.module.css';

interface GalleryBackgroundSelectorProps {
  onChange: (backgroundImage: string) => void;
}

const GalleryBackgroundSelector: React.FC<GalleryBackgroundSelectorProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBackgroundImage = event.target.value;
    onChange(`/assets/images/gallerybg/${selectedBackgroundImage}`);
  };

  return (
    <select className={styles.dropdownSelector} onChange={handleChange}>
      <option value="Gallery-2.png">Gallery 1</option>
      <option value="Gallery-1.png">Gallery 2</option>
      <option value="Room-1.png">Living Room 1</option>
      <option value="Room-2.png">Living Room 2</option>
      <option value="Room-3.png">Living Room 3</option>
    </select>
  );
};

export default GalleryBackgroundSelector;
