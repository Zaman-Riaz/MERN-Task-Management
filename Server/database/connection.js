// Database connection
const mongoose = require('mongoose')

const DB = 'mongodb+srv://Zaman:12345@taskmanagement.kvkvjby.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connection successful')
}).catch(() => {
    console.log('Connection failed')
})