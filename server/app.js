import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import randomRoute from "./routes/randomRoute.js";
import searchRoute from "./routes/searchRoute.js";
import ServerlessHttp from "serverless-http";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors());

app.use(bodyParser.json());

let port = process.env.port || 3001;

app.use("/randomfood", randomRoute);
app.use("/searchfoods", searchRoute);

// might need this for aws commented out on local
// module.exports.handler = ServerlessHttp(app);

app.get("/", (req, res) => {
  res.send("Server side running!");
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
