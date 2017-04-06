var express  = require( 'express' ),
    path     = require( 'path' ),
    bp       = require('body-parser'),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express(),
    mongoose = require('mongoose');

app.use( bp.json() );
app.use( bp.urlencoded({extended: true}));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));

app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});
