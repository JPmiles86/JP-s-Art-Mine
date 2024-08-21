//my-gallery/src/components/layout/CurationListButton.tsx

import React from 'react';
import buttonStyles from '../../screens/ButtonStyles.module.css';

interface CurationListButtonProps {
    photoId: string;
    diptychIdCode: string;
    userId: number | null;
    onAddToListClick: () => void;
}

const CurationListButton: React.FC<CurationListButtonProps> = ({
    photoId,
    diptychIdCode,
    userId,
    onAddToListClick,
}) => {
    return (
        <button
            className={`${buttonStyles.button} ${buttonStyles.small}`}
            onClick={onAddToListClick}
        >
            Add to List
        </button>
    );
};

export default CurationListButton;