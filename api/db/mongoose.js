// This file will handle connection logic to MongoDB

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://127.0.0.1:27017/TaskManager', { useNewURLParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully :)');
  })
  .catch((e) => {
    console.log('Error while attempting to connect to MongoDB');
    console.log(e);
  });

// To prevent deprecation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);

module.exports = {
  mongoose,
};
