const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in the Mongoose Models
const { List } = require('./db/models/list.model');
const { Task } = require('./db/models/task.model');

// Load Middleware
app.use(bodyParser.json());

// CORS HEADER MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*  Route Handlers */

/* List Routes */

// GET /lists - purpose is to get all lists
app.get('/lists', (req, res) => {
  // Return an array of all the lists in the database
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

// POST /lists - purpose is to create a list
app.post('/lists', (req, res) => {
  // Create a new list and return the new lists document back to the user(including the id)
  // List information fields will be passed in via JSON request body
  let title = req.body.title;

  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
});

// PATCH /lists - updates an existing/specified list
app.patch('/lists/:id', (req, res) => {
  // Updates the specified lists based off of the ID
  List.findOneAndUpdate({ _id: req.params.id }, {
    $set: req.body
  }).then(()=> {
    res.send({'message': 'Updated Successfully'})
  })
});

app.delete('/lists/:id', (req, res) => {
  //Delete a specified list
  List.findOneAndRemove({
    _id: req.params.id
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  })
});

// Get /lists/:listId/tasks
// Get all tasks in a specific list
app.get('/lists/:listId/tasks', (req, res) => {
  //return all tasks that belong to a specific list
  Task.find({
    _listId: req.params.listId
  }).then((tasks)=> {
    res.send(tasks)
  })
})

app.get('/lists/:listId/tasks/:taskId', (req, res)=>{
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((task)=>{
    res.send(task)
  })
})

app.post('/lists/:listId/tasks', (req,res)=>{
  // Create a new task in a list specified by listId
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId
  })
  newTask.save().then((newTaskDoc)=>{
    res.send(newTaskDoc)
  })
})

app.patch('/lists/:listId/tasks/:taskId', (req,res)=>{
  Task.findOneAndUpdate({
    _id: req.params.taskId,
    _listId: req.params.listId
  }, {
    $set: req.body
  }).then(()=>{
    res.sendStatus(200)
    
  })

})


app.delete('/lists/:listId/tasks/:taskId', (req,res)=>{
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId
  }).then((removedTaskDoc)=>{
    res.send(removedTaskDoc)
  })
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
