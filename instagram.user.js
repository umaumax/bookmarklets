// ==UserScript==
// @name         Auto more expander at instagram
// @namespace    http://tampermonkey.net/
// @version      2024-10-30
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

function AutoMoreClicker() {
    Array.from(document.querySelectorAll('span[dir="auto"]'))
        .filter((element) => element.textContent === 'more')
        .forEach((element) => {
            console.log('CLICK! more:', element);
            element.click();
        });
}

(function() {
    'use strict';

    setInterval(AutoMoreClicker, 5000);
})();
