
const express = require('express');
const ObjectID = require('mongodb').ObjectID;

// This function will hold all the routing functionality for the database, and will be used in server.js
const newRouter = function (collection) {

  const router = express.Router();
  
  // Function for catching errors, this is to keep the code DRY
//   const errorCatcher = function(inputError, res) {
//     console.error(inputError);
//     res.status(500).json({ status: 500, error: inputError.toString() });

//   };
  
  
  // Route for getting all staff data
  router.get('/', ( req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs));
    //   .catch((err) => errorCatcher(err));
  });

  // Route for getting specific staff data
  router.get('/:id', (req, res) => {
    const pid = req.params.id;
    collection
      .findOne({ id: pid })
      .then((doc) => res.json(doc));
    //   .catch((err) => errorCatcher(err));
      //.findOne({ _id: ObjectID(id) })
  });

  // Route for deleting specific staff 
  
  router.delete('/:id', (req, res) => {
    const pid = req.params.id;
    collection
      .deleteOne({ id: pid })
      .then(() => collection.find().toArray())
      .then((docs) => res.json(docs));
    //   .catch((err) => errorCatcher(err));
  });


  // Route for creating new staff
//   router.post('/', (req, res) => {
//     const newData = req.body;
//     collection
//     .insertOne(newData)
//     .then((result) => {
//       res.json(result.ops[0]);
//     })
//     // .catch((err) => errorCatcher(err));
//   });

router.post('/', (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then((result) => {
        res.json(result.ops[0]);
      })
      .catch((err) => {
        console.error('Error:', err);
        res.status(500).json({ status: 500, error: err.message });
      });
  });
  
  // Route for updating specific staff
 router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    
    collection
    //.findOneAndUpdate({ id: itemId }, { $set: {id:updatedItem.id,name:updatedItem.name}}  )
    .findOneAndUpdate({ id: itemId }, { $set: {id:updatedItem.id,name:updatedItem.name,age:updatedItem.age }}  )
    .then(result => {
      res.json(result.value);
      /*var key;
      for (key in result.value){   console.log(key+" , "+result[key])   }*/
     

    })
    // .catch((err) => errorCatcher(err));
  });
  
  
  return router;

};

module.exports = newRouter;