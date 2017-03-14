var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var DisplaySchema = require('../models/displaySchema');
// Connect to MongoDb
var mongoose = require('mongoose');
var db = mongoose.connection;

router.get('/random', function(req, res) {

    var context = {};

    try {
        // Gets the first display schema from the collection to map the object properties and settings
        DisplaySchema.getFirst(function (err, displaySchema) {

            if (err) {
                res.json(err);
            }

            try {
                var collection = db.collection(displaySchema.collectionName);
                var count = collection.count();
                var rand = Math.floor(Math.random() * count);
                collection.find({thumbnail: {$ne: ""}}, {limit: 1}).skip(rand).toArray(function (error, objects) {
                    if (err) {
                        throw err;
                    }

                    var object = objects[0];

                    context.object = {
                        title: object[displaySchema.title],
                        thumbnail: object[displaySchema.thumbnail],
                        url: object[displaySchema.url],
                        date: object[displaySchema.date]
                    };

                    context.collectionTitle = displaySchema.collectionTitle;
                    context.dark = displaySchema.dark;
                    context.showButtons = displaySchema.showButtons;
                    context.showMeta = displaySchema.showMeta;
                    context.showTitle = displaySchema.showTitle;
                    context.itemCount = displaySchema.itemCount;
                    context.bgCol = displaySchema.bgCol;
                    context.fntCol = displaySchema.fntCol;

                    res.json(context);
                });
            }
            catch(err){
                res.json(err);
            }
        });
    }
    catch(err){
        res.json(err);
    }
});

router.post('/', function(req, res) {
    try {
        DisplaySchema.getFirst(function (err, displaySchema) {
            if (err) {
                res.json(err);
            }

            try {

                var count = parseInt(req.body.count);
                var skip = parseInt(req.body.skip);
                var search = req.body.search;

                // Map the query properties to the ones mapped in the schema
                var titleProperty = displaySchema.title;
                var thumbnail = displaySchema.thumbnail;
                var date = displaySchema.date;

                var collection = db.collection(displaySchema.collectionName);
                collection.find({
                    $and: [{[thumbnail]: {$ne: null}}, {
                        $or: [
                            {
                                [titleProperty]: {
                                    "$regex": search,
                                    "$options": "i"
                                }
                            },
                            {
                                [date]: {
                                    "$regex": search,
                                    "$options": "i"
                                }
                            }
                        ]
                    }]
                }, {limit: count}).skip(skip).toArray(function (error, dbObjects) {
                    if (err) {
                        res.json(err);
                    }

                    try {
                        var objects = [];

                        dbObjects.forEach(function (dbObject) {

                            var object = {
                                _id: dbObject._id,
                                title: dbObject[displaySchema.title],
                                thumbnail: dbObject[displaySchema.thumbnail],
                                url: dbObject[displaySchema.url],
                                date: dbObject[displaySchema.date]
                            };

                            objects.push(object)

                        });

                        res.json(objects);
                    }
                    catch (err) {
                        res.json({});
                    }
                });
            }
            catch (err){res.json(err)}
        });
    }
    catch(err){
        res.json(err);
    }
});


module.exports = router;
