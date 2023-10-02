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

function findCommonAncestor(elements) {
    if (!Array.isArray(elements) || elements.length === 0) {
        return null;
    }

    let commonAncestor = elements[0].parentNode;

    for (let i = 1; i < elements.length; i++) {
        let currentElement = elements[i];
        while (commonAncestor) {
            if (commonAncestor.contains(currentElement)) {
                break;
            }
            commonAncestor = commonAncestor.parentNode;
        }
        if (!commonAncestor) {
            return null;
        }
    }

    return commonAncestor;
}

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

    const base_node = findCommonAncestor(Array.from(document.querySelectorAll('div,span')).filter((element) => {
        return ['画像', '動画', 'ショッピング', 'ニュース', '地図'].includes(element.textContent);
    })) ? .firstElementChild;
    if (base_node == null) {
        // for telling error status to user
        document.body.style.backgroundColor = "#faf0f0";
        console.log("[google search feature enhancer] There is no element!")
        return
    }
    inputs.forEach(v => {
        var new_node = base_node.cloneNode(true);
        var a_node = new_node.tagName == 'A' ? new_node : new_node.querySelector('a')
        a_node.href = location.href + v.query;
        a_node.querySelector('span').textContent = v.label;
        base_node.parentNode.prepend(new_node);
    });
})();
