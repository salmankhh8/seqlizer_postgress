// const {DataTypes} = require('sequelize')
// const sequelize = require('./index')
module.exports=(sequelize, DataTypes)=>{
const Contact = sequelize.define('contact', {
  // Model attributes are defined here

  permanent_Address: {
    type: DataTypes.STRING,
    
  },
  current_address:{
    type: DataTypes.STRING,
   
  }
}, {
  // Other model options go here
//   sequelize,
//   modelName:'User'
tableName:'Contact',
// timestamps: false

createdAt: false,
updatedAt: 'updated_at'
});


// module.exports = Contact

return Contact 

}
// `sequelize.define` also returns the model
// console.log(Contact); // true


