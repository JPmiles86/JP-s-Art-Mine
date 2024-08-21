import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import useStore from '../utils/store';
import { TextField, Typography, Grid, Box } from '@mui/material';
import buttonStyles from '../screens/ButtonStyles.module.css';

const ReferAFriend: React.FC = () => {
  const [friendFirstName, setFriendFirstName] = useState('');
  const [friendLastName, setFriendLastName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId, userEmail, userFirstName, userLastName, userOrganizationName } = useAuth();
  const baseUrl = useStore((state) => state.baseUrl);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    try {
      const referrerName = userFirstName && userLastName ? `${userFirstName} ${userLastName}` : userOrganizationName;
      const response = await axios.post(`${baseUrl}/api/auth/send-referral`, {
        friendFirstName,
        friendLastName,
        friendEmail,
        referrerName,
        referrerEmail: userEmail,
      });
  
      setMessage(response.data.message);
      setFriendFirstName('');
      setFriendLastName('');
      setFriendEmail('');
    } catch (error: unknown) {
      console.error('Error sending referral email:', error);
  
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Failed to send referral email');
      }
    } finally {
      setLoading(false);
    }
  };  

  return (
    <Box sx={{ mt: 10, px: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Refer a Friend
      </Typography>
      <Typography variant="body1" align="center" gutterBottom sx={{ mx: 'auto', maxWidth: '60%' }}>
        <br></br>Thank you for referring a friend! <br></br><br></br>When your friend signs up using your referral link, if and when they make their first purchase, you will given a discount code to receive 5% off your next purchase. 
        For each new user that makes a purchase, you'll earn another 5% discount code to go towards your next artwork purchase. 
        <br></br><br></br><i>** Please note, only one discount can be applied per artwork purchase.</i>
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '60%', mx: 'auto', mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Friend's Email"
              type="email"
              value={friendEmail}
              onChange={(e) => handleInputChange(e, setFriendEmail)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Friend's First Name"
              value={friendFirstName}
              onChange={(e) => handleInputChange(e, setFriendFirstName)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Friend's Last Name"
              value={friendLastName}
              onChange={(e) => handleInputChange(e, setFriendLastName)}
              required
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <button type="submit" className={buttonStyles.button} disabled={loading}>
              {loading ? 'Pending...' : 'Send Referral'}
            </button>
          </Grid>
        </Grid>
      </Box>
      {message && (
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ReferAFriend;
