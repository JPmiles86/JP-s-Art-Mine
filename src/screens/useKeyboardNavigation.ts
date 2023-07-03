import { useEffect } from 'react';

const useKeyboardNavigation = (
  handleNextPhoto: () => void,
  handlePrevPhoto: () => void,
  swapShape: () => void,
  rotateShape: () => void,
  toggleMergeStatus: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          handleNextPhoto();
          break;
        case 'ArrowLeft':
          handlePrevPhoto();
          break;
        case 'ArrowUp':
        case 's':
        case 'S':
          swapShape();
          break;
        case 'ArrowDown':
        case 'r':
        case 'R':
          rotateShape();
          break;
        case '0':
        case 'm':
        case 'M':
        case ' ':
          toggleMergeStatus();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextPhoto, handlePrevPhoto, rotateShape, swapShape, toggleMergeStatus]);
};

export default useKeyboardNavigation;
