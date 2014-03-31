var twit = require('twit');
var config = require('./config');

var T = new twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret
});

exports.tweets = function(req,res){
var q = req.param('q');
T.get('search/tweets', { q: q , count: 10 }, function(err, data) {
    console.log(q);
  if (!err) {
   res.json(data);  
  }
  else {
   res.json(err);
  }
})

}
