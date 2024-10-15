// ==UserScript==
// @name         picuki to instagram redirect tool
// @namespace    http://tampermonkey.net/
// @version      2024-10-15
// @description  picuki to instagram redirect tool
// @author       You
// @match        https://www.picuki.com/media/*
// @match        https://www.picuki.com/profile/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=picuki.com
// @grant        none
// ==/UserScript==

if (location.href.startsWith('https://www.picuki.com/media/')) {
    if (short_code) location.href = 'https://www.instagram.com/p/' + short_code
}

if (location.href.startsWith('https://www.picuki.com/profile/')) {
    let profile_id = location.href.split('/').pop()
    if (profile_id) location.href = 'https://www.instagram.com/' + profile_id
}

(function() {
    'use strict';

})();
