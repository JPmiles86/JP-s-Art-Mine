// my-gallery/src/utils/userService.js

const { Users, PersonContactInfo, OrganizationContactInfo } = require('../../models');

async function getUserDetails(userId) {
  try {
    console.log('Received userId in getUserDetails:', userId);

    // Ensure userId is a number before proceeding
    if (typeof userId !== 'number' || isNaN(userId)) {
      console.error('Invalid userId detected (expecting a number):', userId);
      throw new Error('Invalid userId');
    }

    const user = await Users.findOne({
      where: { userId },
      include: [
        { model: PersonContactInfo, as: 'PersonContactInfo' },
        { model: OrganizationContactInfo, as: 'OrganizationContactInfo' }
      ]
    });

    if (!user) {
      throw new Error('User not found');
    }

    let firstName = '';
    let lastName = '';
    let organizationName = '';

    if (user.entityType === 'Person' && user.PersonContactInfo) {
      firstName = user.PersonContactInfo.firstName;
      lastName = user.PersonContactInfo.lastName;
    } else if (user.entityType === 'Organization' && user.OrganizationContactInfo) {
      organizationName = user.OrganizationContactInfo.organizationName;
    }

    return {
      email: user.email,
      entityType: user.entityType,
      firstName,
      lastName,
      organizationName,
    };
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw new Error('Failed to fetch user details');
  }
}

module.exports = {
  getUserDetails,
};
