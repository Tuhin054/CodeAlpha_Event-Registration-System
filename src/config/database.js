const mongoose = require("mongoose");

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI must be set");
  }

  await mongoose.connect(uri);
}

module.exports = connectToDatabase;
