var express = require('express');
var router = express.Router();
var helpers = require('../middleware/helpers');
var DisplaySchema = require('../models/displaySchema');
// Connect to MongoDb
var mongoose = require('mongoose');
var db = mongoose.connection;

// Returns a collection of objects based on count, skip and search params
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

                // Select the mongo db collection
                var collection = db.collection(displaySchema.collectionName);

                // Find entries in the collection which match the search term
                // The Computer property names map to the ones stored in the schema
                // Shows in some editors as syntax error
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
