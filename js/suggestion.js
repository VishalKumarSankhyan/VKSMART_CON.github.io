/*---suggsetion add section start---*/
var suggestion = ["Anchor",
  "Aluminium ",
  "Asianpaint",
  "Acc Blocks",
  "Ambuja cement",
  "Aluminium Door",
  "Apollo Chaukhat",

  "Baja",
  "basin",
  "Brass",
  "Bosch",
  "bowl sink",
  "Best offers",
  "Bathroom tiles",

  "Cera",
  "Cement",
  "Chimney",
  "Chaukhat",
  "Cera basin",
  "Cera Brass",
  "Cera shower",
  "Cera shower Panel",
  "Corner Wall Shelf",

  "Door",
  "Dr Fixit",
  "door lock",
  "Dual Spout",
  "drainboard",
  "Door handle",
  "Deals of the Day",

  "Electric Fan",
  "Electric Switch",
  "Edison Screw Cap",
  "Electric Appliances",

  "Finolex",
  "Flooring",
  "Furniture",
  "Floor Tiles",

  "glanz",
  "godrej",
  "Granite",
  "Granite Sink",
  "Glass Window",

  "Hand Shower",
  "Hindware",
  "Havells",
  "Hollow core Doors",

  "Indian tiles",
  "Indian Switch",
  "Indian Bathroom",
  "Indian Kitchen",
  "Integrated sink",

  "Jsw",
  "Jaquar",
  "Jindal Panther",

  "Kitchen",
  "Kajaria",
  "Kitchen Tap",
  "Kitchen Tile",
  "Kitchen Chimney",
  "Kitchens Floor Tiles",

  "lever",
  "Light",
  "Legrand",
  "Luxury Tap",

  "Marble",
  "Mixer Tap",
  "Modern Tap",
  "Marble Sink",
  "Modern Light",
  "modern switches",

  "New tiles",
  "New Switch",
  "New Bathroom",
  "New Kitchen",

  "Other",
  "orient",

  "Panel",
  "Parryware",
  "Power Unit",

  "Quartz Sink",

  "Red Tile",
  "Red Paint",

  "Shink",
  "Socket",
  "Shower",
  "Steel Door",
  "Single bowl",
  "Steel Brass",
  "Shower Panel",
  "Single lever",
  "Steel Chaukhat",
  "Sink with drainboard",
  "Stainless Steel Sink",

  "Tap",
  "Tile",
  "Top Tap",
  "TV Socket",
  "Tata Steel",
  "Twin lever",
  "Towel holder",
  "Trending offers",
  "Top Mounted Chimney",

  "Unik",
  "UPVC Door",
  "USB Charger",
  "Undermount sink",
  "Ultratech Cement",

  "V",
  "V-mark",
  "Vinyl Door",
  "Valance lighting",

  "Wire",
  "Wood Door",
  "Water pipe",
  "Water pump",
  "Water tank",
  "Window lock",
  "White Cement",
  "Wood Chaukhat",
  "Wood flooring",
  "Wall Mounted Chimney",

  "X",

  "Y",

  "Z"

]
/*---suggsetion add section end---*/
add_search_history_data_with_suggestion()
function add_search_history_data_with_suggestion() {
  let history_numbers = parseInt(localStorage.getItem('history_number'));
  if (history_numbers) {
    for (let arr_all_search_historyindex = 1; arr_all_search_historyindex < history_numbers + 1; arr_all_search_historyindex++) {
      let search_history_arr = localStorage.getItem(("history_number" + arr_all_search_historyindex));

      let same_arr_index = suggestion.indexOf(search_history_arr);

      if (search_history_arr == suggestion[same_arr_index]) {

      }
      else {
        suggestion.push(search_history_arr)
      }
    }

  }
}

/*---suggsetion show section start---*/

var key_bord_detect = false;


//autocomplete(document.getElementById("myInput"), suggestion);
autocomplete(document.getElementById("mobile_search_Input"), suggestion);


