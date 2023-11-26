const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const User = require('./UserModel');
const Book = require('./BookModel');
const dbUri= 'mongodb+srv://test:123@nodetest.lvtgp25.mongodb.net/bookstore?retryWrites=true&w=majority';

// .connect is async function so we can use it a promise
mongoose.connect(dbUri).then(()=> {
    console.log('connected to db');
}).catch((error)=> {
    console.log(error)
});
app.use(express.json());
app.use(express.urlencoded({
  extended: true
})); // middleware to handle json objects

app.get('/user' , async (req, res)=> {

    let users=await User.find()
    res.send(users);
});

app.post('/user', async (req,res)=> {
    await User.create(req.body)
    res.send('user added '+ req.body)
});

app.get('/book',  async (req,res)=>{
    let books = await Book.find();
    res.send(books);
    
});

app.post('/book', async (req,res)=> {
    await Book.create(req.body);
    res.send("saved successfull");


});


app.get('book/:author', async(req,res)=> {
    let {author} = req.params;
    let book =await Book.find({'author': author}); 
    res.send(book);
});









  

app.listen(3000, ()=> console.log('listening at http://localhost:3000'));


