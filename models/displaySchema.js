var mongoose = require('mongoose');

var DisplaySchemaSchema = mongoose.Schema({
    schemaName:{
      type: String
    },
    collectionName: {
        type: String
    },
    collectionTitle: {
        type: String
    },
    brandUrl: {
        type: String
    },
    title: {
        type: String
    },
    thumbnail: {
        type: String
    },
    fullSize: {
        type: String
    },
    url: {
        type: String
    },
    date: {
        type: String
    },
    dark:{
        type:Boolean,
        default:true
    },
    showMeta:{
        type:Boolean,
        default:true
    },
    showTitle:{
        type:Boolean,
        default:true
    },
    showButtons:{
        type:Boolean,
        default:true
    },
    itemCount:{
        type:Number,
        default:24
    }
});

var DisplaySchema = module.exports = mongoose.model('DisplaySchema', DisplaySchemaSchema);

module.exports.getFirst = function(callback){
    return DisplaySchema.findOne().exec(callback);
};

module.exports.add = function(schema, callback){
    DisplaySchema.create(schema, callback);
};

module.exports.update = function(schema, callback){
    DisplaySchema.findOneAndUpdate({_id:schema._id}, {
        title:schema.title,
        collectionTitle: schema.collectionTitle,
        brandUrl: schema.brandUrl,
        collectionName: schema.collectionName,
        url: schema.url,
        thumbnail: schema.thumbnail,
        fullSize: schema.fullSize,
        date: schema.date,
        dark:schema.dark,
        showTitle: schema.showTitle,
        showMeta: schema.showMeta,
        showButtons: schema.showButtons,
        itemCount: schema.itemCount
    }, { new: false }, callback);
};

