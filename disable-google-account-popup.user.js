// ==UserScript==
// @name         google account popup blocker
// @namespace
// @version      0.1
// @description  disable google account popup
// @author       You
// @match        https://www.reddit.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

var content = 'div#POPUP_CONTAINER ~ div > div { display: none; }'

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = content;
document.getElementsByTagName('head')[0].appendChild(style);
