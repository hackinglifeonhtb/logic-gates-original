const mongoose = require("mongoose");
const dbURI = `${process.env.DB_URI}`;

mongoose.connect(dbURI);

// Extra

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("ERROR IN MongoDB");
});

db.on("connected", (err) => {
  console.log("MongoDB IS CONNECTED ..");
});

// connected