const express = require ('express')
const  { userRoutes } = require("./user-routes")
const { ExpressError } = require ('./expressError')
const app = express();

app.use(express.json());

app.use('/items', userRoutes)


//404 handler
app.use( (req, res) => {
    return new ExpressError("Not found", 404)
})


//generic error handler
app.use((err, req, res, next) => {

    //the default status is 500 internal server Error
    let status = err.stat // || 500;
   
    //set the status and alert the user
    return res.status(status).json( {
	error: {
	    message:err.msg,
	    status: err.stat
	}
    })
})

module.exports = app;

