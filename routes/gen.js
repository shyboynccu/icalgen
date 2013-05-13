
/*
 * GET home page.
 */
var icalendar = require('icalendar');
var fs = require('fs');
var uuid = require('node-uuid');
var QRCode = require('qrcode');
var config = require('konphyg')(__dirname + '/../config');

exports.gen = function(req, res){
  var appconf = config('conf')
  var event_id = uuid.v4(); 
  var event = new icalendar.VEvent(event_id);
  event.setSummary(req.body.Summary);
  event.setDate(new Date(req.body.DateFrom), new Date(req.body.DateTo));

  var filename="public/ics/"+event_id+".ics";
  fs.writeFile(filename, event.toString(), function(err) {
    if(err) {
        console.log(err);
    }
  });
  
  var ics_url = appconf.proto + "://" + appconf.host + ":" + appconf.port +
                "/event/" + event_id;
  var qr_string = QRCode.toDataURL(ics_url, function(err,url){
        console.log(ics_url);
        res.send(url);
    });
};
