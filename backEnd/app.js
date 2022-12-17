//import modules
const express = require('express');
const db = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const route = require('./route')

// configuaration
app.use(bodyParser.json());
var cors = require('cors');
// const corsOpts = {
//   origin: '*',

//   methods: [
//     'GET',
//     'POST',
//   ],

//   allowedHeaders: [
//     'Content-Type',
//   ],
// };

app.use(cors());

app.use('/', route);
// use modules

// app.use(cors());
// var corsOptions = {
//     origin: 'http://localhost:4200/',
//     optionsSuccessStatus: 200 /
//   }
// route 




app.listen(3000, (err)=>{
    if (err) {console.log("error");}
    console.log("we have listen at port number 3000");
})