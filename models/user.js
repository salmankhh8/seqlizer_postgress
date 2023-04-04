// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./index')
// const sequelize = new Sequelize('sqlite::memory:');

const { user } = require(".");

// const User = sequelize.define('User', {
//   // Model attributes are defined here

//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     defaultValue: 'salman'
//   },
//   lastName:{
//     type: DataTypes.STRING,
//     allowNull: true,
//     defaultValue:"kahn"
//   },
//   salary: {
//     type: DataTypes.STRING,
//     allowNull: true ,
//     defaultValue:'54000'
//   }
// }, {
//   // Other model options go here
// //   sequelize,
// //   modelName:'User'
// tableName:'users',
// // timestamps: false

// createdAt: false,
// updatedAt: 'updated_at'
// });



// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// const { Sequelize, DataTypes, Model } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

module.exports= (sequelize,DataTypes, Model)=>{


class User extends Model {}

User.init({
  // Model attributes are defined here
  first_Name: {
    type: DataTypes.STRING,
    unique:true,
    validate:{
      isAlpha:true
    },
    get(){
      const rawValue = this.getDataValue('first_Name');
      return rawValue ? 'Mr' + rawValue.toUpperCase() : null 
    }
    // allowNull: false
  },
  last_Name: {
    type: DataTypes.STRING,
    // allowNull defaults to true''

    set(value){
      this.setDataValue('lastName', value + ' ,indian')
    }
  },

  full_Name:{
    type: DataTypes.VIRTUAL,
    get(){
      return `${this.first_Name} ${this.last_Name}`;
    },
    set(value){
      throw new Error('Do Not try to set fullname value! ')
    }
  }, 
  
  salary: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User_table' // We need to choose the model name
});


return User
// the defined model is the class itself
// console.log(User === sequelize.models.User); // true
}
// module.exports = User