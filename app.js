const express = require('express')
const path = require('path')
const cool = require('cool-ascii-faces')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

const PORT = process.env.PORT || 5000
var app = express()

app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'jade')
  .get('/', (req, res) => res.send('hi!'))
  .post('/message', (req, res) =>{

      const _obj = {
          user_key: req.body.user_key,
          type: req.body.type,
          content: req.body.content
      };
    var emotion = cool();
    res.json({
      "message" : {
        "text" : emotion
      }
    })
  })
  .get('/keyboard', (req, res) => {
  const menu = {
      type: 'buttons',
      buttons: ["사용방법"]
  };
  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));})
  // .post('/message', (req, res) => {
  //   const _obj = {
  //       user_key: req.body.user_key,
  //       type: req.body.type,
  //       content: req.body.content
  //   };
  //   let massage = {
  //       "message": {
  //           "text": '응답 메세지...'
  //       },
  //       "keyboard": {
  //           "type": "buttons",
  //           "buttons": [
  //               "메뉴1",
  //               "메뉴2",
  //               "메뉴3"
  //           ]
  //       }
  //   };
  //   res.set({
  //       'content-type': 'application/json'
  //   }).send(JSON.stringify(massage));})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

});
