'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sell extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sell.belongsTo(models.User, { foreignKey: 'UserId' })
      Sell.hasMany(models.Bid, { foreignKey: 'SellId' })
    }
  }
  Sell.init({
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
    cardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Card ID is required',
        },
        notNull: {
          msg: 'Card ID is required',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Card name is required',
        },
        notNull: {
          msg: 'Card name is required',
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image is required',
        },
        notNull: {
          msg: 'Image is required',
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
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Auction time is required',
        },
        notNull: {
          msg: 'Auction time is required',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Sell',
  });
  return Sell;
};