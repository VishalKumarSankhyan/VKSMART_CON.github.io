/*
  * Author: Vishal Kumar Sankhyan
  * Free for Personal Use
  
  * Detect history chage on history.pushState && history.replaceState
  * Detect "backward" | "forward" | "double click back"

  * EventLisntener for historychange
  * EventLisntener for forward
  * EventLisntener for backward
  * EventLisntener for doubleclickback
 
  * Get pre herf
  * Get current herf
  * Get post  herf
  * Get status
  * Get length
*/

/* -------------------------------------------------- CustomEvent -------------------------------------------------- */
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
      event_type = 'historychange';
      var event_data = {
        type: event_type,
        pre: previous_history,
        current: window.location.href
      }
      previous_history = window.location.href;
      window.dispatchEvent(new CustomEvent(event_type, { bubbles: true, cancelable: true, detail: event_data }))
    }
  });
})();

(function () {
  history_status = [];
  event_status = [];
  let status_length = null;
  let history_status_index = null;
  let history_status_item = null;
  let pre = null;
  let current = null;
  let post = null;
  var double_count = 0;
  var double_timeout;

  history_status.push(window.location.href);

  window.addEventListener('historychange', function () {

    if (history_status[0]) {

      history_status_item = window.location.href;
      history_status_index = history_status.indexOf(history_status_item);

      status_length = history_status.length;

      if (history_status[history_status_index]) {
      }
      else {
        history_status.push(history_status_item);
      }

      history_status_index = history_status.indexOf(history_status_item);

      if (history_status_index == 0) {
        pre = history_status[history_status_index - 1];
        current = history_status[history_status_index];
        post = history_status[1];
      }
      else {
        pre = history_status[history_status_index - 1];
        current = history_status[history_status_index];
        post = history_status[history_status_index + 1];
      }
    }
    // for forward  
    if (history_status.indexOf(pre) < history_status.indexOf(current) && history_status.indexOf(post) == -1 && history_status_index > status_length - 1) {
      eventType = 'forward';
    }
    // for backward  
    if (history_status.indexOf(pre) < history_status.indexOf(current) < history_status.indexOf(post) && history_status_index < status_length) {
      eventType = 'backward';
      history_status.pop();
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
    if (history_status.indexOf(pre) == -1 && history_status.indexOf(current) < history_status.indexOf(post) && history_status_index < status_length) {
      eventType = 'backward';
      history_status.pop();
      ++double_count

      clearTimeout(double_timeout);

      if (double_count == 2) {
        eventType = 'doubleclickback';
      }
      double_timeout = setTimeout(function () {
        double_count = 0;
      }, 550);
    }
    event_status = [];
    event_status.push(pre)
    event_status.push(current)
    event_status.push(post)

    var eventData = {
      type: eventType,
      pre: pre,
      current: current,
      post: post,
      status: event_status,
      length: event_status.length
    };
    previous_history = window.location.href;
    window.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }))
  });
})();

/****************************************************************************************************
                                      CustomEventLisnteners
                          addEventListener('historychange'   ,function(e){});
                          addEventListener('forward'         ,function(e){});
                          addEventListener('backward'        ,function(e){});
                          addEventListener('doubleclickback' ,function(e){});
*****************************************************************************************************/

/**
 * @param e.detail.type        "historychange" | "forward" | "backward" | "doubleclickback"
 * @param e.detail.pre         url
 * @param e.detail.current     url
 * @param e.detail.post        url
 * @param e.detail.status     [url]
 * @param e.detail.length     length
 */
