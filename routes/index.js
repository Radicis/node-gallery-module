var express = require('express');
var router = express.Router();
var config = require('../config/config');
var DisplaySchema = require('../models/displaySchema');

router.get('/', function(req, res) {

    // Get the first (there will only ever be one) schema to format the page initially
    DisplaySchema.getFirst(function (err, displaySchema){

        if(err){
            throw err;
        }

        var context = {};

        context.schema = displaySchema;

        // Get the server url from the config file
        context.baseUrl = config.baseUrl;

        res.render('default', context);

    });
});

module.exports = router;
