
/*
 * GET home page.
 */
var icalendar = require('icalendar');
var fs = require('fs');
var uuid = require('node-uuid');
var QRCode = require('qrcode');
var appconf = require('konphyg')(__dirname + '/../config')('conf');  
 
exports.gen = function(req, res){
  var event_id = uuid.v4(); 
  var event = new icalendar.VEvent(event_id);
  event.setSummary(req.body.Summary);
  event.setDescription('');
  event.setDate(new Date(req.body.DateFrom), new Date(req.body.DateTo));

  var output = event.toString();

  var output =  "BEGIN:VEVENT" + "\n"
              + event.getProperty('SUMMARY').format() + "\n"
              + event.getProperty('DESCRIPTION').format() + "\n"
              + event.getProperty('DTSTART').format() + "\n"
              + event.getProperty('DTEND').format() + "\n"
              + "END:VEVENT";

  var mongo_client = require('mongodb').MongoClient;

  var mongoUri = process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    appconf.mongodb_url;

  mongo_client.connect(mongoUri, function (err, db) {
    if(err)
    {
      console.log(err);
    }
    else
    {
      var collection = db.collection('events');
      collection.insert({event_id: event_id, ics_string: event.toString()}, {w: 1}, function(err,rs) {
          if(err)
          {
              console.log(err);
          }
          //var ics_url = appconf.proto + "://" + appconf.host + "/events/" + event_id;
          var qr_string = QRCode.toDataURL(output, function(err,url){
            res.setHeader('Content-Type', 'text/calendar');
            res.send(url);
          });
      });
    }
 });

};
