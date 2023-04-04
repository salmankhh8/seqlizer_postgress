const { Sequelize, DataTypes, Model} = require('sequelize')


const sequelize = new Sequelize('postgres', 'postgres', 'admin',{ 
    host:'localhost',
    dialect:'postgres',
    // logging:false
})
 
try{
    sequelize.authenticate();
    console.log('connection has been established sucessfully');

}catch(error){
    console.log('unable to connect to the databses', error);
}


const db={}

db.sequelize=Sequelize
db.sequelize=sequelize



db.contact= require('./contact')(sequelize,DataTypes)
db.user=require('./user')(sequelize,DataTypes,Model)
sequelize.sync({force:false})
module.exports = db 