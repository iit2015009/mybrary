const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/',async(req,res) => {
    let seachOptions = {}
    if (req.query.name != null && req.query.name !== ' ' ){
        seachOptions.name = new RegExp(req.query.name,'i')
    }
    try {
        const authors = await Author.find(seachOptions)
        res.render('authors/index',{
            authors: authors,
            seachOptions :req.query
        
        })
    } catch {
        res.redirect('/')
    }
})

// New Authors Route

router.get('/new',(req,res) => {
    res.render('authors/new',{author: new Author()})
})

// Create Auther Route

router.post('/', async(req,res) => {
    const author = new Author({
        name: req.body.name
        
    })

    try {
        const newauthor = await author.save()
        //res.redirect(`author/${newAuthor.id}`)
                 res.redirect(`authors`)
    } catch {
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error creating Author'
        })
    }

    // author.save((err,newAuthor) => {
    //     if (err) {
    //         res.render('authors/new',{
    //             author: author,
    //             errorMessage: 'Error creating Author'
    //         })
    //     } else {
    //         //res.redirect(`author/${newAuthor.id}`)
    //         res.redirect(`authors`)
    //     }
    // })


})


module.exports = router 