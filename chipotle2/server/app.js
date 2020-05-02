'use strict'
const express = require('express')
var cors = require("cors");

// Create the express app
const app = express()
//var router = require('./routes/routes.js');
app.use(cors());


//app.use(express.static(path.join(__dirname,"pulic")));
//app.use('/',router);
// Start server

app.get('/', function (req,res) {
	res.send('loool');
});


app.listen(8080, function (err) {
	
})
