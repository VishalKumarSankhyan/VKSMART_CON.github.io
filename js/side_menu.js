(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.TouchSideSwipe = factory();
    }
}(this, function () {
    var TouchSideSwipe = function (config) {
        'use strict';
        //------------------------------------------------------------------
        var opt = { //default options
            elInitID: config.elementID || 'touchSideSwipe',
            elSubmainWidth: config.elementWidth || 400, //px
            elSubmainMaxWidth: config.elementMaxWidth || 0.8, // *100%
            sideHookWidth: config.sideHookWidth || 44, //px
            moveSpeed: config.moveSpeed || 0.1, //sec
            opacityBackground: config.opacityBackground || 0.8,
            shiftForStart: config.shiftForStart || 50, // px
            windowMaxWidth: config.windowMaxWidth || 992, // px
        };
        //------------------------------------------------------------------
        var winInnerWidth = window.innerWidth;
        var touchstartCoordX;
        var touchmoveCoordX;
        var open;
        var elMainCoordX0;
        var elInit;
        var elMain;
        var elSubmain;
        //var elLabel;
        var elBg;
        var elSubmainWidth;
        var elMainWidth;
        var init = false;

        //------------------------------------------------------------------
        // create, define, customize initial elements and states
        //------------------------------------------------------------------
        function tssInitStates() {
            init = true;
            //-------------------------------
            // create DOM-elements: main-wrapper, sub-wrapper, label, background
            //-------------------------------
            elInit = document.getElementById(opt.elInitID);
            elMain = document.createElement('div');
            elSubmain = document.createElement('div');
            //elLabel = document.createElement('div');
            //elLabel.innerHTML = '<div class="tss-label_pic"></div>';
            elBg = document.createElement('div');
            //-------------------------------

            //-------------------------------
            // wrap initial-elem in main in submain, add bg in body
            elMain.appendChild(elSubmain);
            //elSubmain.appendChild(elLabel);
            elInit.parentNode.insertBefore(elMain, elInit);
            elSubmain.appendChild(elInit);
            document.body.insertBefore(elBg, document.body.lastChild);
            //-------------------------------

            //-------------------------------
            // css classes for customize
            //-------------------------------
            elMain.classList = 'tss';
            elSubmain.classList = 'tss-wrap';
            //elLabel.classList = 'tss-label';
            elBg.classList = 'tss-bg';
            //-------------------------------

            //-------------------------------
            // create first style parameters: width and state wrapped DOM-element
            //-------------------------------
            if (winInnerWidth > 499) {
                elSubmainWidth = opt.elSubmainWidth;
            } else {
                elSubmainWidth = winInnerWidth * opt.elSubmainMaxWidth;
            }
            elSubmain.style.width = elSubmainWidth + 'px';
            elMainWidth = elSubmainWidth + opt.sideHookWidth;
            elMain.style.transitionDuration = opt.moveSpeed + 's';
            elBg.style.transitionDuration = opt.moveSpeed + 's';
            //-------------------------------
            tssClose();
            //tssClose_herf();
        }
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // recalc parameters on resize window
        //------------------------------------------------------------------
        function tssRecalcStates() {
            if (open === true) {
                //tssClose();
                tssClose_herf();
            }
            winInnerWidth = window.innerWidth;
            if (winInnerWidth > 499) {
                elSubmainWidth = opt.elSubmainWidth;
            } else {
                elSubmainWidth = winInnerWidth * opt.elSubmainMaxWidth;
            }
            elMainWidth = elSubmainWidth + opt.sideHookWidth;
            elSubmain.style.width = elSubmainWidth + 'px';
            elMain.style.transform = 'translateX(' + (-elSubmainWidth) + 'px)';
            elMain.style.width = elMainWidth + 'px';
        }
        //------------------------------------------------------------------


        //------------------------------------------------------------------
        // start touch-event (use states from tssInitStates, tssRecalcStates)
        //------------------------------------------------------------------
        function tssTouchstart(event) {
            // disable scroll start
            document.body.style.overflow = 'hidden';
            document.body.classList.add('scroll_hiden');

            var scroll_top_position = window.pageXOffset || document.documentElement.scrollTop;
            var scroll_left_position = window.pageYOffset || document.documentElement.scrollLeft;

            window.onscroll = function () {
                window.scrollTo(scroll_left_position, scroll_top_position);
            };
            // disable scroll end

            elMain.style.transitionDuration = '0s';
            elBg.style.transitionDuration = '0s';
            //elBg.style.zIndex = 99999;
            elMainCoordX0 = elMain.getBoundingClientRect().left;
            touchstartCoordX = event.changedTouches[0].clientX;
        }
        //------------------------------------------------------------------


        //------------------------------------------------------------------
        // Drag element (use states from tssInitStates, tssRecalcStates, tssTouchstart)
        //------------------------------------------------------------------

        var sidenavbar_scroll_main = document.querySelector('.mobile_side_menu');
        var sidenavbar_scroll_sub = document.querySelector('.mobile_sub_menu');
        var stop_slide_move = 0;
        var stop_slide_bg = 0;
        var scroll_timer;

        sidenavbar_scroll_main.addEventListener('scroll', scroll_started, false);
        sidenavbar_scroll_sub.addEventListener('scroll', scroll_started, false);

        sidenavbar_scroll_main.addEventListener('scroll', scroll_stoped, false);
        sidenavbar_scroll_sub.addEventListener('scroll', scroll_stoped, false);

        function scroll_started() {
            stop_slide_move = 1;
            stop_slide_bg = 1;
            //console.log("scroll started")

        }


        function scroll_stoped() {
            clearTimeout(scroll_timer);

            scroll_timer = setTimeout(function () {
                stop_slide_move = 0;
                stop_slide_bg = 0;
                //console.log("scroll stoped")
            }, 620);
        }



        function tssTouchmove(event) {
            touchmoveCoordX = event.changedTouches[0].clientX;
            var elMainCoordX0New = touchmoveCoordX - (touchstartCoordX - elMainCoordX0);

            if ((elMainCoordX0New) <= 0) { // swipe touchmove < elSubmainWidth
                if (touchstartCoordX > elSubmainWidth) { //if opened and touchstart over elSub
                    elMainCoordX0New = elMainCoordX0New + (touchstartCoordX - elSubmainWidth);
                }
                if (touchmoveCoordX <= elSubmainWidth) {

                    if (stop_slide_move) {
                        elMain.style.transform = 'translateX(' + 0 + 'px)';
                        elBg.style.opacity = opt.opacityBackground;
                    }
                    else {
                        elMain.style.transform = 'translateX(' + elMainCoordX0New + 'px)';
                    }
                }
                var elBgOpacity = touchmoveCoordX / elSubmainWidth;
                if (elBgOpacity > 0 && elBgOpacity < 1) {
                    if (stop_slide_bg) {
                        elBg.style.opacity = opt.opacityBackground;
                    }
                    else if (elBgOpacity >= opt.opacityBackground) {
                        elBg.style.opacity = opt.opacityBackground;
                    } else {
                        elBg.style.opacity = elBgOpacity;
                    }
                }
            }
        }

        //------------------------------------------------------------------


        //------------------------------------------------------------------
        // end touch-event (use states from tssInitStates, tssRecalcStates, tssTouchmove)
        //------------------------------------------------------------------
        function tssTouchend(event) {
            var touchendCoordX = event.changedTouches[0].clientX;
            // disable scroll start
            document.body.style.overflow = 'hidden';
            document.body.classList.add('scroll_hiden');

            var scroll_top_position = window.pageXOffset || document.documentElement.scrollTop;
            var scroll_left_position = window.pageYOffset || document.documentElement.scrollLeft;

            window.onscroll = function () {
                window.scrollTo(scroll_left_position, scroll_top_position);
            };
            // disable scroll end

            elMain.style.transitionDuration = opt.moveSpeed + 's'; //todo: перетащить в open/close
            elBg.style.transitionDuration = opt.moveSpeed + 's';
            if (!open && touchendCoordX > touchstartCoordX) {
                if (Math.abs(touchstartCoordX - touchendCoordX) > opt.shiftForStart) {
                    tssOpen();
                } else {
                    //tssClose();
                    tssClose_herf();
                }
            } //touchendCoordX!==touchstartCoordX, equal for click event
            else if (!open && touchendCoordX < touchstartCoordX) { // if not opened and drag move left 
                //tssClose();
                tssClose_herf()
            }
            // elSubmainWidth/2 > touchendCoordX
            else if (open && (touchendCoordX < touchstartCoordX) && (touchendCoordX <= elSubmainWidth)) {
                if ((elSubmainWidth / 3 >= touchendCoordX)) {
                    //tssClose();
                    tssClose_herf();
                }
                else {
                    tssOpen();
                }
            }
            else {
                elMain.style.transitionDuration = 0 + 's';
                elBg.style.transitionDuration = 0 + 's';
                tssOpen();
            }
        }
        //------------------------------------------------------------------


        //------------------------------------------------------------------
        // open/close on click label-element
        //------------------------------------------------------------------
        /*function elLabelClick(event) {
            event.stopPropagation();
            if (open === false) {
                tssOpen();
            } else {
                tssClose();
            }
        }*/

        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // open/close on click background-element
        //------------------------------------------------------------------
        function elBgClick(event) {
            event.stopPropagation();
            var elMainCoordX0ForClick = elMain.getBoundingClientRect().left;
            if (event.clientX > (elMainCoordX0ForClick + elSubmainWidth)) {
                //tssClose();
                tssClose_herf();
            }
        }

        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // change states on Open
        //------------------------------------------------------------------
        //var menu_scroll_top = document.querySelector('.l-navbar-2');

        window.tssOpen = function() {
            elBg.style.display = "block";
            // disable scroll start
            document.body.style.overflow = 'hidden';
            document.body.classList.add('scroll_hiden');

            var scroll_top_position = window.pageXOffset || document.documentElement.scrollTop;
            var scroll_left_position = window.pageYOffset || document.documentElement.scrollLeft;

            window.onscroll = function () {
                window.scrollTo(scroll_left_position, scroll_top_position);
            };
            // disable scroll end
            elBg.style.zIndex ='99';
            elBg.style.opacity = opt.opacityBackground;
            elMain.style.width = winInnerWidth + 'px';
            elMain.style.transform = 'translateX(0px)';
            elMain.classList.remove('tss--close');
            elMain.classList.add('tss--open');
            elBg.classList.remove('tss-bg--close');
            elBg.classList.add('tss-bg--open');
            open = true;

        }

        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // change states on Close
        //------------------------------------------------------------------

        //function tssClose() {
        function tssClose_herf() {
                history.back();
        }
        
        window.tssClose = function(){
            elBg.style.display = "none";
            // enable scroll start
            document.body.style.overflow = '';
            document.body.classList.remove('scroll_hiden');
            window.onscroll = function() {};
            reset_scroll_functions()
            // enable scroll end

            elBg.style.opacity = 0;
            elMain.style.width = elMainWidth + 'px';
            //elMain.style.transform = 'translateX(' + (-elSubmainWidth) + 'px)';
            elMain.style.transitionDuration = opt.moveSpeed + 's';
            elMain.style.transform = 'translateX(' + -100 + '%)';
            elMain.classList.remove('tss--open');
            elMain.classList.add('tss--close');
            elBg.classList.remove('tss-bg--open');
            elBg.classList.add('tss-bg--close');
            elBg.style.zIndex = '0';
            open = false;
            sidenavbar_scroll_main.scrollTop = 0;
            sidenavbar_scroll_sub.scrollTop = 0;
        }
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        /* -------burger btn open sidemenu -------*/
        //-----------------------------------------------------------------

        var mobile_hamburger = document.querySelector('.mobile_hamburger')

        var mobile_side_menu = document.querySelector('.mobile_side_menu');
        var mobile_main_menu = document.querySelector('.mobile_main_menu')
        var mobile_sub_menu = document.querySelector('.mobile_sub_menu');


        mobile_hamburger.addEventListener('click', () => {
            tssOpen();
            set_height_slide_menu()
        })

        let old_height = document.body.clientHeight;
        let old_width = document.body.clientWidth;

        function check_height_width_change() {
            let new_height = document.body.clientHeight;
            let new_width = document.body.clientWidth;

            if (old_height != new_height || old_width != new_width) {
                set_height_slide_menu()
            }
        }

        setInterval(check_height_width_change, 100)


        function set_height_slide_menu() {
            var sub_menu_height = mobile_side_menu.clientHeight - mobile_main_menu.clientHeight;//.offsetHeight)
            mobile_sub_menu.style.height = sub_menu_height + 'px';
        }
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        /*------- swipe left to close menu -------*/
        //------------------------------------------------------------------


        /*
        var side_navbar_menu = document.querySelector('#touchSideSwipe')

        window.onload = function () {
            side_navbar_menu.addEventListener('swiped-left', function (e) {
                tssClose()
            });

        }
        */


        //------------------------------------------------------------------

        /*--function to detect left , right swipe end ---*/

        //------------------------------------------------------------------
        // tssClear (for large-width windows)
        //------------------------------------------------------------------
        function tssClear() {
            if ((elMain && elBg) != undefined) {
                elMain.parentNode.insertBefore(elInit, elMain);
                elMain.remove();
                elBg.remove();
                init = false;
            }
        }
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // winOnresizeEngine (if change width of window)
        //------------------------------------------------------------------
        function winOnresizeEngine(event) {
            winInnerWidth = window.innerWidth;
            if (winInnerWidth < opt.windowMaxWidth && !init) {
                tssActionsEngine();
            } else if (winInnerWidth >= opt.windowMaxWidth && init) {
                tssClear();
            }
        }
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // set of listeners and states
        //------------------------------------------------------------------
        function tssActionsEngine() {
            if (winInnerWidth < opt.windowMaxWidth && !init) {
                tssInitStates();
                //window.addEventListener('resize', tssRecalcStates, false);
                elMain.addEventListener('touchstart', tssTouchstart, false);
                elMain.addEventListener('touchmove', tssTouchmove, false);
                elMain.addEventListener('touchend', tssTouchend, false);
                elMain.addEventListener('click', elBgClick, false);
                //elLabel.addEventListener('click', elLabelClick, false);
            }
            // window.addEventListener('resize', winOnresizeEngine, false);
        }
        //------------------------------------------------------------------

        //------------------------------------------------------------------
        // aaaand actioooon!
        //------------------------------------------------------------------
        tssActionsEngine();

        //public functions
        var returnTssOpen;
        var returnTssClose;
        function tssRecalcApi() {// if not mobile window width
            if (winInnerWidth > opt.windowMaxWidth) {
                var returnTssFailed = '(touch-sideswipe) cant use when window inner width > ' + opt.windowMaxWidth + 'px (your actual option windowMaxWidth). Please, add the condition here.';
                returnTssOpen = function () { console.log('tssOpen ' + returnTssFailed) };
                returnTssClose = function () { console.log('tssClose ' + returnTssFailed) };
            }
            else {
                returnTssOpen = tssOpen;
                returnTssClose = tssClose;
                
            }
        }
        tssRecalcApi();
        window.addEventListener('resize', tssRecalcApi, false);

        return {
            tssOpen: returnTssOpen,
            tssClose: returnTssClose
        }

    };
    return TouchSideSwipe;
}));



