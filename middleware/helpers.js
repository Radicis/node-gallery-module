// Gets the fullsize image form tate gallery
module.exports.getFullSizeImage = function(thumbnailUrl){
    if(thumbnailUrl === null || typeof thumbnailUrl === "undefined") {
        return "None";
    }
    return thumbnailUrl.slice(0, -5) + "10.jpg";
};

// Determines of the layout is fixed or not based on colCount comparision to zero
module.exports.isFixedCollage = function(colCount){
    return colCount >0 || false;
};