var express = require('express');
var router = express.Router();
var DisplaySchema = require('../models/displaySchema');
var middleware = require('../middleware/helpers');
var config = require('../config/config');

router.get('/', function(req, res) {
    var context = {};
    DisplaySchema.getFirst(function(err, schema){
        if(err)
            throw err;
        context.schema = schema[0];
        res.render('config', context);
    });
});

router.post('/schema',function(req, res){

    var newSchema = {
        collectionName: req.body.collectionName,
        collectionTitle: req.body.collectionTitle,
        brandUrl: req.body.brandUrl,
        title: req.body.title,
        url: req.body.url,
        thumbnail: req.body.thumbnail,
        fullSize: req.body.fullSize,
        date: req.body.date
    };

    // If an ID was passed then update instead of create
    if(req.body._id){
        newSchema._id = req.body._id;
        DisplaySchema.update(newSchema, function(err, schema){
            res.render('config', {schema: schema});
        })
    }
    else {
        DisplaySchema.add(newSchema, function (err, schema) {
            res.render('config', {schema: schema});
        });
    }

});


router.get('/schema:_id', function(req, res){
    var id = req.params._id;
    var context = {};
    DisplaySchema.getById(id, function(err, schema){
        if(err)
            throw err;
        context.schema = schema;
        res.render('config', context);
    })
});

module.exports = router;
