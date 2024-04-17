// Location: my-gallery/src/utils/TimerDisplay.tsx

import React from 'react';
import { Typography, Card, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import buttonStyles from '../screens/ButtonStyles.module.css';

interface TimerDisplayProps {
  remainingTime: number;
  minimized: boolean;
  toggleTimerDisplay: () => void;
  renewTimer: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ remainingTime, minimized, toggleTimerDisplay, renewTimer }) => {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card style={{ position: 'fixed', bottom: 20, right: 20, padding: minimized ? '8px' : '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fafafa', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      {minimized ? (
        <>
          <Typography variant="body1">{formatTime(remainingTime)}</Typography>
          <IconButton onClick={toggleTimerDisplay}><ExpandLessIcon /></IconButton>
        </>
      ) : (
        <>
          <Typography variant="body2" style={{ flexGrow: 1, textAlign: 'left' }}>
            This artwork has been reserved.<br/>
            You have <strong>{formatTime(remainingTime)}</strong> to complete the sale.
          </Typography>
          <button className={buttonStyles.button} onClick={renewTimer}>Renew Timer</button>
          <IconButton onClick={toggleTimerDisplay}><ExpandMoreIcon /></IconButton>
        </>
      )}
    </Card>
  );
};

export default TimerDisplay;