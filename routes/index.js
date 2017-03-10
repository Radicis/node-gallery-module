var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var config = require('../config/config');
var request = require('request');

router.get('/', function(req, res) {

    request('http://localhost:3030/object/random', function (error, response, body) {
         if (!error && response.statusCode == 200) {
             var context = {};

             var responseBody = JSON.parse(body);

             var object = responseBody.object;

             // get all relevant keys form the object to display as filters
             context.properties = helpers.getKeys(object);

             context.title = responseBody.title;

             console.log(responseBody);

             // Set up config variables
             context.displayCollectionTitle = config.displayCollectionTitle;
             context.displayFilterCheckboxes = config.displayFilterCheckboxes;
             context.displayFilterButtons = config.displayFilterButtons;
             context.displayMetaDataOnLightBox = config.displayMetaDataOnLightBox;
             context.itemCount = config.itemCount;

            res.render('default', context);
         }
    });
});

router.get('/setup', function(err, data){
    helpers.createDummyData().then(function(field){
        console.log("Dummy Data created!");
    });
});

module.exports = router;
