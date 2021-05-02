// ==UserScript==
// @name         github wiki keyboard shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  define keyboard shortcut
// @author       You
// @match        https://github.com/*/*/wiki
// @grant        none
// ==/UserScript==

function get_edit_button_element() {
    var a_tags = document.getElementsByTagName("a");
    var search_text = "Edit";
    var element = null;
    for (var i = 0; i < a_tags.length; i++) {
        if (a_tags[i].textContent == search_text) {
            element = a_tags[i];
            break;
        }
    }
    return element;
}

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        // e: 69
        if (e.keyCode == 69) {
            var edit_button_element = get_edit_button_element();
            edit_button_element.click();
        }
        return true;
    });
})();
