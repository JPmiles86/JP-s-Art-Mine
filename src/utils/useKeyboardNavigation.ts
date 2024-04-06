// my-gallery/src/screens/useKeyboardNavigation.ts

import { useEffect } from 'react';

// const { isAuthModalOpen } = useStore((state) => state);

// useKeyboardNavigation(
//  isAuthModalOpen ? () => {} : wrappedHandleNextPhoto,
//  isAuthModalOpen ? () => {} : wrappedHandlePrevPhoto,
//  isAuthModalOpen ? () => {} : handleSwapShape,
//  isAuthModalOpen ? () => {} : handleRotateShape,
//  isAuthModalOpen ? () => {} : handleToggleMergeStatus
// );

const useKeyboardNavigation = (
  handleNextPhoto: (() => void) | undefined,
  handlePrevPhoto: (() => void) | undefined,
  swapShape: () => void,
  rotateShape: () => void,
  toggleMergeStatus: () => void,
  isAuthModalOpen: boolean
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only execute keyboard navigation logic if AuthModal is not open
      if (!isAuthModalOpen) {
      switch (e.key) {
        case 'ArrowRight':
          handleNextPhoto?.();
          break;
        case 'ArrowLeft':
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
  }, [handleNextPhoto, handlePrevPhoto, rotateShape, swapShape, toggleMergeStatus, isAuthModalOpen]);
};

export default useKeyboardNavigation;