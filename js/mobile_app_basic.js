mobile_navbar = document.querySelector('.mobile_navbar');

reset_scroll_functions()

function reset_scroll_functions() {
    window.onscroll = function () { scrollFuncion() };
}

function scrollFuncion() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        mobile_navbar.classList.add('scrolling');
    }
    else {
        mobile_navbar.classList.remove('scrolling');
    }
}

var mobile_notification_section = document.querySelector('.mobile_notification_section');
var notificationbox_open_not = false;
function opennotificationbox() {
    mobile_notification_section.style.display = "block";

    setTimeout(function () {
        mobile_notification_section.classList.add("open")
    }, 1)

    // disable scroll start
    document.body.style.overflow = 'hidden';
    document.body.classList.add('scroll_hiden');

    var scroll_top_position = window.pageXOffset || document.documentElement.scrollTop;
    var scroll_left_position = window.pageYOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scroll_left_position, scroll_top_position);
    };
    // disable scroll end
    notificationbox_open_not = true;
}

function opennotificationboxexit_herf() {
    history.back();
}

function opennotificationboxexit() {
    mobile_notification_section.classList.remove("open")
    setTimeout(function () {
        mobile_notification_section.style.display = "none";
    }, 255)
    // enable scroll start
    document.body.style.overflow = '';
    document.body.classList.remove('scroll_hiden');
    window.onscroll = function () { };
    reset_scroll_functions()
    // enable scroll end
    notificationbox_open_not = false;
}



var mobile_cart_section = document.querySelector('.mobile_cart_section');
var cart_box_open_not = false;
function opencartbox() {
    mobile_cart_section.style.display = "block";
    setTimeout(function () {
        mobile_cart_section.classList.add("open")
    }, 1)

    // disable scroll start
    document.body.style.overflow = 'hidden';
    document.body.classList.add('scroll_hiden');

    var scroll_top_position = window.pageXOffset || document.documentElement.scrollTop;
    var scroll_left_position = window.pageYOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scroll_left_position, scroll_top_position);
    };
    // disable scroll end
    cart_box_open_not = true;
}

function opencartboxexit_herf() {
    history.back();
}

function opencartboxexit() {
    mobile_cart_section.classList.remove("open")
    setTimeout(function () {
        mobile_cart_section.style.display = "none";
    }, 255)
    // enable scroll start
    document.body.style.overflow = '';
    document.body.classList.remove('scroll_hiden');
    window.onscroll = function () { };
    reset_scroll_functions()
    // enable scroll end

    //window.location.href= first_url_page;
    cart_box_open_not = false;
}

history_state_arr = [];

var history_length_negative = 0;

if (history.length != 1) {
    console.log("open in new tab")
    history_length_negative = history.length;
    --history_length_negative

}
else {
    console.log("reidircted")
}

history_state_arr.push(window.location.href);

window.addEventListener('popstate', function () {

    if (history_state_arr[0]) {

        let history_state_arr_item = window.location.href;

        let history_state_arr_index = history_state_arr.indexOf(history_state_arr_item);

        post_herf = history_state_arr[history_state_arr_index + 1];
        current_herf = history_state_arr[history_state_arr_index];
        pre_herf = history_state_arr[history_state_arr_index - 1];

        if (history_state_arr[history_state_arr_index]) {
            //console.log("already exist " + history_state_arr[history_state_arr_index])

            //console.warn("backward")

            //console.log("post_herf "+post_herf);
            //console.log("current_herf "+current_herf);
            //console.log(" pre_herf "+ pre_herf);
            try {
                if (post_herf.includes("menu")) {
                    //console.log("close menu")
                    tssClose();
                }

                if (post_herf.includes("search")) {
                    //console.log("close search")
                    opensuggestionboxexit();
                }

                if (post_herf.includes("voice")) {
                    //console.log("close voice")
                    close_voice_search_box();
                }

                if (post_herf.includes("results")) {
                    //console.log("close results")

                }

                if (post_herf.includes("notification")) {
                    //console.log("close notification")
                    opennotificationboxexit();
                }

                if (post_herf.includes("cart")) {
                   //console.log("close cart")
                    opencartboxexit();
                }
            }
            catch {

            }


            if (history_state_arr_item == history_state_arr[0]) {
                //console.log("main")
                history_state_arr = [];
                history_state_arr.push(history_state_arr_item);
            }
        }

        else {
            //console.log("new entery" + history_state_arr_item)
            //console.warn("forward")
            history_state_arr.push(history_state_arr_item);

        }
    }
    //console.log(history_state_arr)
});