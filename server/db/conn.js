const mongoose = require('mongoose');
const DB = process.env.DATABASE;

//Connected TO Database
mongoose.connect(DB, { useUnifiedTopology : true, useNewUrlParser : true , }).then(() => {
    console.log("MongoDB Connected");
 }).catch((e) => console.log("MongoDB Connection Failed")); 