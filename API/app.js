var express = require("express");
var bodyParser = require("body-parser");
var port = 81;
var app = express();
var router = express.Router();
var path = __dirname + "/views/";
var APIKey = 'VV37vYtzBBUNjnq4xmlS3gBi24wIqrVa';
var Axios = require("axios");

app.use(bodyParser.json());
app.use(express.static(path));
app.use("/",router);

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
  next()
})

router.get("/", (req,res) => {
  res.sendFile(path + "index.html");
})

app.listen(port, () => {
  console.log("Live at Port " + port);
})

router.use( (req,res,next) => {
  console.log("/" + req.method);
  next();
})

router.get("/search/:query/:page/:records", (req, res) => {
  let query = req.params["query"];
  let page = req.params["page"];
  let recordsPerPage = req.params["records"];
  var offset = 0
  if (page !== 1) {
    offset = (page - 1) * recordsPerPage
  }
  Axios.get("http://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + query + "&limit=" + recordsPerPage + "&offset=" + offset)
    .then(response => {
      res.send(response.data.data)
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

app.use("*", (req,res) => {
  res.sendFile(path + "404.html");
})
