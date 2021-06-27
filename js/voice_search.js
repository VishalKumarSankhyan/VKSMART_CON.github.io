const searchFormInput = document.querySelector("#mobile_search_Input");
const info = document.querySelector("#search_mice_info");

var voice_search_btn = mobile_search_mic_btn;
var mic_voice_btn = document.querySelector('.mobile_search_mic_btn');

var search_mice_btn = document.querySelector('.search_mice_btn');

mobile_voice_search_section = document.querySelector('.mobile_voice_search_section');
mobile_voice_search_sub_box = document.querySelector('.mobile_voice_search_sub_box');

mobile_voice_search_sub_box_full = document.querySelector('.mobile_voice_search_sub_box_full');

var speechresult = '';
var resulttimeout;

var voice_search_box_open_not = false;

var voice_search_support = false;


var voice_serach_var = 0;

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  voice_search_btn.style.display="block";
  voice_search_support = true;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  function open_voice_search_box() {

    mobile_voice_search_section.style.display = "block";
    mobile_voice_search_sub_box.style.display = "block";

    setTimeout(function(){
      //mobile_voice_search_sub_box
      mobile_voice_search_sub_box_full.classList.add('open');
      mobile_voice_search_section.classList.add('open');
    },1)
    setTimeout(function(){
      recognition.start();
    },260)
    voice_search_box_open_not = true;
  }

  function close_voice_search_box_herf() {
    history.back();
  }

  function close_voice_search_box() {
    //mobile_voice_search_sub_box
    mobile_voice_search_sub_box_full.classList.remove('open');
    mobile_voice_search_section.classList.remove('open');
    setTimeout(function(){
    mobile_voice_search_section .style.display = "none";
    mobile_voice_search_sub_box.style.display = "none";
    },255)
    recognition.stop();
    voice_search_box_open_not = false;
  }

  // voicesearch start stop
  function voice_search_start_stop() {
    if (search_mice_btn.classList.contains('open')) {
      recognition.stop();
    }
    else {
      try {
        recognition.start();
      }
      catch (err) {
        console.log()
      }

    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    console.log("Voice activated, SPEAK");
    info.innerHTML = "Listening...";
    mobile_voice_search_section.style.display = "block";
    mobile_voice_search_sub_box.style.display = "block";
    search_mice_btn.classList.add('open');

    clearTimeout(resulttimeout);
  }


  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {

    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('')

    info.innerHTML = transcript;
    speechresult = transcript;
  
    if (event.results[0].isFinal) {
      info.innerHTML = transcript;
      speechresult = transcript;
      search_mice_btn.classList.remove('open');
      recognition.stop();

      resulttimeout = setTimeout(function () {
        searchFormInput.value = transcript;
        //mobile_voice_search_section .style.display = "none";
        //mobile_voice_search_sub_box.style.display = "none";
        //close_voice_search_box_herf();
        history.back();
        searchFormInput.focus();
        get_search_value_mobile()
      }, 1500)
    }

  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {

    if (speechresult) {
      info.innerHTML = speechresult;
      speechresult = '';
    }
    else {
      info.innerHTML = "Try again";
      search_mice_btn.classList.remove('open');
    }
  }


}
else {
  console.log("Your Browser does not support speech Recognition");
  voice_search_btn.style.display = "none";
  voice_search_support = false;
  //info.innerHTML = "Your Browser does not support Speech Recognition";
}
