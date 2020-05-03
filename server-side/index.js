require("express-async-errors");
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
require("./models/UserModel");
require("./models/MoviesModel");
const userRoute = require("./router/UserRoute");
const MoviesRoute = require("./router/MoviesRoute");
const config = require("config");
const helmet = require("helmet");
const compression = require("compression");
//database connection
const secret = config.get("secret") || process.env.secret;
const mongoURI = `mongodb+srv://mohammedgehad:${secret}@cluster0-8vjxg.mongodb.net/test?retryWrites=true&w=majority
`;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("connected to DB"))
  .catch((e) => console.log(e));
//

app.use(helmet());
app.use(compression());
app.use("/user", userRoute);
app.use("/movies", MoviesRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening at ${port}`);
});

if (process.env.NODE_ENV !== "production") {
  const ngrok = require("ngrok");
  const ngrokConnect = async () => {
    const url = await ngrok.connect(port);
    console.log(url);
  };
  ngrokConnect();
}
