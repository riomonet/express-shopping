const db = require('./fakeDb.js')
const express = require('express')
const userRoutes = new express.Router()

userRoutes.get('/',(req, res) => {
    res.json({items: db.items })
})

userRoutes.post('/',(req, res) => {

    db.items.push(req.body)
    res.json({ added: req.body })
})

userRoutes.get('/:name', ( req, res )=> {
    const item = db.items.find(item => item.name === req.params.name)
    if (item === undefined) {
	throw new ExpressError ("Item not Found" , 404)
    }
    res.json( item )
})

userRoutes.patch('/:name', ( req, res )=> {
    const item = db.items.find(item => item.name === req.params.name)
    if (item === undefined) {
	throw new ExpressError ("Item not Found" , 404)
    }
    if(req.body.name)
	item.name = req.body.name;
    if (req.body.price)
	item.price = req.body.price;
    res.json( {updated: req.body} )
})

userRoutes.delete('/:name', ( req, res )=> {
    db.items = db.items.filter(item =>  item.name !== req.params.name)
    res.json({deleted: {name: req.params.name}});


    //can also use findindex(x => some booolean)
    //and then splice
})

module.exports = { userRoutes };

