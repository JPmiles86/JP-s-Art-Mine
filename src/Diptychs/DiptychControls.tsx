//  my-gallery/src/Diptychs/DiptychControls.tsx

import React, { useEffect, useState, useCallback } from 'react';
import DownloadButton from '../components/layout/DownloadButton';
import buttonStyles from '../screens/ButtonStyles.module.css';
import useStore from '../utils/store';
import { swapMapping, rotateMapping } from './DiptychIdCodeMapping';
import LikeButton from '../components/layout/LikeButton';
import useKeyboardNavigation from '../utils/useKeyboardNavigation';
import FullScreenButton from '../components/layout/FullScreenButton';
import CurationListButton from '../components/layout/CurationListButton';
import AuthModal from '../components/modals/AuthModal';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import CurationListModal from '../components/modals/CurationListModal';
import CreateListModal from '../components/modals/CreateListModal';  // Updated import
import RenameListModal from '../components/modals/RenameListModal';  // Updated import
import { Photograph } from '../screens/ExhibitionSpace';
import { LayoutSpecs } from './LayoutSpecs';

interface DiptychControlsProps {
    navigateToInquiry: () => void;
    selectedPhoto: Photograph | undefined;
    fabricCanvasRef: fabric.Canvas | null;
    layoutSpecs: LayoutSpecs | undefined;
    areShapesVisible: boolean;
    toggleShapesVisibility: () => void;
    handlePrevPhoto: () => void;
    handleNextPhoto: () => void;
    handleOpenFullScreen: () => void;
    children?: React.ReactNode;
}

