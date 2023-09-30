// ==UserScript==
// @name         google search feature enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  google search feature enhancer
// @author       You
// @match        https://www.google.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      http://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    const inputs = [{
            'label': '1年以内',
            'query': '&tbs=qdr:y'
        },
        {
            'label': '日本語のみ',
            'query': '&lr=lang_ja'
        },
        {
            'label': 'Only English',
            'query': '&lr=lang_en'
        },
        {
            'label': 'アメリカ版',
            'query': '&gl=us'
        }
    ]

    var search_bar_box_query = 'div[role="navigation"]';
    var e = document.querySelector(search_bar_box_query);
    if (e == null) {
        // for telling error status to user
        document.body.style.backgroundColor = "#faf0f0";
        console.log("[google search feature enhancer] There is no element!:" + search_bar_box_query)
        return
    }
    var base_node = e.querySelector('a');
    if (base_node == null) {
        // for telling error status to user
        document.body.style.backgroundColor = "#f0faf0";
        console.log("[google search feature enhancer] There is no element!:" + search_bar_box_query + ' a')
        return
    }
    inputs.forEach(v => {
        var new_node = base_node.cloneNode(true);
        new_node.href = location.href + v.query;
        new_node.querySelector('span').textContent = v.label;
        base_node.parentNode.prepend(new_node);
    });
})();
