
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');

const { insertSelectedMeals, getSelectedMeals, 
        signupUser, loginUser } =  require('./dbServices');

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) =>{
    res.send("Hello world");
})
app.get('/selectedmeals/:id', async(req, res) =>{
    const {id} = req.params
    console.log(id)
    const response = await getSelectedMeals(id)
    res.send({success: true, data: response});
})

app.post('/signup', async (req, res) =>{
    const { email, username, password} = req.body;
    const response = await signupUser(email, username, password)
    console.log("response", response);

    response > 0 ? res.status(200).send({success: true, id: response}) : 
        res.status(302).send({success: false})
})
app.post('/login', async (req, res) =>{
    const { username, password} = req.body;
    const response = await loginUser(username, password)
    console.log("response", response);

    response.login ? res.status(200).send({success: true, msg: response}) : 
        res.status(302).send({success: false, msg: "User not found"})
})

app.post('/selectedmeals', async (req, res) =>{
    const {date, meals} = req.body
    console.log(meals)
    const response = await insertSelectedMeals(date, meals)
    response.leg ? res.status(200).send({success: true, id: response}) : res.status(302).send({success: false})
    console.log("response", response);
})

app.listen(5003, () =>{
    console.log(`Listening to port ${process.env.envPORT}`)
})