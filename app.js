if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const { authentication } = require("./middleware/auth");
const authRouter = require("./router/authRouter");
const mainRouter = require("./router/index");
// const showError = require('./middleware/nextError')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(authentication); //middleware
app.use(mainRouter);

app.post("/");

// app.use(showError)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app;
