const express = require('express')
const path = require('path')
var cool = require('cool-ascii-faces')
const PORT = process.env.PORT || 5000
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'jade')
  .get('/', (req, res) => res.send('hi!'))
  .post('/message', (req, res) =>{
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
      buttons: ["메뉴1", "메뉴2", "메뉴3"]
  };
  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));})
  .post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    let massage = {
        "message": {
            "text": '응답 메세지...'
        },
        "keyboard": {
            "type": "buttons",
            "buttons": [
                "메뉴1",
                "메뉴2",
                "메뉴3"
            ]
        }
    };
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(massage));})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
