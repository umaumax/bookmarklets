// ==UserScript==
// @name         github wiki keyboard shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  define keyboard shortcut
// @author       You
// @match        https://github.com/*/*/wiki/*
// @grant        none
// ==/UserScript==

function get_edit_button_element() {
    let a_tags = document.getElementsByTagName("a");
    let search_text = "Edit";
    let element = null;
    for (let i = 0; i < a_tags.length; i++) {
        if (a_tags[i].textContent.trim() == search_text) {
            element = a_tags[i];
            break;
        }
    }
    return element;
}

(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        if (event.key === 'e' && !event.ctrlKey) {
            let edit_button_element = get_edit_button_element();
            if (edit_button_element) {
                edit_button_element.click();
            }
        }
        return true;
    });
})();
