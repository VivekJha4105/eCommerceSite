const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config/config");

//* Handling Uncaught Exception Error. (Reference Error if we are simplifying)
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to Uncaught Exception Error.");
  process.exit(1);
});

mongoose.connect(config.mongoose.url).then(() => {
  console.log(`Server connected to MongoDb at: ${config.mongoose.url}`);
});

const server = app.listen(config.port, () => {
  console.log(`Server is working on http://localhost:${config.port}`);
});

//* Handling Unhandled Promise Rejection Errors.
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down Server due to Unhandled Promise Rejection Error.");
  server.close(() => {
    process.exit(1);
  });
});