//------------------------------------------------------------------
/*--function to detect left , right swipe start---*/
//------------------------------------------------------------------


(function (window, document) {

    'use strict';

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    /**
     * Fires swiped event if swipe detected on touchend
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchEnd(e) {

        // if the user released on a different target, cancel!
        if (startEl !== e.target) return;

        var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
        var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10);    // default 500ms
        var timeDiff = Date.now() - timeDown;
        var eventType = '';
        var changedTouches = e.changedTouches || e.touches || [];

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (yDiff > 0) {
                eventType = 'swiped-up';
            }
            else {
                eventType = 'swiped-down';
            }
        }

        if (eventType !== '') {

            var eventData = {
                dir: eventType.replace(/swiped-/, ''),
                xStart: parseInt(xDown, 10),
                xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
                yStart: parseInt(yDown, 10),
                yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
            };

            // fire `swiped` event event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));

            // fire `swiped-dir` event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
        }

        // reset values
        xDown = null;
        yDown = null;
        timeDown = null;
    }

    /**
     * Records current location on touchstart event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    /**
     * Records location diff in px on touchmove event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

    /**
     * Gets attribute off HTML element or nearest parent
     * @param {object} el - HTML element to retrieve attribute from
     * @param {string} attributeName - name of the attribute
     * @param {any} defaultValue - default value to return if no match found
     * @returns {any} attribute value or defaultValue
     */
    function getNearestAttribute(el, attributeName, defaultValue) {

        // walk up the dom tree looking for data-action and data-trigger
        while (el && el !== document.documentElement) {

            var attributeValue = el.getAttribute(attributeName);

            if (attributeValue) {
                return attributeValue;
            }

            el = el.parentNode;
        }

        return defaultValue;
    }

}(window, document));
//------------------------------------------------------------------
