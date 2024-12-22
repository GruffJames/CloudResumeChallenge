const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/Hobbit";

let db = mongoose.connection;
mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
      console.log(err);
  },
);

module.exports = mongoose;