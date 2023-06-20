// populateDiptychSVGs.js
const DiptychSVG = require('./models/DiptychSVG');

DiptychSVG.bulkCreate([
  { id: 1, DiptychId: 1, FrameId: 1, aspectRatio: '2:3', leftSide: 'Original', leftRotation: '0°', rightSide: 'Mirror', rightRotation: '0°', shapeInCenterEdge: 'Circle', shapeAtTopEdge: 'Diamond', DiptychIdName: '2x3_Entangled_Diptych_Circle_Diamond_Portrait_White', DiptychIdCode: 'E_2x3_CD_P_W' },
  { id: 2, DiptychId: 1, FrameId: 1, aspectRatio: '2:3', leftSide: 'Original', leftRotation: '90°', rightSide: 'Mirror', rightRotation: '-90°', shapeInCenterEdge: 'Diamond', shapeAtTopEdge: 'Square', DiptychIdName: '2x3_Entangled_Diptych_Diamond_Square_Landscape_White', DiptychIdCode: 'E_2x3_DS_L_W' },
  { id: 3, DiptychId: 1, FrameId: 1, aspectRatio: '2:3', leftSide: 'Mirror', leftRotation: '180°', rightSide: 'Original', rightRotation: '0°', shapeInCenterEdge: 'Square', shapeAtTopEdge: 'Circle', DiptychIdName: '2x3_Entangled_Diptych_Square_Circle_Portrait_White', DiptychIdCode: 'E_2x3_SC_P_W' },
  { id: 4, DiptychId: 1, FrameId: 1, aspectRatio: '2:3', leftSide: 'Mirror', leftRotation: '-90°', rightSide: 'Original', rightRotation: '90°', shapeInCenterEdge: 'Circle', shapeAtTopEdge: 'Diamond', DiptychIdName: '2x3_Entangled_Diptych_Circle_Diamond_Landscape_White', DiptychIdCode: 'E_2x3_CD_L_W' },
  { id: 5, DiptychId: 1, FrameId: 1, aspectRatio: '3:2', leftSide: 'Original', leftRotation: '0°', rightSide: 'Mirror', rightRotation: '0°', shapeInCenterEdge: 'Diamond', shapeAtTopEdge: 'Square', DiptychIdName: '3x2_Entangled_Diptych_Diamond_Square_Portrait_White', DiptychIdCode: 'E_3x2_DS_P_W' },
  { id: 6, DiptychId: 1, FrameId: 1, aspectRatio: '3:2', leftSide: 'Original', leftRotation: '90°', rightSide: 'Mirror', rightRotation: '-90°', shapeInCenterEdge: 'Square', shapeAtTopEdge: 'Circle', DiptychIdName: '3x2_Entangled_Diptych_Square_Circle_Landscape_White', DiptychIdCode: 'E_3x2_SC_L_W' },
  { id: 7, DiptychId: 1, FrameId: 1, aspectRatio: '3:2', leftSide: 'Mirror', leftRotation: '180°', rightSide: 'Original', rightRotation: '0°', shapeInCenterEdge: 'Circle', shapeAtTopEdge: 'Diamond', DiptychIdName: '3x2_Entangled_Diptych_Circle_Diamond_Portrait_White', DiptychIdCode: 'E_3x2_CD_P_W' },
  { id: 8, DiptychId: 1, FrameId: 1, aspectRatio: '3:2', leftSide: 'Mirror', leftRotation: '-90°', rightSide: 'Original', rightRotation: '90°', shapeInCenterEdge: 'Diamond', shapeAtTopEdge: 'Square', DiptychIdName: '3x2_Entangled_Diptych_Diamond_Square_Landscape_White', DiptychIdCode: 'E_3x2_DS_L_W' },
  { id: 9, DiptychId: 1, FrameId: 1, aspectRatio: '4:3', leftSide: 'Original', leftRotation: '0°', rightSide: 'Mirror', rightRotation: '0°', shapeInCenterEdge: 'Square', shapeAtTopEdge: 'Circle', DiptychIdName: '4x3_Entangled_Diptych_Square_Circle_Portrait_White', DiptychIdCode: 'E_4x3_SC_P_W' },
  { id: 10, DiptychId: 1, FrameId: 1, aspectRatio: '4:3', leftSide: 'Original', leftRotation: '90°', rightSide: 'Mirror', rightRotation: '-90°', shapeInCenterEdge: 'Circle', shapeAtTopEdge: 'Diamond', DiptychIdName: '4x3_Entangled_Diptych_Circle_Diamond_Landscape_White', DiptychIdCode: 'E_4x3_CD_L_W' },
  { id: 11, DiptychId: 1, FrameId: 1, aspectRatio: '4:3', leftSide: 'Mirror', leftRotation: '180°', rightSide: 'Original', rightRotation: '0°', shapeInCenterEdge: 'Diamond', shapeAtTopEdge: 'Square', DiptychIdName: '4x3_Entangled_Diptych_Diamond_Square_Portrait_White', DiptychIdCode: 'E_4x3_DS_P_W' },
  { id: 12, DiptychId: 1, FrameId: 1, aspectRatio: '4:3', leftSide: 'Mirror', leftRotation: '-90°', rightSide: 'Original', rightRotation: '90°', shapeInCenterEdge: 'Square', shapeAtTopEdge: 'Circle', DiptychIdName: '4x3_Entangled_Diptych_Square_Circle_Landscape_White', DiptychIdCode: 'E_4x3_SC_L_W' },
  { id: 13, DiptychId: 1, FrameId: 1, aspectRatio: '3:4', leftSide: 'Original', leftRotation: '0°', rightSide: 'Mirror', rightRotation: '0°', shapeInCenterEdge: 'Circle', shapeAtTopEdge: 'Diamond', DiptychIdName: '3x4_Entangled_Diptych_Circle_Diamond_Portrait_White', DiptychIdCode: 'E_3x4_CD_P_W' },
  { id: 14, DiptychId: 1, FrameId: 1, aspectRatio: '3:4', leftSide: 'Original', leftRotation: '90°', rightSide: 'Mirror', rightRotation: '-90°', shapeInCenterEdge: 'Diamond', shapeAtTopEdge: 'Square', DiptychIdName: '3x4_Entangled_Diptych_Diamond_Square_Landscape_White', DiptychIdCode: 'E_3x4_DS_L_W' },
  { id: 15, DiptychId: 1, FrameId: 1, aspectRatio: '3:4', leftSide: 'Mirror', leftRotation: '180°', rightSide: 'Original', rightRotation: '0°', shapeInCenterEdge: 'Square', shapeAtTopEdge: 'Circle', DiptychIdName: '3x4_Entangled_Diptych_Square_Circle_Portrait_White', DiptychIdCode: 'E_3x4_SC_P_W' },
  { id: 16, DiptychId: 1, FrameId: 1, aspectRatio: '3:4', leftSide: 'Mirror', leftRotation: '-90°', rightSide: 'Original', rightRotation: '90°', shapeInCenterEdge: 'Circle', shapeAtTopEdge: 'Diamond', DiptychIdName: '3x4_Entangled_Diptych_Circle_Diamond_Landscape_White', DiptychIdCode: 'E_3x4_CD_L_W' },



])
.then(() => console.log('Data has been inserted'))
.catch((error) => console.log('Error inserting data: ', error));


populateDiptychSVGs();