var res = window.matchMedia("(max-width: 992px)")

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    // change auto complete max-width with js

    //resize_suggestion_box()

    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    //this.parentNode.appendChild(a);
    //mobile_search_suggestion_section.appendChild(a);

    this.parentNode.parentNode.appendChild(a);


    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/  /*i tag to make search icon */

        b.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"> </path> </svg>' + "<strong>" + arr[i].substr(0, val.length) + "</strong>";

        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          inp.focus();
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("oninput", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*
  inp.addEventListener("input",resize_suggestion_box)
  function resize_suggestion_box() {
    window.setTimeout(function () {
      if (res.matches) {
        if (key_bord_detect == true) {

          var MOBILE_suggestion_box_height = document.body.clientHeight;
          var mobile_search_suggestion_navbar_height = document.querySelector('.mobile_search_suggestion_navbar').offsetHeight;
          MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height - mobile_search_suggestion_navbar_height;

          MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height_info - 10;

          document.getElementById('mobile_search_Inputautocomplete-list').style.maxHeight = MOBILE_suggestion_box_height_info + "px";
        }
        else {

          var MOBILE_suggestion_box_height = document.body.clientHeight;
          var mobile_search_suggestion_navbar_height = document.querySelector('.mobile_search_suggestion_navbar').offsetHeight;
          MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height - mobile_search_suggestion_navbar_height;

          MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height_info - 2;

          document.getElementById('mobile_search_Inputautocomplete-list').style.maxHeight = MOBILE_suggestion_box_height_info + "px";
        }
      }
      else {
        document.getElementById('mobile_search_Inputautocomplete-list').style.maxHeight = "176px";
      }
    }, 2)
    
  }*/
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
/*---suggsetion show section end---*/

/*---clear search section start---*/
// for desktop
c1 = document.querySelector('.can1');

function getsearchvalue() {
  var searchval = document.getElementById("myInput").value;
  if (searchval) {
    c1.classList.add('open');
  }
  else {
    c1.classList.remove('open');
  }
}

function clearsearch() {
  document.getElementById("myInput").value = '';
  getsearchvalue()
}


// for mobile
mobile_search_clear_btn = document.querySelector('.mobile_search_clear_btn');
mobile_search_mic_btn = document.querySelector('.mobile_search_mic_btn');

var mobile_search_history_section = document.querySelector('.mobile_search_history_section');

function get_search_value_mobile() {
  var searchvalmobile = document.getElementById("mobile_search_Input").value;
  if (searchvalmobile && searchvalmobile != " ") {
    mobile_search_clear_btn.style.display = "block";
    if (voice_search_support) {
      mobile_search_mic_btn.style.display = "none";
    }

    mobile_search_history_section.style.display = "none";

  }
  else {
    mobile_search_clear_btn.style.display = "none";
    mobile_search_history_section.style.display = "block";
    if (voice_search_support) {
      mobile_search_mic_btn.style.display = "block";
    }
  }
}

function clear_mobile_search() {
  document.getElementById("mobile_search_Input").value = '';
  get_search_value_mobile()
  mobile_search_history_section.style.display = "block";
  delete_all_show_search_history()
  show_search_history()
}


document.getElementById('mobile_search_Input').addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {

    event.preventDefault();

    if (document.getElementById("mobile_search_Input").value && document.getElementById("mobile_search_Input").value != " ") {
      window.location.href = "#results";
      //store_search_history()
      try {
        document.getElementById('mobile_search_Inputautocomplete-list').remove();
      } catch (error) {

      }
      store_search_history()
      add_search_history_data_with_suggestion()
    }
  }
});




var same_parsent_positonin = 0;

function store_search_history() {
  var searched_term = document.getElementById("mobile_search_Input").value;

  //searched_term = searched_term.toLowerCase()

  if (searched_term) {

    if (localStorage.getItem('history_number')) {

      history_numbers = parseInt(localStorage.getItem('history_number'));

      for (let add_search_history_index = 1; add_search_history_index < history_numbers + 1; add_search_history_index++) {

        let local_storage_data_var = localStorage.getItem(("history_number" + add_search_history_index));

        if (local_storage_data_var.toLowerCase() == searched_term.toLowerCase()) {
          same_parsent_positonin = add_search_history_index;
          break;
        }

      }

      if (same_parsent_positonin) {
        same_parsent_positonin = 0;
      }

      else {
        history_numbers = history_numbers + 1;

        localStorage.setItem(("history_number" + history_numbers), searched_term)
        localStorage.setItem('history_number', history_numbers);

        delete_all_show_search_history()
        show_search_history()
      }

    }
    else {

      localStorage.setItem('history_number', '1');

      localStorage.setItem('history_number1', searched_term)
      delete_all_show_search_history()
      show_search_history()
    }
  }
}


