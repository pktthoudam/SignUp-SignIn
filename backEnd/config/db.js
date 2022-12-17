const mongoose = require('mongoose');
mongoose.set("strictQuery", true);

mongoose.connect('mongodb://localhost:27017/persons', (err)=>{
    if (err) {console.log("Not Connected")}
    console.log("Successfully Connected to DB");
});

module.exports = mongoose 