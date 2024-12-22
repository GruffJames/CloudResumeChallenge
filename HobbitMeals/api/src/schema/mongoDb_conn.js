// databse/db.js code ...

import mongoose from 'mongoose';

var dbURI = 'mongodb://localhost:27017/Hobbit';
// current URI deprecated future replace
// mongoose.connect('mongodb://user:[password@sample.com](mailto:password@sample.com):port/dbname', { useNewUrlParser: true })

export async function ConnectToMongoose() {
  try {
    await mongoose.connect(dbURI);
    console.log('Mongoose default connection open to ' + dbURI);
  } catch (err) {
    console.log('Mongoose default connection error: ' + err);
  }
}

export async function DisconnectMongoose() {
  try {
    await mongoose.disconnect();
    console.log('Mongoose default connection ' + dbURI + ' disconnected');
  } catch (err) {
    console.log('Mongoose default connection disconnect returned error: ' + err);
  }
}



mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const MongooseConn = mongoose;

export default MongooseConn;