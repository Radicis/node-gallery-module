var extJs = function(itemCount, displayMetaDataOnLightBox) {

    var count = itemCount;
    var searchString = "";

    $(document).ready(function () {

        $(window).scroll(function () {
            if ($(window).scrollTop() > 131) {
                $('#controls').addClass('fixed');
                $('#collage').addClass('margin-top');
            }
            if ($(window).scrollTop() < 130 && $('#controls').hasClass('fixed')) {
                $('#controls').removeClass('fixed');
                $('#collage').removeClass('margin-top');
            }
        });

        if ($('#collage').length > 0) {

            $('#load-more').click(function () {
                AppendMix();
            });

            CreateMix(0);
        }
    });


//setup before functions
    var typingTimer;                //timer identifier
    var doneTypingInterval = 1000;  //time in ms, 5 second for example
    var $input = $('#search');

//on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

//on keydown, clear the countdown
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    var doneTyping = function () {
        searchString = $('#search').val();
        CreateMix();
    };

    var CreateMix = function () {

        var params = {
            count: 24,
            search: searchString,
            skip: 0
        };

        // Clear existing items
        $('#collage').html("");

        Populate(params);
    };


    var AppendMix = function () {

        var params = {
            count: itemCount,
            search: searchString,
            skip: count
        };

        Populate(params);
    };

    var Populate = function (params) {

        $.post("http://localhost:3030/object", params, function (data) {

            var collage = $('#collage');

            // Destroy existing mixitup instance if exists
            try {
                collage.mixItUp('destroy');
            }
            catch (err) {
            }

            var container = document.querySelector('[data-ref="container"]');

            data.forEach(function (item) {
                var html = '<a class="mix" data-date="' + item.date;
                if(displayMetaDataOnLightBox==true) {
                    html += '" data-title="' + item.title + ' - ' + item.date;
                }
                html+= '" data-lightbox="items" data-ref="item" data-lightbox="' + item._id + '"' +
                    ' href="' + item.thumbnail.slice(0, -5) + "10.jpg" + '"><img src="' +
                    item.thumbnail + '" data-bg="' + item.thumbnail +
                    '" data-title="' + item.title + '"/></a>';
                collage.append(html);
            });

            mixitup(container, {
                animation: {
                    animateResizeContainer: false,
                    effects: 'fade rotateX(-45deg) translateY(-10%)'
                }
            });

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
