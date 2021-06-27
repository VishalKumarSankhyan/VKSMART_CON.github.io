/*
  * Author: Vishal Kumar Sankhyan
  * Under MIT License
  
  * Detect history chage on history.pushState && history.replaceState

  * Detect "backward" | "forward" | "double click back"

  * EventLisntener historychange
  * EventLisntener forward
  * EventLisntener backward
  * EventLisntener doubleclickback
 
  * Get pre herf
  * Get current herf
  * Get post  herf
  * Get status
  * Get length
*/

// CustomEvent
(function () {
  if (typeof window.CustomEvent === "function") return false;
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  window.CustomEvent = CustomEvent;

})();

(function () {
  let previous_history = window.location.href;

  setInterval(function () {
    if (previous_history != window.location.href) {
      var event_data = {
        pre: previous_history,
        current: window.location.href
      }
      window.dispatchEvent(new CustomEvent('historychange', { bubbles: true, cancelable: true, detail: event_data }))
      previous_history = window.location.href;
    }
  });

})();

(function () {
  history_states = [];
  event_states = [];
  let states_length = null;
  let history_states_index = null;
  let history_states_item = null;
  let pre = null;
  let current = null;
  let post = null;
  var double_count = 0;
  var double_timeout;

  history_states.push(window.location.href);

  window.addEventListener('historychange', function () {

    if (history_states[0]) {

      history_states_item = window.location.href;
      history_states_index = history_states.indexOf(history_states_item);

      states_length = history_states.length;

      if (history_states[history_states_index]) {
      }
      else {
        history_states.push(history_states_item);
      }

      history_states_index = history_states.indexOf(history_states_item);

      if (history_states_index == 0) {
        pre = history_states[history_states_index - 1];
        current = history_states[history_states_index];
        post = history_states[1];
      }
      else {
        pre = history_states[history_states_index - 1];
        current = history_states[history_states_index];
        post = history_states[history_states_index + 1];
      }
    }

    // for forward  
    if (history_states.indexOf(pre) < history_states.indexOf(current) && history_states.indexOf(post) == -1 && history_states_index > states_length - 1) {
      eventType = 'forward';
    }

    // for backward  
    if (history_states.indexOf(pre) < history_states.indexOf(current) < history_states.indexOf(post) && history_states_index < states_length) {
      eventType = 'backward';
      history_states.pop();
      ++double_count

      clearTimeout(double_timeout);

      if (double_count == 2) {
        eventType = 'doubleclickback';
      }

      double_timeout = setTimeout(function () {
        double_count = 0;
      }, 550);
    }

    // for backward  
    if (history_states.indexOf(pre) == -1 && history_states.indexOf(current) < history_states.indexOf(post) && history_states_index < states_length) {
      eventType = 'backward';
      history_states.pop();
      ++double_count

      clearTimeout(double_timeout);

      if (double_count == 2) {
        eventType = 'doubleclickback';
      }

      double_timeout = setTimeout(function () {
        double_count = 0;
      }, 550);
    }
    event_states = [];
    event_states.push(pre)
    event_states.push(current)
    event_states.push(post)

    var eventData = {
      dir: eventType,
      pre: pre,
      current: current,
      post: post,
      status: event_states,
      length: event_states.length
    };

    window.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }))
    previous_history = window.location.href;

  });
})
  ();

/******************************************************************
                        addEventLisnteners
          addEventListener('historychange',function(e){});
          addEventListener('forward', function(e){});
          addEventListener('backward', function(e){});
          addEventListener('doubleclickback' ,function(){});
******************************************************************/

/**
 * @param e.detail.dir        "backward" | "forward" | "doubleclickback"
 * @param e.detail.pre         url
 * @param e.detail.current     url
 * @param e.detail.post        url
 * @param e.detail.status     [url]
 * @param e.detail.length     length
 */