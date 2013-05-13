
/*
 * GET home page.
 */

exports.byid = function(req, res){
  var event_id = req.params.id; 

  var filename="public/ics/"+event_id+".ics";
  res.attachment(filename);
  res.download(filename);
  console.log(res);
};
