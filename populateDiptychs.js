// populateDiptychs.js
const Diptych = require('./models/Diptych');

const diptychData = [
  { diptychName: 'Entangled Prints', diptychType: 'Singles' },
  { diptychName: 'Fused Circle', diptychType: 'mergedLandscape' },
  { diptychName: 'Fused Diamond', diptychType: 'mergedPortrait' },
  { diptychName: 'Fused Square', diptychType: 'mergedLandscape' },
  { diptychName: 'Fused Triangle', diptychType: 'mergedPortrait' },
];

const populateDiptychs = async () => {
  for (const data of diptychData) {
    try {
      const diptych = await Diptych.create(data);
      console.log(`Created diptych: ${diptych.diptychName}`);
    } catch (err) {
      console.error(`Failed to create diptych: ${err.message}`);
    }
  }
};

populateDiptychs();
