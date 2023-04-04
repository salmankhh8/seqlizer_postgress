const { Sequelize, Op } = require("sequelize");
var db = require("../models");

var User = db.user;

var addUser = async (req, res) => {
    //   const jane = User.build({
    //     first_Name: "salman conroller",
    //     last_Name: "khan",
    //     salary:"54000"
    //   });

    console.log(req.params);

    const jane = await User.create({
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        salary: req.body.salary
    });

    //   await jane.destroy()

    // const increment= await jane.increment('salary', {by:'10'})
    //   console.log(jane instanceof User);
    //   console.log(jane.first_Name);

    await jane.save();
    console.log("jane ws saved to the databases");
    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON());
};

var getUsers = async (req, res) => {
    const data = await User.findAll({});
    await res.status(200).json({ data: data })
}

var getUserById = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    await res.status(200).json({ data: data })
}

var deleteUser = async (req, res) => {
    // const jane = await User.destroy()
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    await res.status(200).json({ status: `deketed sucessfully id ${req.params.id}` })
}

var updateUser = async (req, res) => {
    var updatedData = req.body
    const data = await User.update(updatedData, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ data: data })
}


var query = async (req, res) => {
    // var data = await User.findAll({
    //     first_Name: 'sequalizer',
    //     last_Name: 'khan'
    // },
    //     {
    //         fields: ['last_Name']
    //     } 
    // )
    const data = await User.findAll({
    //     attributes:{ 
    //         // exclude:['first_Name'],// last anem will not come in data
    //     // [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    //     include:["id", 
    //     // [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
    // ]}   

    // where:{
    //     'id': {
    //         [Op.eq]:15
    //     }
    // }
    order:[
        ['id', 'Desc']
    ],
    limit:5  
 })


console.log("qury called");
    res.status(200).json({ data: data })
}
var finders = async (req, res) => {
    // const data = await User.findByPk(req.params.id)({
        // find one will return firt found record
        // where:{
        //     last_Name:'khan'
        // }
//  })

 const data = await User.findByPk(req.params.id)
console.log("qury called");
    res.status(200).json({ data: data })
}

var findAndCerate = async (req, res)=>{
    const [users, created]= await User.findOrCreate({
        //if not found then will create the database else created false
        where:{ first_Name:'salman'},
        defaults:{
            last_Name:'khan'
        }
    })
    res.status(200).json({data:users, created:created})
}
var findAndCount = async (req, res)=>{
    const {count, rows}= await User.findAndCountAll({
        //if not found then will create the database else rows false
        where:{ first_Name:'sequalizer'},
    })
    res.status(200).json({data:count, rows:rows})
}

/// getter setter ad virtual

var getSetVirtualUser = async (req, res)=>{
    const data= await User.create({
        //if not found then will create the database else rows false
     first_Name:'sequalizer',
     lastName:'khan'
    })
    res.status(200).json({data:data})
}

var valdateUser = async (req, res)=>{
    var data={}
    try{
        const data = await User.create({
            first_Name:'salman',
            last_Name:'khan'
        })
    } catch(e){
        let message
        e.errors.forEach(error => {
            console.log(error);
            switch(error.validatorKey){
                case 'isAlpha':
                    message= 'Only alphabets are allowed'
                    break
            }
            
            message[error.path]=message
        });

// console.log(e.errors);
    }
   

    res.status(200).json({data:data, message:message})
}


module.exports = {
    addUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    query,
    finders,
    findAndCerate,
    findAndCount,
    getSetVirtualUser,
    valdateUser
};