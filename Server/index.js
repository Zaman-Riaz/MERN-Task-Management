require('./database/connection')

const cors = require('cors')
const express = require('express');
const { User, Task } = require('./model/schema');
const app = express();

app.use(express.json(), cors());
let port = process.env.PORT || 3003;

app.get('/', (req, res) => {
    res.send('Home page')
})

// function to register users in database
app.post('/user_info', async (req, res) => {
    console.log(req.body);
    let { userName, userEmail, userDepartment, userPassword } = req.body

    if (!userName || !userEmail || !userPassword || !userDepartment) {
        return res.status(400).send(' Input fields could not be epmty ');
    }

    try {
        let isUserAlreadyExist = await User.findOne({ userEmail: userEmail });
        if (isUserAlreadyExist) return res.status(406).send('User already exist')

        const user = new User({ userName, userEmail, userDepartment, userPassword })
        await user.save();
        res.send('User added successfully')

    } catch (error) {
        res.send('Error posting data to database')
    }
})


// function for login validation 
app.post('/login_info', async (req, res) => {
    console.log(req.body)
    let { email, password } = req.body;

    try {
        let isUserExisted = await User.findOne({ userEmail: email });
        if (isUserExisted) {
            if (isUserExisted.userPassword != password) {
                return res.status(401).send('Invalid credentials')
            }

            return res.send('Login Successful!');
        }
        return res.status(400).send('User does not exists')
    }
    catch (error) {
        console.log('Error found: ', error);
        // return res.status(500).send('Server Issue!');
    }
})


// function to get users list
app.get('/get_users', async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).send(list)
    } catch (error) {
        res.status(404).send('Error getting list data', error)
    }
}) 


// function to post task in database 
app.post('/post_task', async (req, res) => {
    console.log(req.body);
    let { assignedTask, managerName, department, members } = req.body;

    if (!assignedTask || !managerName || !department || !members) {
        return res.status(400).send(' Input fields could not be epmty ');
    }

    try {
        const task = new Task({ assignedTask, managerName, department, members })
        let response = await task.save();
        if (response) {
            res.status(200).send('Task added successfully');
        }
    } catch (error) {
        res.send('Error posting data to database ', error)
    }
}
)


// function to get task list
app.get('/get_task', async (req, res)=> {
try {
    const list = await Task.find()
    res.status(200).send(list)
    
} catch (error) {
    res.send('error getting task list')
}
})

app.listen(port, () => {
    console.log('listening to port: ', port);
})
