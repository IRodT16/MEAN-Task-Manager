const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in the Mongoose Models
const { List } = require('./db/models/list.model');
const { Task } = require('./db/models/task.model');

// Load Middleware
app.use(bodyParser.json());

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
});

app.delete('lists/:id', (req, res) => {
  //Delete a specified list
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
