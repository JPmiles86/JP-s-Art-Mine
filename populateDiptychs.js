// populateDiptychs.js
const Diptych = require('./models/Diptych');

const diptychData = [
  { diptychName: 'Singles', diptychType: 'Singles' },
  { diptychName: 'Circle', diptychType: 'mergedLandscape' },
  { diptychName: 'Diamond', diptychType: 'mergedPortrait' },
  { diptychName: 'Square', diptychType: 'mergedLandscape' },
  { diptychName: 'Triangle', diptychType: 'mergedPortrait' },
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
