
const express = require('express');
const router = express.Router();
const bugModel = require('./model');


/* ADDING DATA */
router.post('/create',(req,res)=>{
   console.log('req.body : \n',req.body)
 const saver = new bugModel(req.body);

 saver.save()
 .then((result)=>{
    console.log("file saved\n",result)
    res.status(200).send(result) 
})
 .catch(err=>res.status(400).send('unable to save data'))
})

/* GETTING ALL DATA  */
router.get('/getall',(req,res)=>{

 let pageNumber = parseInt(req.query.page)
 let limit = parseInt(req.query.limit) || 10;
 let sortField = req.query.sortField;
 let sortOrder = req.query.sortOrder || 1;
 sortOrder == 'asc' ? sortOrder=1 : sortOrder == 'dsc' ? sortOrder= -1 : sortOrder=parseInt(sortOrder);


 if (isNaN(pageNumber)) {
    pageNumber = 1;
    limit = 0; // Set limit to 0 to return all items
  }
 
  const skip = (pageNumber-1)*limit;

 bugModel.find({}).sort(sortField ? {[sortField]:sortOrder}:{}).skip(skip).limit(limit).exec().then((result)=>{
    res.status(200).send(result);
 })
 .catch(err=>{
    res.status(400).send("error finding results")
 })
})

/* GETTING WITH FILTER */
router.get('/filter/:page',(req,res)=>{
    const filterField = req.query.field;
    const filterValue = req.query.value;
    
    
    if(!filterField || !filterValue){
        res.status(400).send("Missing query paramters");
        return;
    }

    bugModel.find({[filterField] : filterValue}).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Error Fetching data");
    })
})




/* UPDATING THE DATA */
router.patch('/update/:id',(req,res)=>{
  const updationId = req.params.id;
  const updatingFields = {
    title:req.body?.title,
    description:req.body?.description,
    project:req.body?.project,
    due_date:req.body?.due_date,
    reporter:req.body?.reporter,
    fileUrl:req.body?.fileUrl
}

  bugModel.findByIdAndUpdate(updationId,{$set:updatingFields},{new:true})
  .then((result)=>{
    console.log(result)
    res.send(result)
  })
  .catch(err=>{
    console.log('error updating the value')
    res.status(400).send('error updating the value')
  })
})

/* DELETING DATA BY ID  */
router.delete('/delete/:id',(req,res)=>{
    const deletionId = req.params.id;
    bugModel.findByIdAndDelete(deletionId)
    .then((result)=>{
        console.log('deletion successfull\n',result)
    })
    .catch(err=>{
        console.log("error deleting the data \n")
        res.status(400).send('error deleting the data')
    })
})








module.exports = router;