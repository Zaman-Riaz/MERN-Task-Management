const mongoose = require('mongoose')

// User schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: [true, 'Email already exist']
    }, 
    userDepartment: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
})

// Task schema
const taskSchema = mongoose.Schema({
    members: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    assignedTask: {
        type: String,
        required: true
    },
})


// creating a new collection
const User = mongoose.model('user_info', userSchema)
const Task = mongoose.model('task', taskSchema)

module.exports = { User, Task };