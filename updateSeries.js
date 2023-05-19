const Photo = require('./models/Photo'); // path to your Photo model
const sequelize = require('./config/database'); // path to your sequelize instance

async function updateSeries() {
    try {
        await sequelize.authenticate();

        await Photo.update({ series: 'TRD - Traditional' }, { where: { series: 'Traditional' } });
        await Photo.update({ series: 'TSS - Traditional Slow Shutter' }, { where: { series: 'Traditional Slow Shutter' } });
        await Photo.update({ series: 'CST - Chromatic Shades of Time' }, { where: { series: 'Chromatic Shades of Time' } });
        await Photo.update({ series: 'ATT - As Time Turns' }, { where: { series: 'As Time Turns' } });
        await Photo.update({ series: 'TSL - Time Lines' }, { where: { series: 'Time Lines' } });
        await Photo.update({ series: 'TST - Transforming Space Time' }, { where: { series: 'Transforming Space Time' } });
        await Photo.update({ series: 'MFI - My Flippin’ iPhone' }, { where: { series: 'My Flippin’ iPhone' } });
        await Photo.update({ series: 'STC - Sleepy Time Capsules' }, { where: { series: 'Sleepy Time Capsules' } });

        console.log('Series updated successfully');
    } catch (error) {
        console.error('Failed to update series:', error);
    }
}

updateSeries();
