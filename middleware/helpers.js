// Gets the fullsize image form tate gallery
module.exports.getFullSizeImage = function(thumbnailUrl){
    if(thumbnailUrl === null || typeof thumbnailUrl === "undefined") {
        return "None";
    }
    return thumbnailUrl.slice(0, -5) + "10.jpg";
};

// runcates a string based on a value
module.exports.truncate = function(string, value){
    if(string != null && typeof string != "undefined") {
        truncated = string.substring(0, value);
        if(string.length>=value) truncated += "...";
        return truncated
    }
};