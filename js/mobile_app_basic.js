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


window.addEventListener('backward',function(e){
    var herf_post = e.detail.post;

    herf_post = herf_post.split('#')
    herf_post = herf_post[1]
    
    if(herf_post == 'menu'){
        tssClose();
    }

    if(herf_post == 'search'){
        opensuggestionboxexit();
    }

    if(herf_post == 'voice'){
        close_voice_search_box();
    }

    if(herf_post == 'results'){
        
    }

    if(herf_post == 'notification'){
        opennotificationboxexit()
    }

    if(herf_post == 'cart'){
        opencartboxexit()
    }
    
});
