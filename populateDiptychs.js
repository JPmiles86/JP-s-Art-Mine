// populateDiptychs.js
const Diptych = require('./models/Diptych');

const diptychData = [
  { diptychName: 'Entangled Prints', diptychType: 'entangledPrints' },
  { diptychName: 'Fused Circle', diptychType: 'fusedLandscape' },
  { diptychName: 'Fused Diamond', diptychType: 'fusedPortrait' },
  { diptychName: 'Fused Square', diptychType: 'fusedLandscape' },
  { diptychName: 'Fused Triangle', diptychType: 'fusedPortrait' },
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
