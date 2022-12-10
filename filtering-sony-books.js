// ==UserScript==
// @name         Filter sony books
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  filtering limited time books
// @author       You
// @match        https://ebookstore.sony.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sony.jp
// @grant        GM_registerMenuCommand
// ==/UserScript==

function filtering_limited_time_books() {
    Array.prototype.slice.call(document.querySelectorAll('.topItemDetailList__listItemInner'))
        .filter(e => e.innerText.includes('期間限定') || e.innerText.includes('分冊版') || e.innerText.includes('単話') || e.innerText.includes('試し読み'))
        .map(e => {e.style.display="none";})
}

(function() {
    'use strict';

    GM_registerMenuCommand("🐾: Filtering limited time books", filtering_limited_time_books);
})();