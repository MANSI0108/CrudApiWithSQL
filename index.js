const express = require("express")
const connection = require("./config/config")
const Userroute = require("./UserApi/AddUser")
const Users = require("./UserApi/GetUser")
const UpdateUser = require("./UserApi/UpdateUser")
const DeleteUser = require("./UserApi/DeleteUser")

const app = express();

app.use('/users', express.static('uploads'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/users', Userroute)
app.use('/users', Users)
app.use('/users', UpdateUser)
app.use('/users', DeleteUser)



module.exports = app


