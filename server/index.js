const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);

const db = require("./models");
db.sequelize.sync().then(() => {
  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
