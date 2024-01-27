const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
      title:{
        type: String,
        required: true,
      },
      author:{
        type:String,
        required:true
      },
      publishYear:{
        type: Number,
        required: true,
      },
    },
    {
        timestamps: true,
});

const bookModel = mongoose.model('boks', bookSchema);
module.exports = bookModel;