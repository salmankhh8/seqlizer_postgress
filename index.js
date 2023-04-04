const express= require('express')
const app= express()

var bodyParser = require('body-parser')
// const User = require('./models/user')
// const contact = require("./models/contact")
// const Contact = require('./models/contact')

app.use(bodyParser.json())

require('./models/index')


var userCtr = require("./controller/userController")

app.get('/', (req, res)=>{
    res.send('hellow world')
})

app.post('/add', userCtr.addUser)
app.get('/users', userCtr.getUsers)
app.get('/query', userCtr.query)
app.get('/users/:id', userCtr.getUserById)
app.delete('/delete', userCtr.deleteUser)
app.patch('/update/:id', userCtr.updateUser)
app.get("/finders/:id", userCtr.finders)
app.get("/findcrt", userCtr.findAndCerate)
app.get("/findCount", userCtr.findAndCount)
app.get("/getter", userCtr.getSetVirtualUser)
app.get("/validate_user", userCtr.valdateUser)

// User.sync({force: true}) // update one by one
// Contact.sync({force: false})
// User.sync({force: true, match:/_User$/})
// User.drop()


app.listen(3000, ()=>{
    console.log("app will run on http://localhost3000");
})

