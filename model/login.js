const { DataTypes } = require('sequelize')
const { sequelize } = require('../controller/db')
const bcrypt = require('bcryptjs')

const Login = sequelize.define(
  'Login',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 50] // Example: Minimum length of 3 characters, maximum length of 50 characters
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100] // Example: Minimum length of 6 characters, maximum length of 100 characters
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    hooks: {
      beforeCreate: async (login) => {
        const hashedPassword = await bcrypt.hash(login.password, 10)
        login.password = hashedPassword
      }
    }
  }
)

module.exports = { Login }
