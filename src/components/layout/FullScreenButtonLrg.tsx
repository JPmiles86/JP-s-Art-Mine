// my-gallery/src/components/layout/FullScreenButtonLrg.tsx

import React from 'react';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface FullScreenButtonProps {
  onClick: () => void;
}

const FullScreenButtonLrg: React.FC<FullScreenButtonProps> = ({ onClick }) => {
  return (
    <button className={`${buttonStyles.button}`} onClick={onClick}>
      Full Screen
    </button>
  );
};

export default FullScreenButtonLrg;