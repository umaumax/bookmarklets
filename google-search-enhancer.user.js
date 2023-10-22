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

function findDeepestChildMatchingCondition(element, conditionFunction) {
    if (!element) {
        return null;
    }

    let deepestChild = null;
    let maxDepth = -1;

    function traverse(node, depth) {
        if (conditionFunction(node) && depth > maxDepth) {
            deepestChild = node;
            maxDepth = depth;
        }

        for (const child of node.childNodes) {
            traverse(child, depth + 1);
        }
    }

    traverse(element, 0);

    return deepestChild;
}

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

    const base_node = Array.from(
        findCommonAncestor(
            Array.from(document.querySelectorAll('div[role=navigation] a div,span a')).filter((element) => {
                var ret = ['画像', '動画', 'ショッピング', 'ニュース', '地図'].includes(element.textContent);
                // if (ret) console.log(element.textContent, element)
                return ret
            }))?.children)?.find((element) => {
        return element.tagName == 'A' || element.querySelector('a') != null;
    });
    if (base_node == null) {
        // for telling error status to user
        document.body.style.backgroundColor = "#faf0f0";
        console.log("[google search feature enhancer] There is no element!")
        return
    }
    console.log("[Google Ex]", base_node)
    inputs.forEach(v => {
        var new_node = base_node.cloneNode(true);
        var a_node = new_node.tagName == 'A' ? new_node : new_node.querySelector('a')
        a_node.href = location.href + v.query;
        var text_node = findDeepestChildMatchingCondition(new_node, (element) => {
            return ['画像', '動画', 'ショッピング', 'ニュース', '地図'].includes(element.textContent);
        });
        if (text_node == null) {
            text_node = new_node;
        }
        text_node.textContent = v.label;
        base_node.parentNode.prepend(new_node);
    });
})();
