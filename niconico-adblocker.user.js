// ==UserScript==
// @name         NicoNicoAdBlocker
// @namespace
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.nicovideo.jp/watch/*
// @grant        none
// ==/UserScript==

var adSkip = function() {};

function skip() {
    const elem1 = document.getElementsByTagName('video');
    if (elem1[1] == null) {} else if (elem1[1].src != "") {
        elem1[1].src = "";
        console.log("clear video src!!");
        //        clearInterval(adSkip);
    }
}

(function() {
    'use strict';
    console.log("start to skip clear video src!!");
    adSkip = setInterval(skip, 100);
})();
