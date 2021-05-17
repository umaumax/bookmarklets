// ==UserScript==
// @name         clipboard copy button generater
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  clipboard copy button generater
// @author       You
// @match        https://github.com/*/*/pull/*
// @grant        none
// ==/UserScript==

var copy_to_clipboard = function(text) {
    var copy_area = document.createElement("textarea");
    copy_area.textContent = text;

    document.body.appendChild(copy_area);
    copy_area.select();

    var ret_val = document.execCommand('copy');
    document.body.removeChild(copy_area);
    return ret_val;
};

function clipboard_handler(e) {
    copy_to_clipboard(e.target.dataset.text);
};

(function() {
    'use strict';

    document.styleSheets[0].insertRule('.clipboard-copy-user-script-icon:active { background-color: #99cc00; }', 0);

    /* for github.com */
    if (document.URL.match(/https:\/\/github.com\/.*/)) {
        var commit_hash_hrefs = document.querySelectorAll('div.js-commit-group-commits .js-commit .text-right.ml-1 a:first-child');
        for (var i = 0; i < commit_hash_hrefs.length; i++) {
            var elem = commit_hash_hrefs[i];
            var clipboard_button = document.createElement('p');
            clipboard_button.innerHTML = '📋';
            var css = 'float: left; position: relative; left: 115px; top: 0px; cursor: pointer;';
            clipboard_button.setAttribute("style", css);
            clipboard_button.setAttribute("class", 'clipboard-copy-user-script-icon');
            clipboard_button.setAttribute("data-text", elem.innerText);
            clipboard_button.onclick = clipboard_handler;
            elem.parentElement.appendChild(clipboard_button);
        }
    }
})();
