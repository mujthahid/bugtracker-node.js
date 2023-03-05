const mongoose = require('mongoose');


/* DEFINING A SCHEMA FOR DATA TO BE STORED */
const bugSchema = new mongoose.Schema({
  
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    due_date:{type:Date},
    project:{type:String},
    reporter:{type:String},
    fileUrl: {type:String},
})

const bugModel = mongoose.model('bugModel',bugSchema);

module.exports = bugModel;
