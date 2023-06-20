// populateFrames.js
const Frame = require('./models/Frame');

const frameData = [
  { id: 1, frameType: 'White' },
  { id: 2, frameType: 'Black' },
  { id: 3, frameType: 'Unframed' },
];

const populateFrames = async () => {
  for (const data of frameData) {
    try {
      const frame = await Frame.create(data);
      console.log(`Created frame: ${frame.frameType}`);
    } catch (err) {
      console.error(`Failed to create frame: ${err.message}`);
    }
  }
};

populateFrames();
