const express = require('express');
const app = express();
const cors = require('cors');

/* USING MIDDLEWARES */

/* FOR ALLOWING CROSS ORIGIN RESOURCE SHARING */
app.use(cors());
/* PARSING THE REQUEST BODY WITH JSON PAYLOADS */
app.use(express.json());
/* PARSING THE REQUEST BODY WITH URL-ENCODED PAYLOADS */
app.use(express.urlencoded({extended:true}));

const apiRoutes = require('./routes');
app.use('/api/bug',apiRoutes);

const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;



/* CONNECTING TO MONGODB DATABASE WITH MONGOOSE */
mongoose.connect(process.env.MONGODB_DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>console.log("connected to database"))
.catch(err=>console.error("Database connection failed!!",err))


/* CONNECTING TO A PORT */
app.listen(port,()=>{
    console.log(`Server up and running on Port ${port}`);
})