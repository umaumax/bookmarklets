// ==UserScript==
// @name         gitlab wiki sidebar expander
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  expand gitlab wiki sidebar
// @author       You
// @match        https://gitlab.com/*/wikis/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var content = '';
    content += '.right-sidebar-expanded .content-wrapper { padding-right: 30px; }';
    content += '.container-limited.limit-container-width { max-width: 100%; }';
    content += '.right-sidebar.wiki-sidebar { transform: translate(95%, 0px); transition: all 0.5s; }';
    content += '.right-sidebar.wiki-sidebar:hover, .right-sidebar.wiki-sidebar:focus, .right-sidebar.wiki-sidebar.focus { transform: translate(0%, 0px); transition: all 0.5s; }';

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);

    var sidebar = document.querySelectorAll('.right-sidebar.wiki-sidebar')[0];
    // NOTE: enable focus() event
    sidebar.setAttribute('tabindex', '-1');

    // [events \- Is there a way to detect find on the page searches in javascript \- Stack Overflow]( https://stackoverflow.com/questions/6680213/is-there-a-way-to-detect-find-on-the-page-searches-in-javascript )
    document.addEventListener('keydown', function(e) {
        // 70: f
        // 191: ?/
        if ((e.ctrlKey || e.metaKey) || (e.keyCode == 70 && (e.ctrlKey || e.metaKey)) || (e.keyCode == 191)) {
            console.log("ctrl+f: focus");
            sidebar.classList.add("focus");
        }
        return true;
    });
    document.addEventListener('click', function(e) {
        console.log("ctrl+f: out");
        sidebar.classList.remove("focus");
    });
})();
