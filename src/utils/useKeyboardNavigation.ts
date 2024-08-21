import { useEffect } from 'react';

const useKeyboardNavigation = (
  handleNextPhoto: (() => void) | undefined,
  handlePrevPhoto: (() => void) | undefined,
  swapShape: () => void,
  rotateShape: () => void,
  toggleMergeStatus: () => void,
  isModalOpen: boolean
) => {
  useEffect(() => {
    console.log("isAnyModalOpen: ", isModalOpen); // Debugging

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only execute keyboard navigation logic if no modal is open
      if (!isModalOpen) {
        switch (e.key) {
          case 'ArrowRight':
          case 'n':
          case 'N':
            handleNextPhoto?.();
            break;
          case 'ArrowLeft':
          case 'p':
          case 'P':
            handlePrevPhoto?.();
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextPhoto, handlePrevPhoto, rotateShape, swapShape, toggleMergeStatus, isModalOpen]);
};

export default useKeyboardNavigation;
