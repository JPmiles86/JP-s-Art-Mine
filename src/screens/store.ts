import create from 'zustand';

interface ImageObject {
    photoID: string;
    number: string;
    url: string;
    imagePath?: string;
    title: string;
    date: string;
    dateOriginal: string;
    index?: number;
}

interface Store {
    images: ImageObject[];
    setImages: (images: ImageObject[]) => void;
    selectedImage: ImageObject | null;
    setSelectedImage: (image: ImageObject | null) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    setImageFromURL: (photoID: string) => void;
}

const useStore = create<Store>((set, get) => ({
    images: [],
    setImages: (images) => set({ images }),
    selectedImage: null,
    setSelectedImage: (image) => set({ selectedImage: image }),
    selectedIndex: -1,
    setSelectedIndex: (index) => set({ selectedIndex: index }),
    setImageFromURL: (photoID) => {
        const state = get();
        const foundImage = state.images.find((image) => image.photoID === photoID);
        if (foundImage) {
            const foundIndex = state.images.indexOf(foundImage);
            set({ selectedImage: foundImage, selectedIndex: foundIndex });
        } else {
            // Handle the case when image is not found
            // For example, set selectedImage to null and selectedIndex to -1
            set({ selectedImage: null, selectedIndex: -1 });
        }
    },    
}));

export default useStore;

