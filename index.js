const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/all", (req, res) => {
  const quotes = require("./quotes");
  res.send(quotes());
})

app.get("/random", (req, res) => {
  const quotes = require("./quotes");
  const random = Math.floor(Math.random() *quotes().length);
  const data = quotes()[random];
  res.send(data); 
});

app.get("/:id", (req, res) => {
  const quotes = require("./quotes");
  res.send(quotes()[parseInt(req.params.id) - 1]);
});

app.listen(88, () => console.log('app listening on port 3000!'));
