const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const User = require('./Models/UserModel');
const Book = require('./Models/BookModel');
const dbUri= 'mongodb+srv://test:123@nodetest.lvtgp25.mongodb.net/bookstore?retryWrites=true&w=majority';
const jwtSecret= "verysecret";
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


app.get('/book-author/:author', async(req,res)=> {
    let author = req.params.author;
    let book =await Book.find({"author" : author}).exec();
    res.send(book);
});
app.get('/book-title/:title', async(req,res)=> {
    let title = req.params.title;
    let book =await Book.find({"title" : title}).exec();
    res.send(book);
});
app.get('/book-ISBN/:ISBN', async(req,res)=> {
    let ISBN = req.params.ISBN;
    let book =await Book.find({"_id" : ISBN}).exec();
    res.send(book);
});

app.get('/book-review/:title', async(req,res)=> {
    let title = req.params.title;
    let book =await Book.find({"title" : title}).exec();
    res.send(book["reviews"]);
});

//add reviews
app.post('/book-review/:title', async(req,res)=> {
    let reviews = []
    let title = req.params.title;
    let {review}= req.body;
    let book =await Book.findOne({"title" : title}).exec();
    reviews= book["reviews"];
    reviews.push(review);
    try {
        await Book.findOneAndUpdate({"title" : title} , {"reviews" : reviews}).exec();
        res.send("added successfully");
    }
    catch{
        res.send('soemthing went wrong please check your data again');
    }    
});


app.post('/login', async(req, res)=> {
    let user = req.body;
    let name = user["name"];
    let loggedUser= await User.findOne({name});
    if (loggedUser) {

        let token =jwt.sign({name: name } , jwtSecret);
        return res.send(token)
    }
    return res.send("user not found")
    

})
app.post('/register', async(req, res)=> {

    let user= req.body;
    let name = user["name"];
    let users= await User.findOne({name});
    if(users) {
        return res.send('cant register, already found')
    }

    // for ([key, value] of users.entries()) {
    //     if(user["name"] === value["name"]) {
    //         return res.send('cant register, already found')
    //     }
    // }
    
    User.create(user);
    return res.send("added successfully");

})

app.get('/users', async(req, res)=> {
    let users = await User.find();
    return res.send(users);
})





















  

app.listen(3000, ()=> console.log('listening at http://localhost:3000'));


