// my-gallery/src/utils/formatDimensions.ts

export const formatDimensions = (dimensions: string): string => {
    return dimensions.replace(/(\d+)x(\d+)/g, '$1 x $2');
  };
  