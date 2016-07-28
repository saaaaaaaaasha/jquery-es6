const Stickers    = require('./modules/stickers.js'),
      bodyParser  = require('body-parser'),
      express     = require('express'),
   	  fs          = require('fs');

const app   = express(),
      port  = 8089;

/*
// for testing via postman
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
*/

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.listen(port, console.log('Server is running on port', port));

const items = new Stickers();

app.get('/stickers', function(req, res) {
  res.send({items: items.findAll()});
});

app.put('/sticker/:id/like', function(req, res) {
  let id = req.params.id;
  let vote = (req.body.vote) ? 1 : -1;

  items.updateLikes({id: id, vote: vote}, (p) => {
    res.send({
      status: p.status,
      likes: p.likes
    });
  });
});

app.delete('/sticker/:id', function(req, res) {
  let id = req.params.id;

  items.deleteItem(id, (p) => {
    res.send({status: p.status});
  });
});