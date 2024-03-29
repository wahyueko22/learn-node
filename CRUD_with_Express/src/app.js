const fs = require('fs');
const path = require('path');
const express = require('express');
// const { request } = require('http');
const app = express();
const cors = require('cors')
require("dotenv").config({path:`../.env`});






// to avoid CORS protection error
app.use(cors())
 

// init middleware to record IP addresses
const logger = require('../middleware/logger.js');
app.use(logger);


//body parser middleware (inbuilt with express after update)
const { urlencoded } = require('express');
app.use(express.json());
app.use(urlencoded({extended: false}));


//Data API routes
app.use('/api/data', require('../routes/api/data'));


//set static folder
const staticPath = path.join( __dirname, "../public");
app.use(express.static(staticPath));


// send file for '/home' request
fs.readFile('../public/index.html', 'UTF-8' , (err,content) => {
app.get('/home', (req, res) => {
    res.send(content);
});
});



// listen from specified port
const port = process.env.PORT || 5500;

app.listen(port, ()=>{
    console.log(`port number : ${port} \n listening...`);
})