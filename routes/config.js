var express = require('express');
var router = express.Router();
var DisplaySchema = require('../models/displaySchema');
var middleware = require('../middleware/helpers');
var config = require('../config/config');

// Renders the schema config page
router.get('/', function(req, res) {
    var context = {};
    DisplaySchema.getFirst(function(err, schema){
        if(err)
            throw err;
        context.schema = schema;
        context.title = "Gallery Config";
        res.render('config', context);
    });
});

// Route to update or create a new schema object
router.post('/',function(req, res){

    // Create the schema object from the request body params
    var newSchema = {
        collectionName: req.body.collectionName,
        collectionTitle: req.body.collectionTitle,
        brandUrl: req.body.brandUrl,
        title: req.body.title,
        url: req.body.url,
        thumbnail: req.body.thumbnail,
        fullSize: req.body.fullSize,
        date: req.body.date,
        dark: req.body.dark,
        showButtons: req.body.showButtons,
        showMeta : req.body.showMeta,
        itemCount: req.body.itemCount,
        showTitle: req.body.showTitle,
        bgCol: req.body.bgCol,
        fntCol: req.body.fntCol,
        colCount: req.body.colCount
    };

    // If an ID was passed then update instead of create
    if(req.body._id){
        newSchema._id = req.body._id;
        DisplaySchema.update(newSchema, function(err){
            if(err){
                console.log(err);
                res.render('error', err);
            }
            else{
                res.redirect('/config');
            }
        })
    }
    else {
        DisplaySchema.add(newSchema, function (err) {
            if(err){
                console.log(err);
                res.render('error', err);
            }
            else {
                res.redirect('/config');
            }
        });
    }
});

module.exports = router;
