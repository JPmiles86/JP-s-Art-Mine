// diptychStore.js
import create from 'zustand';

// Import the diptychs
import * as diptychs from '../Diptychs';

export const useDiptychStore = create(set => ({
  diptychs,  // Use the imported diptychs
  selectedDiptych: null,
  selectDiptych: (diptychCode) => {
    if (diptychs[diptychCode]) {
      set({ selectedDiptych: diptychs[diptychCode] });
    } else {
      console.error(`Diptych ${diptychCode} not found`);
    }
  },
}));

export default useDiptychStore;