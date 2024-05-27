const express = require("express");
const app = express();

const db = require("./models");

const port = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
