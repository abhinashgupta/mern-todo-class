require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDb Connection Failed " + error);
  });

module.exports = dbConnection;
