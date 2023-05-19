const createOrUpdate = async (Model, condition, values) => {
    const item = await Model.findOne({ where: condition });
    if (!item) {
      return await Model.create(values);
    }
    return await item.update(values);
}

const ImageNumber = require('./models/ImageNumbers'); 
require('./models/associations');
const sequelize = require('./config/database');

sequelize.sync().then(async () => {
    console.log('Tables have been created');

    // Populate the ImageNumber table with numbers from 0001 to 99999
    for (let i = 1; i <= 9999; i++) {
        const number = String(i).padStart(4, '0'); // Pad with leading zeros
        await createOrUpdate(ImageNumber, { number }, { number });
    }


    console.log('ImageNumber table has been populated');
});
