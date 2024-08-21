// my-gallery/src/utils/rewardsService.js
const Reward = require('../../models/Reward');
const { getUserDetails } = require('./userService'); 
const { sendRewardNotificationToReferrer, sendRewardNotificationToCurator } = require('./emailService');

async function rewardReferrer(referrerId, saleId) {
    try {
      console.log('Creating reward for referrerId:', referrerId, 'and saleId:', saleId);
  
      // Ensure referrerId is numeric
      if (typeof referrerId !== 'number' || isNaN(referrerId)) {
        throw new Error('Invalid referrerId');
      }
  
      const reward = await Reward.create({
        userId: referrerId,
        earnedFrom: 'referral',
        percentage: 5.00,
        saleId: saleId,
        type: null,
        value: 10.00,
      });
  
      console.log('Reward created:', reward.toJSON());
  
      return reward;
    } catch (error) {
      console.error('Error rewarding referrer:', error);
      throw new Error('Failed to reward referrer');
    }
}

async function rewardCurator(curatorId, saleId) {
  try {
    const reward = await Reward.create({
      userId: curatorId,
      earnedFrom: 'curation',
      percentage: 5.00,
      saleId: saleId,
      type: 'subscription',
      value: 10.00,
    });

    const userDetails = await getUserDetails(curatorId);

    if (userDetails.email) {
      await sendRewardNotificationToCurator(userDetails);
    } else {
      console.error('Curator email not found');
    }

    return reward;
  } catch (error) {
    console.error('Error rewarding curator:', error);
    throw new Error('Failed to reward curator');
  }
}

module.exports = {
  rewardReferrer,
  rewardCurator,
};
