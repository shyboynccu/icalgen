
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.set('Content-Type', 'text/calendar');
  //res.set('Content-Disposition', 'attachment; filename="event.ics"'); 
  //res.send(event.toString());
  res.render('index', { title: "iCalGen.js" });
};
