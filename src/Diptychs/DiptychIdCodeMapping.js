// my-gallery/src/Diptychs/DiptychIdCodeMapping.js

export const swapMapping = {
  'CD': 'SD', 'SD': 'CD', 'DS': 'TS', 'TS': 'DS', 
  'ST': 'CT', 'CT': 'ST', 'TC': 'DC', 'DC': 'TC',
};

export const rotateMapping = {
  'CD': 'DS', 'DS': 'ST', 'ST': 'TC', 'TC': 'CD',
  'SD': 'DC', 'DC': 'CT', 'CT': 'TS', 'TS': 'SD',
};
