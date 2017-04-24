console.log('future routes');
// require app controllers
var codsController = require('./../controllers/cods.js');

// initialize each controller
var cods = new codsController();

// export routes as a function that takes the application (e.g., app) as an argument
module.exports = function(app){
    app.get('/cods', function(req, res) {
        cods.index(req, res);
    });
    // app.get('/friends/:id', function(req, res) {
    //     friends.show(req, res);
    // });
    app.post('/cods', function(req, res) {
        cods.create(req, res);
    });
    // app.put('/friends/:id', function(req, res) {
    //     friends.update(req, res);
    // });
    app.delete('/cods/:id', function(req, res) {
        cods.delete(req, res);
    });
}
// 5 of the 7 RESTful routes, excludes new and edit