function show_search_history() {
  var mobile_search_history_section = document.querySelector('.mobile_search_history_section');
  let history_numbers = parseInt(localStorage.getItem('history_number'));
  //console.log(history_numbers)

  if (history_numbers) {

    for (let searchindex = 1; searchindex < history_numbers + 1; searchindex++) {

      let search_hisory_data = localStorage.getItem(("history_number" + searchindex));

      if (search_hisory_data) {
        mobile_search_history_section.style.display = "block";
        mobile_search_history_section.insertAdjacentHTML('beforeend', `<div class="mobile_search_history_section_main" >
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="history"
          class="svg-inline--fa fa-history fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path fill="currentColor"
              d="M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z">
          </path>
        </svg>

        <div class="mobile_search_history_section_sub" id="search_select_index${searchindex}">${search_hisory_data}</div>

        <div class="mobile_search_history_delete" id="delete_search_history${searchindex}" class="mobile_search_history_delete">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z">
            </path>
          </svg>
        </div>`);

        var search_select_index_element_id = "search_select_index" + searchindex;
        var search_select_index_btn = document.getElementById(search_select_index_element_id)
        search_select_index_btn.addEventListener('click', select_search_history)

        var delete_element_id = "delete_search_history" + searchindex;
        var delete_history_btn = document.getElementById(delete_element_id)
        delete_history_btn.addEventListener('click', delete_search_history)
      }
    }

  }

  /*var MOBILE_suggestion_box_height = document.body.clientHeight;
  var mobile_search_suggestion_navbar_height = document.querySelector('.mobile_search_suggestion_navbar');

  window.setTimeout(function () {
    if (key_bord_detect == true) {
      MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height - mobile_search_suggestion_navbar_height.offsetHeight;
      MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height_info - 12;
      mobile_search_history_section.style.maxHeight = MOBILE_suggestion_box_height_info + "px";
    }
    else {
      MOBILE_suggestion_box_height_info = MOBILE_suggestion_box_height - mobile_search_suggestion_navbar_height.offsetHeight;
      mobile_search_history_section.style.maxHeight = MOBILE_suggestion_box_height_info + "px";
    }
  }, 2);*/


}

function select_search_history() {
  select_search_history_element_idex = this.id;
  document.getElementById("mobile_search_Input").value = document.getElementById(select_search_history_element_idex).innerText;
  get_search_value_mobile()
  document.getElementById("mobile_search_Input").focus();
}

function delete_search_history() {
  delete_element_idex = this.id;
  delete_element_idex = delete_element_idex.match(/\d/g);
  delete_element_idex = delete_element_idex.join("");
  delete_element_idex = parseInt(delete_element_idex);
  localStorage.setItem(("history_number" + delete_element_idex), '');

  delete_all_show_search_history();
  show_search_history();
}

function delete_all_show_search_history() {
  var mobile_search_history_section = document.querySelector('.mobile_search_history_section');
  var mobile_search_suggestion_section = document.querySelector('.mobile_search_suggestion_section');

  mobile_search_history_section.style.display = "none";
  mobile_search_history_section.remove();
  mobile_search_suggestion_section.insertAdjacentHTML('beforeend', `<div class="mobile_search_history_section"></div>`);
}

function clear_all_search_history() {
  let history_numbers = parseInt(localStorage.getItem('history_number'));
  if (history_numbers) {
    for (let clear_all_search_historyindex = 1; clear_all_search_historyindex < history_numbers; clear_all_search_historyindex++) {
      localStorage.clear(("history_number" + clear_all_search_historyindex));
    }
    localStorage.clear('history_number');
  }

}

document.getElementById("mobile_search_Input").addEventListener('input', function () {
  var mobile_search_history_section = document.querySelector('.mobile_search_history_section');
  if (document.getElementById("mobile_search_Input").value && document.getElementById("mobile_search_Input").value != " ") {
    mobile_search_history_section.style.display = "none";
  }

  else {
    if (mobile_search_history_section.children[0]) {
      mobile_search_history_section.style.display = "block";
    }
  }
})
// open suggestbox
var mobile_search_suggestion_section = document.querySelector('.mobile_search_suggestion_section');

var suggestionbox_open_not = false;

function opensuggestionbox() {

  mobile_search_suggestion_section.style.display = "block";
  //document.body.scrollTop = 0;

  setTimeout(function(){
    mobile_search_suggestion_section.classList.add("open")
  },1)

  // disable scroll start
  document.body.style.overflow = 'hidden';
  document.body.classList.add('scroll_hiden');

  var scroll_top_position = window.pageXOffset || document.documentElement.scrollTop;
  var scroll_left_position = window.pageYOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scroll_left_position, scroll_top_position);

  };
  // disable scroll end

  setTimeout(function(){
    document.getElementById("mobile_search_Input").focus();
  },350)

  delete_all_show_search_history()
  show_search_history()
  //suggestionbox_open_not = true;
}
// close suggestbox

function opensuggestionboxexit_herf() {
  history.back();
}

function opensuggestionboxexit() {
  mobile_search_suggestion_section.classList.remove("open")

  setTimeout(function(){
    mobile_search_suggestion_section.style.display = "none";
  },350)
  //mobile_search_suggestion_section.style.display = "none";

  // enable scroll start
  document.body.style.overflow = '';
  document.body.classList.remove('scroll_hiden');
  window.onscroll = function () { };
  reset_scroll_functions()
  // enable scroll end
  suggestionbox_open_not = false;
}
/* mobile suggestion start function end */
/*
window.addEventListener('resize', function (e) {
  if ($(document.getElementById('mobile_search_Input')).is(':focus')) {
    key_bord_detect = true;
  }
  else {
    key_bord_detect = false;
  }
  delete_all_show_search_history()
  show_search_history()

})

*/

