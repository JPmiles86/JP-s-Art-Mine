module.exports = (sequelize, DataTypes) => {
    const DiptychVariation = sequelize.define('DiptychVariation', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      shape: DataTypes.STRING,
      rotation: DataTypes.INTEGER,
      frameColor: DataTypes.STRING,
      originalImageId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Image', // Assumes your original image model is named 'Image'
          key: 'id',
        }
      },
    });
  
    DiptychVariation.associate = function(models) {
      DiptychVariation.belongsTo(models.Image, { as: 'originalImage', foreignKey: 'originalImageId' });
    };
  
    return DiptychVariation;
  };
  