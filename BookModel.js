const mongoose= require('mongoose');
const schema= mongoose.Schema;


const bookSchema= new schema({
    title: String,
    author : String,
    reviews:[]
});

const Book= mongoose.model('book', bookSchema);


module.exports= Book;