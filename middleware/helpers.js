var q = require('q');
var config = require('../config/config');
var DisplaySchema = require('../models/displaySchema');

module.exports.getKeys = function(obj){
    var keys = [];
    for(var key in obj){
        if(key!='url' && key!='thumbnail')
            keys.push(key);
    }
    return keys;
};

module.exports.getFullSizeImage = function(thumbnailUrl){
    if(thumbnailUrl === null || typeof thumbnailUrl === "undefined") {
        return "None";
    }
    return thumbnailUrl.slice(0, -5) + "10.jpg";
};

module.exports.truncate = function(string, value){
    if(string != null && typeof string != "undefined") {
        truncated = string.substring(0, value);
        if(string.length>=value) truncated += "...";
        return truncated
    }
};

module.exports.createDummyData = function(){
    var defer = q.defer();

    var schema = {
        Name: "Dummy",
        brandTitle: "Tate Gallery",
        brandUrl: "/img/logo.png",
        collectionName: 'artworks',
        title: "title",
        thumbnail: "thumbnailUrl",
        url: "url",
        date: "dateText",
        fullSize: "thumbnailUrl",
        customFields: [],
        footnote: "creditLine"
    };

    DisplaySchema.add(schema, function(err, schema){
        defer.resolve(field);

    });
    return defer.promise;
};