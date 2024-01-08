// my-gallery/src/interfaces/DownloadableComponentData.ts
export interface DownloadableComponentData {
    originalImageUrl: string;
    mirroredImageUrl?: string; // Optional if not applicable
    transformations?: {
      original?: string;
      mirrored?: string;
    };
    framing?: {
      color?: string;
      style?: string;
    };
    shadow?: boolean;
    // Add other properties as needed...
  }
  