// ==UserScript==
// @name         GitHub Extension
// @namespace
// @version      0.1
// @description  extend GitHub features
// @author       You
// @match        https://github.com/*/*/tree/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

function compareCurrentBranch(base_branch) {
    var urlParts = window.location.pathname.split("/");
    var owner = urlParts[1];
    var repo = urlParts[2];
    var tree = urlParts[3]; // NOTE: This value must be "tree"
    var branch = urlParts.slice(4).join("/");

    var compareURL = "https://github.com/" + owner + "/" + repo + "/compare/" + base_branch + "..." + branch;
    window.open(compareURL, '_blank');
}

function addCreateCompareURLSettings() {
    GM_registerMenuCommand("📗: COMPARE current branch and main branch", () => compareCurrentBranch("main"));
    GM_registerMenuCommand("📗: COMPARE current branch and master branch", () => compareCurrentBranch("master"));
}

(function() {
    'use strict';

    addCreateCompareURLSettings();
})();