const DiptychControls: React.FC<DiptychControlsProps> = ({
    navigateToInquiry,
    selectedPhoto,
    fabricCanvasRef,
    layoutSpecs,
    areShapesVisible,
    toggleShapesVisibility,
    handlePrevPhoto,
    handleNextPhoto,
    handleOpenFullScreen,
    children,
}) => {
    const {
        FrameId,
        isMerged,
        shapeCode,
        selectedDiptychIdCode,
        userId,
        setFrameId,
        setIsMerged,
        setShapeCode,
        setSelectedDiptychIdCode,
    } = useStore((state) => ({
        FrameId: state.FrameId,
        isMerged: state.isMerged,
        shapeCode: state.shapeCode,
        selectedDiptychIdCode: state.selectedDiptychIdCode,
        userId: state.userId,
        setFrameId: state.setFrameId,
        setIsMerged: state.setIsMerged,
        setShapeCode: state.setShapeCode,
        setSelectedDiptychIdCode: state.setSelectedDiptychIdCode,
    }));

    const [modals, setModals] = useState({
        isAuthModalOpen: false,
        isConfirmationModalOpen: false,
        isCurationListModalOpen: false,
        isCreateListModalOpen: false,
    });

    const isAnyModalOpen =
        modals.isAuthModalOpen ||
        modals.isConfirmationModalOpen ||
        modals.isCurationListModalOpen ||
        modals.isCreateListModalOpen;

    const [updateNeeded, setUpdateNeeded] = useState(false);

    useEffect(() => {
        if (selectedPhoto?.aspectRatio && !selectedDiptychIdCode) {
            const initialFrameId = FrameId || 1;
            const initialIsMerged = isMerged || 'Entangled';
            const initialShapeCode = shapeCode || 'CD';
            handleUpdate(initialFrameId, initialIsMerged, initialShapeCode);
        }
    }, [selectedPhoto, selectedDiptychIdCode, FrameId, isMerged, shapeCode]);

    const updateDiptychIdCode = async () => {
        const aspectRatio = selectedPhoto?.aspectRatio;
        const frameId = FrameId;
        const fused = isMerged;
        const shape = shapeCode;

        try {
            const response = await fetch(
                `http://localhost:3000/api/diptychsvgs/aspectratio/${aspectRatio}/frameid/${frameId}/fused/${fused}/shapeCode/${shape}`
            );
            if (!response.ok) {
                throw new Error('Error fetching DiptychIdCode');
            }
            const data = await response.json();
            console.log('Server response:', data);

            if (data.length > 0) {
                setSelectedDiptychIdCode(data[0].DiptychIdCode);
            } else {
                console.log('No matching DiptychIdCode found');
            }
        } catch (error) {
            console.error('Failed to update DiptychIdCode:', error);
        }
        setUpdateNeeded(false);
    };

    const handleUpdate = (
        newFrameId: number,
        newIsMerged: string,
        newShapeCode: string
    ) => {
        setFrameId(newFrameId);
        setIsMerged(newIsMerged);
        setShapeCode(newShapeCode);
        setUpdateNeeded(true);
    };

    const handleFrameIdChange = () =>
        handleUpdate(FrameId === 1 ? 2 : 1, isMerged, shapeCode);
    const handleToggleMergeStatus = () =>
        handleUpdate(
            FrameId,
            isMerged === 'Entangled' ? 'Fused' : 'Entangled',
            shapeCode
        );
    const handleSwapShape = () =>
        handleUpdate(
            FrameId,
            isMerged,
            swapMapping[shapeCode as keyof typeof swapMapping] || shapeCode
        );
    const handleRotateShape = () =>
        handleUpdate(
            FrameId,
            isMerged,
            rotateMapping[shapeCode as keyof typeof rotateMapping] || shapeCode
        );

    useKeyboardNavigation(
        handleNextPhoto,
        handlePrevPhoto,
        handleSwapShape,
        handleRotateShape,
        handleToggleMergeStatus,
        isAnyModalOpen
    );

    useEffect(() => {
        if (updateNeeded) {
            updateDiptychIdCode();
        }
    }, [updateNeeded]);

    const handleLikeButtonClick = () => {
        if (!userId) {
            setModals((prev) => ({ ...prev, isAuthModalOpen: true }));
        } else {
            // Handle the like functionality here
        }
    };

    const handleAddToListClick = useCallback(() => {
        console.log('handleAddToListClick triggered from diptych Controls');
        if (!userId) {
            setModals((prev) => ({ ...prev, isAuthModalOpen: true }));
        } else if (!modals.isCurationListModalOpen) {
            setModals((prev) => ({ ...prev, isCurationListModalOpen: true }));
        }
    }, [userId, modals.isCurationListModalOpen]);

    return (
        <div className={buttonStyles.buttonContainerFS}>
            <button
                className={`${buttonStyles.button} ${buttonStyles.small}`}
                onClick={handleFrameIdChange}
            >
                {FrameId === 1 ? 'Black' : 'White'} Frame
            </button>
            <button
                className={`${buttonStyles.button} ${buttonStyles.small}`}
                onClick={handleToggleMergeStatus}
            >
                {isMerged === 'Entangled' ? 'Merge' : 'Unmerge'}
            </button>
            <button
                className={`${buttonStyles.button} ${buttonStyles.small}`}
                onClick={handleSwapShape}
            >
                Swap
            </button>
            <button
                className={`${buttonStyles.button} ${buttonStyles.small}`}
                onClick={handleRotateShape}
            >
                Rotate
            </button>
            <button
                className={`${buttonStyles.button} ${buttonStyles.small}`}
                onClick={toggleShapesVisibility}
            >
                {areShapesVisible ? 'Hide Shapes' : 'Show Shapes'}
            </button>
            <button
                className={`${buttonStyles.button} ${buttonStyles.small}`}
                onClick={navigateToInquiry}
            >
                Inquire
            </button>
            <DownloadButton
                photoId={selectedPhoto?.photoID ?? ''}
                DiptychIdCode={selectedDiptychIdCode ?? ''}
                fabricCanvasRef={fabricCanvasRef ?? undefined}
                layoutSpecs={layoutSpecs ?? undefined}
                areShapesVisible={areShapesVisible}
                size="small"
            />
            <LikeButton
                photoId={selectedPhoto?.photoID ?? ''}
                diptychIdCode={selectedDiptychIdCode ?? ''}
                setIsAuthModalOpen={handleLikeButtonClick}
                onLikeButtonClick={handleLikeButtonClick}
            />
            <FullScreenButton onClick={handleOpenFullScreen} />
            <CurationListButton
                photoId={selectedPhoto?.photoID ?? ''}
                diptychIdCode={selectedDiptychIdCode ?? ''}
                userId={userId}
                onAddToListClick={handleAddToListClick}
            />
            <div className={buttonStyles.dropdownSelector}>{children}</div>

            {/* Modals */}
            <AuthModal
                open={modals.isAuthModalOpen}
                onClose={() => setModals((prev) => ({ ...prev, isAuthModalOpen: false }))}
                showAnonymousOption={true}
                isLikeTriggered={true}
                isAnonymousUser={useStore.getState().isAnonymous}
            />

            <ConfirmationModal
                open={modals.isConfirmationModalOpen}
                onClose={() => setModals((prev) => ({ ...prev, isConfirmationModalOpen: false }))}
                onConfirm={() => console.log('Confirmed')}
            />
            <CurationListModal
                isOpen={modals.isCurationListModalOpen}
                onClose={() => setModals((prev) => ({ ...prev, isCurationListModalOpen: false }))}
                photoId={selectedPhoto?.photoID ?? ''}
                diptychIdCode={selectedDiptychIdCode ?? ''}
                userId={userId}
                setIsAnyModalOpen={() => {}}
            />
            <CreateListModal
                isOpen={modals.isCreateListModalOpen}
                onClose={() => setModals((prev) => ({ ...prev, isCreateListModalOpen: false }))}
                userId={userId}
                onCreate={(newList) => console.log('New list created:', newList)} // Updated to onCreate
                setIsAnyModalOpen={() => {}}
            />
        </div>
    );
};

export default DiptychControls;