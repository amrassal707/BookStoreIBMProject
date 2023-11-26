const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const User = require('./models');
const dbUri= 'mongodb+srv://test:123@nodetest.lvtgp25.mongodb.net/bookstore?retryWrites=true&w=majority';

// .connect is async function so we can use it a promise
mongoose.connect(dbUri).then(()=> {
    console.log('connected to db');
}).catch((error)=> {
    console.log(error)
});
app.use(bodyParser.urlencoded({
    extended: true
  })); // middleware to parse json objects  
app.use(express.json);

app.get('/user' , async (req, res)=> {

    let users=await User.find()
    res.send(users);
});

app.post('/user', (req,res)=> {
    console.log(req.body.name);
    res.send(req.body.name);
})

  

app.listen(3000, ()=> console.log('listening at http://localhost:3000'));


