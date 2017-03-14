var express = require('express');
var router = express.Router();
var config = require('../config/config');
var DisplaySchema = require('../models/displaySchema');

router.get('/', function(req, res) {

    DisplaySchema.getFirst(function (err, displaySchema){

        if(err){
            throw err;
        }

        var context = {};

        context.schema = displaySchema;
        context.baseUrl = config.baseUrl;

        res.render('default', context);

    });
});

module.exports = router;
