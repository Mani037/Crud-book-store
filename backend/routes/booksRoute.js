const express = require('express')
const router = express.Router();
const bookModel = require('../models/bookModel')


//post
router.post('/',async(req,res)=>{
    try{
         if(
            !req.body.title || !req.body.author || !req.body.publishYear
         ){
            return res.status(400).send({message: "send all requires inputs"})
         }
    const newBook = {title: req.body.title, author: req.body.author, publishYear: req.body.publishYear};

       const Book = await bookModel.create(newBook);
       return res.status(200).send(Book)
    }
    catch(err){
         console.log(err.message)
         res.status(500).send({message: err.message})
    }
})

//get all books

router.get('/',async(req,res)=>{
    try{
        const books = await bookModel.find({})
        return res.status(200).json({
            count:books.length,
            data:books
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

//get one book

router.get('/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const book = await bookModel.findById(id);
 
         return res.status(200).json(book)

    }
    catch(err){
        console.lof(err.message);
        res.status(500).send({message: err.message})
    }
})

//update a book

router.put('/:id', async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "send all required inputs"})
        }

        const {id} = req.params;
        const result = await bookModel.findByIdAndUpdate(id,req.body);

        if(!result){
          return res.status(500).json({message: 'Book not founded'})
        }
        return res.status(200).send({message:'book updated successfully'})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

//delete a book

router.delete('/:id', async(req,res)=>{
    try{
      const {id} = req.params;

      const result = await bookModel.findByIdAndDelete(id)
      if(!result){
        return res.status(404).json({message : "book not founded for delete"})
      }
      return res.status(200).send({message: 'books deleted successfully'})
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message})
    }
})

module.exports = router;