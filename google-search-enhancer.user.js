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

    var e = document.querySelector('div[role="navigation"] div[role="navigation"]>div[data-st-tgt="mode"]>div>div>div');
    console.log(e)
    var base_bode = e.querySelector('a');
    inputs.forEach(v => {
        var new_node = base_bode.cloneNode(true);
        new_node.href = location.href + v.query;
        new_node.querySelector('span').textContent = v.label;
        e.prepend(new_node);
    });
})();
