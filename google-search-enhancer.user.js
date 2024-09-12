// ==UserScript==
// @name         google search feature enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  google search feature enhancer
// @author       You
// @match        https://www.google.com/search*
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

function infinite_scroll() {
    const currentSearchTab = document.querySelector('[aria-current]')
    const checkAllResultsPage = document.getElementById('result-stats')
    let pageCounter = document.createElement('style')
    pageCounter.innerText = `
g-section-with-header,
#botstuff ~ #res[role="main"] video-voyager{display: none!important;}

/* page counter */
body { counter-reset: number 1; }
#botstuff ~ #res[role="main"] { counter-increment: number 1; border-top: solid ${window.getComputedStyle( document.querySelector('#top_nav > div') ).getPropertyValue('border-bottom-color')} 1px; }
#botstuff ~ #res[role="main"]:before {content: counter(number);
font-size: 14px; position: absolute; right: 0; margin-top: -10px; padding-right: 8px; padding-left: 12px;
color: ${window.getComputedStyle( document.querySelector('#result-stats') ).getPropertyValue('color')};
background-color: ${window.getComputedStyle( document.body ).getPropertyValue('background-color')}}`

    // let removeNavNumbs = document.createElement('style')
    // removeNavNumbs.innerText = `#botstuff [role="navigation"] {visibility: hidden; height: 0;}`
    // document.head.appendChild(removeNavNumbs)

    if (checkAllResultsPage) {
        // create favicons
        function createFavicons(target) {
            for (let i = 0; i < target.querySelectorAll('cite').length; ++i) {
                let lnk = target.querySelector('#center_col>[role="main"]').querySelectorAll('cite')[i],
                    txt = lnk.textContent,
                    url = txt.match(/\./g) ? (txt.match(/\/\//g) ? txt.match(/(?<=\/\/)[^\s]*/g) : txt.match(/^[^\s]*/g)) : false,
                    fav = url ? '/s2/favicons?domain=' + url : '';
                if (url) {
                    let img = target.createElement('div');
                    img.style.cssText = `background-image:url("${fav}"); width:16px; height:16px; display:inline-block; margin-right:6px`;
                    lnk.prepend(img)
                    lnk.style.cssText = 'display:inline-block'
                };
            };
        };

        if (!document.querySelector('a > h3 + div > span > div > img')) {
            createFavicons(document);
        }

        // load pages when it's bottom + create favicons
        let pageNumber = 0
        let loaded_flag = true;
        let loadNewResults = _ => {
            let nextURL = new URL((document.querySelector('[role="navigation"]>[role="presentation"] a:first-child').href).replace(/(?<=start=)(.*?)(?=\&)/g, pageNumber * 10));
            fetch(nextURL.href)
                .then(response => response.text())
                .then(text => {
                    let newDocument = (new DOMParser()).parseFromString(text, 'text/html')
                    let newResults = newDocument.documentElement.querySelector('#center_col > [role="main"]')
                    if (!document.querySelector('a > h3 + div > span > div > img')) {
                        createFavicons(newDocument);
                    }

                    let checkMoreResults = newDocument.querySelector('#topstuff p > span > em') == null
                    if (checkMoreResults) {
                        document.createElement('div').appendChild(newResults)
                        document.querySelector('#center_col > [role="main"]').parentElement.appendChild(newResults)
                    };
                    loaded_flag = true;
                });

            if (pageNumber == 1) {
                document.head.appendChild(pageCounter)
            };
        };

        document.addEventListener('scroll', _ => {
            if (loaded_flag && window.innerHeight + window.pageYOffset >= document.body.scrollHeight * (1.0 - 1.0 / (pageNumber + 1) / 2)) {
                pageNumber = pageNumber + 1
                loaded_flag = false;
                loadNewResults();
            };
        });
    };
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

    var base_node = document.createElement("div");
    base_node.style['z-index'] = 9999;
    base_node.style.position = 'fixed';
    base_node.style.top = '192px';
    base_node.style.left = '10px';
    base_node.style['padding-right'] = '100px';
    base_node.id = 'google-search-feature-enhancer';
    document.body.appendChild(base_node);
    inputs.forEach(v => {
        var a_node = document.createElement("a");
        a_node.href = location.href + v.query;
        a_node.textContent = v.label;
        var outer_node = document.createElement("div");
        outer_node.style.height = '30px';
        outer_node.style.margin = '4px 0';
        outer_node.style.padding = '0 8px';
        outer_node.style['align-items'] = 'center';
        outer_node.style.display = 'flex';
        outer_node.style.background = '#f7f7ff';
        outer_node.style['justify-content'] = 'center';
        outer_node.style['border-radius'] = '20px';
        outer_node.style.border = '1px solid #dadce0';
        outer_node.appendChild(a_node);
        base_node.appendChild(outer_node);
    });

    var content = '';
    content += '#google-search-feature-enhancer { transform: translate(-50%, 0px); transition: all 0.2s; }';
    content += '#google-search-feature-enhancer:hover { transform: translate(0%, 0px); transition: all 0.2s; }';

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);

    infinite_scroll();
})();
