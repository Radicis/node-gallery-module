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

            context.title = responseBody.collectionTitle;
            context.dark = responseBody.dark;
            context.displayButtons = responseBody.showButtons;
            context.displayMetaDataOnLightBox = responseBody.showMeta;
            context.displayCollectionTitle  = responseBody.showTitle;
            context.itemCount = responseBody.itemCount;
            res.render('default', context);
        }
    });
});

module.exports = router;
