const mongoose = require("mongoose");

const app = require("./app");
const config = require("./config/config");

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log(`Server connected to MongoDb at: ${config.mongoose.url}`);
    app.listen(config.port, () => {
      console.log(`Server is working on http://localhost:${config.port}`);
    });
  })
  .catch((error) => console.log(`Failed to connect to Database.\n ${error}`));
