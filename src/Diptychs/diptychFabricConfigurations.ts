// my-gallery/src/Diptychs/diptychFabricConfigurations.ts
import { LayoutSpecs } from './LayoutSpecs';

export interface DiptychConfigurations {
  [key: string]: LayoutSpecs; // This allows indexing with a string
}

export const diptychConfigurations = {
    'E_2x3_CD_P_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 2150,
      originalHeight: 1500,
      photoPlacement: {
        angle: -0,
        left: -575,
        flipX: false,
        originX: 'center',
        originY: 'center',
      },
      mirroredPhotoPlacement: {
        angle: 0,
        left: 575,
        flipX: true,
        originX: 'center',
        originY: 'center',
      },
  },
    'E_2x3_CT_P_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 2150,
      originalHeight: 1500,
        photoPlacement: {
          angle: -180,
          left: 575,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: -575,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },
    'E_2x3_DC_L_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 3150,
      originalHeight: 1000, 
      photoPlacement: {
        angle: 270,
        left: 825,
        flipX: false,
        originX: 'center',
        originY: 'center',
      },
      mirroredPhotoPlacement: {
        angle: -270,
        left: -825,
        flipX: true,
        originX: 'center',
        originY: 'center',
      },
    },
    
    'E_2x3_DS_L_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 3150,
      originalHeight: 1000, 
      photoPlacement: {
        angle: -270,
        left: -825,
        flipX: false,
        originX: 'center',
        originY: 'center',
      },
      mirroredPhotoPlacement: {
        angle: 270,
        left: 825,
        flipX: true,
        originX: 'center',
        originY: 'center',
      },
  },
    
    'E_2x3_SD_P_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 2150,
      originalHeight: 1500,
      photoPlacement: {
        angle: 0,
        left: 575,
        flipX: false,
        originX: 'center',
        originY: 'center',
      },
      mirroredPhotoPlacement: {
        angle: 0,
        left: -575,
        flipX: true,
        originX: 'center',
        originY: 'center',
      },
  },
    
    'E_2x3_ST_P_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 2150,
      originalHeight: 1500,
      photoPlacement: {
        angle: 180,
        left: -575,
        flipX: false,
        originX: 'center',
        originY: 'center',
      },
      mirroredPhotoPlacement: {
        angle: 180,
        left: 575,
        flipX: true,
        originX: 'center',
        originY: 'center',
      },
  },
    
    'E_2x3_TC_L_U': {
      frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-unframed.png`,
      shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 3150,
      originalHeight: 1000, 
      photoPlacement: {
        angle: -90,
        left: -825,
        flipX: false,
        originX: 'center',
        originY: 'center',
      },
      mirroredPhotoPlacement: {
        angle: 90,
        left: 825,
        flipX: true,
        originX: 'center',
        originY: 'center',
      },
  },
    
    'E_2x3_TS_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 3150,
        originalHeight: 1000, 
        photoPlacement: {
          angle: -270,
          left: 825,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 270,
          left: -825,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
    },
    
      'E_2x3_CD_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
            angle: -0,
            left: -625,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 625,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_CT_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
          angle: -180,
          left: 625,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: -625,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },
    
      'E_2x3_DC_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
          angle: 270,
          left: 875,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -270,
          left: -875,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },
    
      'E_2x3_DS_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
            angle: -270,
            left: -875,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: 875,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_SD_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
            angle: 0,
            left: 625,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -625,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_ST_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
            angle: 180,
            left: -625,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 625,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_TC_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
            angle: -90,
            left: -875,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: 875,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_TS_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-white-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
            angle: -270,
            left: 875,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: -875,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },

      'E_2x3_CD_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
            angle: -0,
            left: -625,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 625,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_CT_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
          angle: -180,
          left: 625,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: -625,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },
    
      'E_2x3_DC_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
          angle: 270,
          left: 875,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -270,
          left: -875,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },
    
      'E_2x3_DS_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
            angle: -270,
            left: -875,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: 875,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },

      'E_2x3_SD_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
            angle: 0,
            left: 625,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -625,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_ST_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-portrait-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2400,
        originalHeight: 1650,
        photoPlacement: {
            angle: 180,
            left: -625,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 625,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_TC_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
            angle: -90,
            left: -875,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: 875,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
    
      'E_2x3_TS_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-entangled-landscape-black-50px-200gap.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
      originalWidth: 3400,
        originalHeight: 1150,
        photoPlacement: {
            angle: -270,
            left: 875,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: -875,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
      'F_2x3_CD_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2000, 
        originalHeight: 1500, 
        photoPlacement: {
          angle: 0,
          left: -500,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 0,
          left: 500,
          flipX: true,
          originX: 'center',
          originY: 'center',
    },
  },
    
      'F_2x3_CT_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2000, 
        originalHeight: 1500, 
        photoPlacement: {
          angle: 180,
          left: 500,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: -500,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },
    
      'F_2x3_DC_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3000, 
        originalHeight: 1000, 
        photoPlacement: {
          angle: 270,
          left: 750,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -270,
          left: -750,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },
    
      'F_2x3_DS_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3000, 
        originalHeight: 1000, 
        photoPlacement: {
          angle: 90,
          left: -750,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -90,
          left: 750,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },
    
      'F_2x3_SD_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2000, 
        originalHeight: 1500, 
        photoPlacement: {
          angle: 0,
          left: 500,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 0,
          left: -500,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },

      'F_2x3_ST_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2000, 
        originalHeight: 1500, 
        photoPlacement: {
          angle: 180,
          left: -500,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: 500,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },
    
      'F_2x3_TC_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3000, 
        originalHeight: 1000, 
        photoPlacement: {
          angle: 270,
          left: -750,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -270,
          left: 750,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },
    
      'F_2x3_TS_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3000, 
        originalHeight: 1000, 
        photoPlacement: {
          angle: 90,
          left: 750,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -90,
          left: -750,
          flipX: true,
          originX: 'center',
          originY: 'center',
      },
    },
    
      'F_2x3_CD_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, // Updated canvas width for portrait
        originalHeight: 1650, // Updated canvas height for portrait
        photoPlacement: {
            angle: 0,
            left: -500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 500,
            flipX: true,
            originX: 'center',
            originY: 'center',
      },
    },

      'F_2x3_CT_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, 
        originalHeight: 1650,
        photoPlacement: {
            angle: 180,
            left: 500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },

      'F_2x3_DC_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, // Updated canvas width for landscape
        originalHeight: 1150, // Updated canvas height for landscape
        photoPlacement: {
            angle: 270,
            left: 750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -270,
            left: -750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_DS_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, // Updated canvas width for landscape
        originalHeight: 1150, // Updated canvas height for landscape
        photoPlacement: {
            angle: 90,
            left: -750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -90,
            left: 750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_SD_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, 
        originalHeight: 1650, 
        photoPlacement: {
            angle: 0,
            left: 500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_ST_P_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, 
        originalHeight: 1650, 
        photoPlacement: {
            angle: 180,
            left: -500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_TC_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, 
        originalHeight: 1150,
        photoPlacement: {
            angle: 270,
            left: -750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -270,
            left: 750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },

      'F_2x3_TS_L_W': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-white.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, 
        originalHeight: 1150,
        photoPlacement: {
            angle: 90,
            left: 750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -90,
            left: -750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_CD_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, // Updated canvas width for portrait
        originalHeight: 1650, // Updated canvas height for portrait
        photoPlacement: {
            angle: 0,
            left: -500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_CT_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, // Updated canvas width for portrait
        originalHeight: 1650, // Updated canvas height for portrait
        photoPlacement: {
            angle: 180,
            left: 500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_DC_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, // Updated canvas width for landscape
        originalHeight: 1150, // Updated canvas height for landscape
        photoPlacement: {
            angle: 270,
            left: 750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -270,
            left: -750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_DS_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, // Updated canvas width for landscape
        originalHeight: 1150, // Updated canvas height for landscape
        photoPlacement: {
            angle: 90,
            left: -750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -90,
            left: 750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
      'F_2x3_SD_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, // Updated canvas width for portrait
        originalHeight: 1650, // Updated canvas height for portrait
        photoPlacement: {
            angle: 0,
            left: 500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_ST_P_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-portrait-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2150, // Updated canvas width for portrait
        originalHeight: 1650, // Updated canvas height for portrait
        photoPlacement: {
            angle: 180,
            left: -500,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 500,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_TC_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, // Updated canvas width for landscape
        originalHeight: 1150, // Updated canvas height for landscape
        photoPlacement: {
            angle: 270,
            left: -750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -270,
            left: 750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
    
      'F_2x3_TS_L_B': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-fused-landscape-black.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 3150, // Updated canvas width for landscape
        originalHeight: 1150, // Updated canvas height for landscape
        photoPlacement: {
            angle: 90,
            left: 750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -90,
            left: -750,
            flipX: true,
            originX: 'center',
            originY: 'center',
        },
      },
      'E_3x4_CD_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/2x3-Portrait-Shapes-JPM.png`,
        originalWidth: 2580,
        originalHeight: 1600,
        photoPlacement: {
          angle: -0,
          left: -690,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 0,
          left: 690,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
    },

      'E_3x4_CT_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
        originalWidth: 2580,
        originalHeight: 1600,
        photoPlacement: {
          angle: -180,
          left: 690,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: -690,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },

      'E_3x4_DC_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
        originalWidth: 3380,
        originalHeight: 1200,
        photoPlacement: {
          angle: 270,
          left: 890,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: -270,
          left: -890,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
      },
      
      'E_3x4_DS_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
        originalWidth: 3380,
        originalHeight: 1200,
        photoPlacement: {
          angle: -270,
          left: -890,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 270,
          left: 890,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
    },
      
      'E_3x4_SD_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
        originalWidth: 2580,
        originalHeight: 1600,
        photoPlacement: {
          angle: 0,
          left: 690,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 0,
          left: -690,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
    },
      
      'E_3x4_ST_P_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
        originalWidth: 2580,
        originalHeight: 1600,
        photoPlacement: {
          angle: 180,
          left: -690,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 180,
          left: 690,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
    },
      
      'E_3x4_TC_L_U': {
        frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-unframed.png`,
        shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
        originalWidth: 3380,
        originalHeight: 1200,
        photoPlacement: {
          angle: -90,
          left: -890,
          flipX: false,
          originX: 'center',
          originY: 'center',
        },
        mirroredPhotoPlacement: {
          angle: 90,
          left: 890,
          flipX: true,
          originX: 'center',
          originY: 'center',
        },
    },
      
      'E_3x4_TS_L_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3380,
          originalHeight: 1200,
          photoPlacement: {
            angle: -270,
            left: 890,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: -890,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
      
        'E_3x4_CD_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
              angle: -0,
              left: -750,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 0,
              left: 750,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_CT_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
            angle: -180,
            left: 750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -750,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'E_3x4_DC_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
            angle: 270,
            left: 950,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -270,
            left: -950,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'E_3x4_DS_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
            angle: -270,
            left: -950,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: 950,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
      },
      
        'E_3x4_SD_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
              angle: 0,
              left: 750,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 0,
              left: -750,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_ST_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
              angle: 180,
              left: -750,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 180,
              left: 750,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_TC_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
              angle: -90,
              left: -950,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 90,
              left: 950,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_TS_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-white-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
              angle: -270,
              left: 950,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 270,
              left: -950,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },

        'E_3x4_CD_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
            angle: -0,
            left: -750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 750,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'E_3x4_CT_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
            angle: -180,
            left: 750,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -750,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'E_3x4_DC_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
            angle: 270,
            left: 950,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: -270,
            left: -950,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'E_3x4_DS_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
              angle: -270,
              left: -950,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 270,
              left: 950,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
  
        'E_3x4_SD_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
              angle: 0,
              left: 750,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 0,
              left: -750,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_ST_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-portrait-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2860,
          originalHeight: 1760,
          photoPlacement: {
              angle: 180,
              left: -750,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 180,
              left: 750,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_TC_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
              angle: -90,
              left: -950,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 90,
              left: 950,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
      
        'E_3x4_TS_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-entangled-landscape-black-60px-240gap.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3660,
          originalHeight: 1360,
          photoPlacement: {
              angle: -270,
              left: 950,
              flipX: false,
              originX: 'center',
              originY: 'center',
            },
            mirroredPhotoPlacement: {
              angle: 270,
              left: -950,
              flipX: true,
              originX: 'center',
              originY: 'center',
            },
        },
        'F_3x4_CD_P_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2400, 
          originalHeight: 1600, 
          photoPlacement: {
            angle: 0,
            left: -600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_CT_P_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2400, 
          originalHeight: 1600, 
          photoPlacement: {
            angle: 180,
            left: 600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_DC_L_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3200, 
          originalHeight: 1200, 
          photoPlacement: {
            angle: -90,
            left: 800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: -800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_DS_L_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3200, 
          originalHeight: 1200,
          photoPlacement: {
            angle: -270,
            left: -800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: 800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_SD_P_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2400, 
          originalHeight: 1600, 
          photoPlacement: {
            angle: 0,
            left: 600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },

        'F_3x4_ST_P_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2400, 
          originalHeight: 1600, 
          photoPlacement: {
            angle: 180,
            left: -600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_TC_L_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3200, 
          originalHeight: 1200,
          photoPlacement: {
            angle: -90,
            left: -800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: 800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_TS_L_U': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-unframed.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3200, 
          originalHeight: 1200,
          photoPlacement: {
            angle: -270,
            left: 800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: -800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_CD_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 0,
            left: -600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_CT_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 180,
            left: 600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },

        'F_3x4_DC_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -90,
            left: 800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: -800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_DS_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -270,
            left: -800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: 800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_SD_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 0,
            left: 600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_ST_P_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 180,
            left: -600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_TC_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -90,
            left: -800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: 800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },

        'F_3x4_TS_L_W': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-white.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -270,
            left: 800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: -800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_CD_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 0,
            left: -600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: 600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_CT_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 180,
            left: 600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: -600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_DC_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -90,
            left: 800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: -800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_DS_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -270,
            left: -800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: 800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
        'F_3x4_SD_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 0,
            left: 600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 0,
            left: -600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_ST_P_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-portrait-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 2560, 
          originalHeight: 1760,
          photoPlacement: {
            angle: 180,
            left: -600,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 180,
            left: 600,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_TC_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -90,
            left: -800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 90,
            left: 800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },
      
        'F_3x4_TS_L_B': {
          frameImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-fused-landscape-black.png`,
          shapesImagePath: `${process.env.PUBLIC_URL}/assets/images/frames/3x4-Portrait-Shapes-JPM.png`,
          originalWidth: 3360, 
          originalHeight: 1360, 
          photoPlacement: {
            angle: -270,
            left: 800,
            flipX: false,
            originX: 'center',
            originY: 'center',
          },
          mirroredPhotoPlacement: {
            angle: 270,
            left: -800,
            flipX: true,
            originX: 'center',
            originY: 'center',
          },
        },    
  };


  
  