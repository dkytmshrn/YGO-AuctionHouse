'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bid.belongsTo(models.User, { foreignKey: 'UserId' })
      Bid.belongsTo(models.Sell, { foreignKey: 'SellId' })
    }
  }
  Bid.init({
    SellId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Sell ID is required',
        },
        notNull: {
          msg: 'Sell ID is required',
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User ID is required',
        },
        notNull: {
          msg: 'User ID is required',
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is required',
        },
        notNull: {
          msg: 'Price is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};