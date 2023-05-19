import create from 'zustand'

// define the store's initial state
const initialState = {
  images: [],
  selectedImage: null,
}

// define the store's actions
const actions = (set) => ({
  setImages: (images) => set({ images }),
  setSelectedImage: (image) => set({ selectedImage: image }),
})

export const useStore = create(set => ({
  ...initialState,
  ...actions(set),
}))
