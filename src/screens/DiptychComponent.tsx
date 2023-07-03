// DiptychComponent.tsx
import React from 'react';

interface DiptychComponentProps {
  photo: {
    aspectRatio: string;
    seriesCode: string;
    seriesName: string;
  };
  diptychInfo: {
    fused: string;
    shapeInCenterEdge: string;
    shapeAtTopEdge: string;
    leftSide: string;
    rightSide: string;
  } | null;
}

const DiptychComponent: React.FC<DiptychComponentProps> = ({ photo, diptychInfo }) => {
  if (!photo || !diptychInfo) {
    return <div>No photo or diptych info available.</div>;
  }

  return (
    <div>
      {/* Rendering logic for the DiptychComponent */}
      <strong>Diptych Variation: </strong>
      {diptychInfo.fused === 'Fused' ? `${diptychInfo.fused} - ${diptychInfo.shapeInCenterEdge}` : diptychInfo.fused}
      <br />
      <strong>Shape in center: </strong>
      {diptychInfo.shapeInCenterEdge}
      <br />
      <strong>Shape on top: </strong>
      {diptychInfo.shapeAtTopEdge}
      <br />
      <strong>Left Side: </strong>
      {diptychInfo.leftSide}
      <br />
      <strong>Right Side: </strong>
      {diptychInfo.rightSide}
      <br />
    </div>
  );
};

export default DiptychComponent;
