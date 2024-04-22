// my-gallery/src/components/PurchaseActions.tsx
import React from 'react';
import buttonStyles from '../screens/ButtonStyles.module.css';

interface PurchaseActionsProps {
  artworkID: string;
  userId: number | null;
  handleBuyNow: () => void;
  handleBackToInquire: () => void;
}

const PurchaseActions: React.FC<PurchaseActionsProps> = ({
  artworkID,
  userId,
  handleBuyNow,
  handleBackToInquire,
}) => {
  return (
    <div>
      <button className={buttonStyles.button} onClick={handleBuyNow}>Buy Now</button>
      <button className={buttonStyles.button} onClick={handleBackToInquire}>Back to Inquire Page</button>
    </div>
  );
};

export default PurchaseActions;