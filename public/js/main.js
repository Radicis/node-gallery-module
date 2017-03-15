
// Contains the gallery loading functionality
// Takes item count and displaymeta and baseurl params
var extJs = function(itemCount, displayMetaDataOnLightBox, baseUrl) {

    var collage = $('#collage');

    // Store the maximum image width of the images in the collection
    var maxImgWidth = 90000;

    var count = itemCount;
    // Set the search string to empty string to prevent null pointer
    var searchString = "";

    $(document).ready(function () {

        // Bind the window scroll function to pop in fixed menu when threshold is reached
        $(window).scroll(function () {
            if ($(window).scrollTop() > 131) {
                $('#controls').addClass('fixed');
                collage.addClass('margin-top');
            }
            if ($(window).scrollTop() < 130 && $('#controls').hasClass('fixed')) {
                $('#controls').removeClass('fixed');
                collage.removeClass('margin-top');
            }
        });

        // If the length of the loaded items is positive then apply the function to te load more button
        if (collage.length > 0) {

            $('#load-more').click(function () {
                AppendMix();
            });

            CreateMix(0);
        }

        updateImgWidth();

        $(window).resize(function() {
            updateImgWidth();
        });
    });

    var updateImgWidth = function(){

        // If a fixed layout is selected then calculate the width of each image
        if(collage.hasClass('fixedCollage')){

            // Get the css col count property of the div
            var colCount = parseInt(collage.css('column-count'));

            //Calculate img width based on screen width and col count
            var imgWidth = $(window).width()/colCount ;

            $('.fixedCollage img').css('max-width', imgWidth + "px");

            console.log("Max is: " + maxImgWidth*colCount + " and collage is: " + parseInt($('.fixedCollage').css('width')));

            if((maxImgWidth>0) && (parseInt($('.fixedCollage').css('width'))>= maxImgWidth*colCount)){
                $('.fixedCollage').css('max-width', maxImgWidth*colCount);
                $('#filters').css('max-width', maxImgWidth*colCount);
            }
        }
    };

    // Setup time variables
    var typingTimer;
    var doneTypingInterval = 1000;
    var $input = $('#search');

    // On keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    // On keydown, clear the countdown to prevent loading while still typing
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    // Once typing complete, execute the createMix function
    var doneTyping = function () {
        searchString = $('#search').val();
        CreateMix();
    };

    // Creates a new mix, erases existing items.
    var CreateMix = function () {

        var params = {
            count: itemCount,
            search: searchString,
            skip: 0
        };

        // Clear existing items
        $('#collage').html("");

        Populate(params);
    };

    // Appends to an existing mix
    var AppendMix = function () {

        var params = {
            count: itemCount,
            search: searchString,
            skip: count
        };

        Populate(params);
    };

    // Populates the collage mix with items returned from API endpoint
    var Populate = function (params) {

        $.post(baseUrl + '/object', params, function (data) {

            var collage = $('#collage');

            if(data.length>0) {

                // Destroy existing mixitup instance if exists
                try {
                    collage.mixItUp('destroy');
                }
                catch (err) {
                }

                var container = document.querySelector('[data-ref="container"]');

                data.forEach(function (item) {
                    var html = '<a class="mix" data-date="' + item.date;
                    if (displayMetaDataOnLightBox == true) {
                        html += '" data-title="' + item.title + ' - Acquired in ' + item.date;
                    }
                    html += '" data-lightbox="items" data-ref="item" data-lightbox="' + item._id + '"' +
                        ' href="' + item.thumbnail.slice(0, -5) + "10.jpg" + '"><img src="' +
                        item.thumbnail + '" data-bg="' + item.thumbnail +
                        '" data-title="' + item.title + '"/></a>';
                    collage.append(html);

                    // Load the img thumbnail and determine smallest image and this the max img width value for this data set.
                    var img = new Image();
                    img.src = item.thumbnail;
                    img.onload = function(){
                        if(this.width<maxImgWidth)
                            maxImgWidth = this.width;
                    }
                });

                mixitup(container, {
                    animation: {
                        animateResizeContainer: false,
                        effects: 'fade rotateX(-45deg) translateY(-10%)'
                    }
                });
            }

            var loadMore = $('#load-more');


            if ($('#collage > a').length == 0) {
                collage.html("<div>Nothing found</div>")
                loadMore.fadeOut();
            }
            // If there are no objects returned then remove the more button
            else if (data.length == 0) {
                loadMore.fadeOut();
            }
            else {
                count += data.length;
                loadMore.fadeIn();
            }
        });
    };
};

var bindColours = function(){
    $(document).ready(function () {
        var bgCol = $('#bgCol');
        var fntCol = $('#fntCol');

        if(bgCol) {
            $('body').css('background-color', bgCol.val());
            bgCol.on('keyup', function () {
                $('body').css('background-color', bgCol.val());
            });
            $('body').css('color', fntCol.val());
            fntCol.on('keyup', function () {
                $('body').css('color', fntCol.val());
            })
        }
    });

};
