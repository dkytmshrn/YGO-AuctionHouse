'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require ('../Helpers/bcrypt')
const {makeItLow} = require('../Helpers/toLower')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Item, { foreignKey: 'UserId' })
      User.hasMany(models.Sell, { foreignKey: 'UserId' })
      User.hasMany(models.Bid, { foreignKey: 'UserId' })
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username is required',
        },
        notNull: {
          msg: 'Username is required',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'E-mail incorrect',
        },
        notEmpty: {
          msg: 'E-mail is required',
        },
        notNull: {
          msg: 'E-mail is required',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 20],
          msg: 'Password must be at 7-20 characters',
        },
        notEmpty: {
          msg: 'Password is required',
        },
        notNull: {
          msg: 'Password is required',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Role is required',
        },
        notNull: {
          msg: 'Role is required',
        },
      },
    },
    cash: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Cash is required',
        },
        notNull: {
          msg: 'Cash is required',
        },
      },
    },

  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) => {
    instance.username = makeItLow(instance.username)
    instance.email = makeItLow(instance.email)
    instance.password = hashPassword(instance.password)
  })

  User.beforeUpdate((instance) => {
    instance.password = hashPassword(instance.password);
  });


  return User;
};