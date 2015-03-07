function Game() {

    this.start = function () {
        var square = new Square(document.getElementById("square"));
        bindEventsToSquare(square);
    };

    var bindEventsToSquare = function (square) {

        console.debug(square);

        $(square).bind('squareStart', function () {
            console.debug("square start.");

            square.startMove();
        });

        $(square).bind('squareStop', function () {
            console.debug("square stop.");

            square.stop();
            alert("you lose");
        });
    };
}

function Square(dom, options) {
    if (!dom instanceof HTMLElement) {
        throw Error("A DOM element must be passed to Square.");
    }

    var self = this;

    var element = dom;

    var defaultProps = {
        x: 100,
        y: 100,
        height: 100,
        width: 100,
        stopBgColor: 'grey',
        movingBgColor: 'black'
    };

    $.extend(defaultProps, options); //merge options and modify defaultProps, allow to add property

    var bgColor;
    var startX;
    var startY;
    var x;
    var y;
    var height;
    var width;
    var deltaX;
    var deltaY;

    var refreshIntervalId;

    var init = function () {
        reset();
        refresh();
        bindEvents();
    };

    var reset = function () {
        bgColor = defaultProps.stopBgColor;
        startX = defaultProps.x;
        startY = defaultProps.y;
        x = startX;
        y = startY;
        height = defaultProps.height;
        width = defaultProps.width;
        deltaX = 3;
        deltaY = 3;
    };

    var refresh = function () {
        $(element).css({
            'margin-left': x + 'px',
            'margin-top': y + 'px',
            'height': height + 'px',
            'width': width + 'px',
            'background-color': bgColor
        });
    };

    var bindEvents = function () {
        $(element).hover(function () {
            console.debug("square hover in.");
            $(self).trigger('squareStart');
        }, function () {
            console.debug("square hover out.");
            $(self).trigger('squareStop');
        });
    };

    this.startMove = function () {
        bgColor = defaultProps.movingBgColor;
        refreshIntervalId = setInterval(move, 50);
    };

    var move = function () {
        x += deltaX;
        y += deltaY;

        height -= 1;
        width -= 1;

        height = Math.max(height, 50);
        width = Math.max(width, 50);

        refresh();
    };

    this.stop = function () {
        clearInterval(refreshIntervalId);
        reset();
        refresh();
    };

    init();
}