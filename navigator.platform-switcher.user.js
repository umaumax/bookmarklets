// ==UserScript==
// @name         navigator.platform switcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  override navigator platform
// @author       You
// @match        https://hogehoge.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Object.defineProperty(navigator, 'platform', {
        get: function() {
            return "Linux";
        }
    });
})();
