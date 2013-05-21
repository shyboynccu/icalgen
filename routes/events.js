
/*
 * GET home page.
 */
var mongo = require('mongodb');
var appconf = require('konphyg')(__dirname + '/../config')('conf');  

exports.byid = function(req, res){
  var event_id = req.params.id; 
  var mongo_client = require('mongodb').MongoClient;
  var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 
    appconf.mongodb_url;
    
  mongo_client.connect(mongoUri, function (err, db) {
    var collection = db.collection('events');
    collection.findOne({event_id: event_id}, function(err, item) {
          if(err)
          {
              console.log(err);
              res.render('index', { title: "iCalGen.js" });              
          }
          else
          {
              res.setHeader('Content-Type', 'text/calendar');
              res.setHeader('Content-Disposition', 'attachment; filename="event.ics"');
              res.send(item.ics_string);
          }
      });
  });
};
