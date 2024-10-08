// ==UserScript==
// @name         Highlight and Unhighlight Selected Text with Custom Highlight API
// @namespace    http://tampermonkey.net/
// @version      2024-08-15
// @description  Highlight and unhighlight selected text using the Custom Highlight API
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

function getAllIndexes(arr, val) {
    let indexes = [];
    let i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

function add_css(datas) {
    var head = document.getElementsByTagName('head')[0];

    datas.forEach(function(data) {
        var style;
        if (data.startsWith('http')) {
            style = document.createElement('link');
            var url = data;
            style.href = url;
            style.rel = 'stylesheet';
        } else {
            style = document.createElement('style');
            var raw_text = data;
            style.insertAdjacentHTML('beforeend', raw_text);
        }
        style.type = 'text/css';
        head.append(style);
    });
}

// [javascript - Find all text nodes in HTML page - Stack Overflow]( https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page )
/**
 * Retrieves an array of all text nodes under a given element.
 *
 * @param { Node } el - The element under which to search for text nodes.
 * @returns { Node[] } An array of text nodes found under the given element.
 */
function textNodesUnder(el) {
    const children = [] // Type: Node[]
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
        children.push(walker.currentNode)
    }
    return children
}

/**
 * Converts a hex color string to an RGB object.
 * @param {string} hex - The hex color string (e.g., "#123456").
 * @returns {object} - An object with properties r, g, and b.
 */
function hexToRGB(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the hex string into RGB components
    let r, g, b;
    if (hex.length === 6) {
        // 6 digits (e.g., "RRGGBB")
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else if (hex.length === 3) {
        // 3 digits (e.g., "RGB")
        r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
        throw new Error('Invalid hex color format');
    }

    return {
        r,
        g,
        b
    };
}

let color_index = 0;
// NOTE: 20 colors x 1 = 20
const colors = Array(1).fill([
    '#bbdefb', // Light blue
    '#e1bee7', // Light purple
    '#ffcdd2', // Light red
    '#d3d3d3', // Light gray
    '#f8bbd0', // Light pink
    '#d1c4e9', // Light indigo
    '#e5e5e5', // Light white
    '#ffccbc', // Light orange
    '#ffe0b2', // Light amber
    '#e6e6fa', // Light lavender
    '#fce4ec', // Light pinkish
    '#cfd8dc', // Light blue-grey
    '#e8f5e9', // Light greenish
    '#fff9c4', // Light yellow
    '#ffecb3', // Light yellow-orange
    '#fff3e0', // Light peach
    '#e1f5fe', // Light azure
    '#f0f4c3', // Light yellow
    '#dcedc8', // Light lime
    '#c8e6c9', // Light green
]).flatMap(x => x);
let color_list = []
let color_index_stack = []
for (let i = 0; i < colors.length; i++) {
    color_index_stack.push(i);
}
const custom_css_content = colors.map((hex_color, i) => {
    const c = hexToRGB(hex_color);
    color_list.push(c);
    return `
::highlight(c${i}) {
    color: rgb(0 0 0 / 1.0);
    text-decoration: underline overline;
    text-decoration-color: rgb(${c.r*0.7} ${c.g*0.7} ${c.b*0.7} / 1.0);
    background-color: rgb(${c.r*1.0} ${c.g*1.0} ${c.b*1.0} / 1.0);
    -webkit-text-stroke-color: #ffffff; */
}
`
}).join('\n');
const highlight_map = new Map();
let prev_selected_color = null;

(function() {
    'use strict';
    add_css([custom_css_content]);

    function addKeywordHighlight(h, textNode, keyword) {
        var indexes = getAllIndexes(textNode.textContent, keyword);
        let length = keyword.length;
        indexes.forEach((index) => {
            const r = new Range();
            r.setStart(textNode, index);
            r.setEnd(textNode, index + length);
            h.add(r);
        });
    }

    function highlightText(text, background_color = null) {
        console.log("🟨🖊highlightText", text);

        const h = new Highlight();
        let elements = textNodesUnder(document.body);
        elements.forEach((element) => {
            addKeywordHighlight(h, element, text);
        });
        if (color_index_stack.length == 0) {
            console.error("There is no color left to hightlight!");
            return;
        }
        let color_index = null;
        if (background_color) {
            let base_colors = [background_color];
            if (prev_selected_color) base_colors.push(prev_selected_color);
            let ret = getFurthestColor(base_colors, color_index_stack.map((x) => color_list[x]));
            color_index = color_index_stack.splice(ret.index, 1)[0];
            prev_selected_color = color_list[color_index];
        } else {
            color_index = color_index_stack.pop();
        }
        CSS.highlights.set(`c${color_index}`, h);
        highlight_map.set(text, [h, color_index])
    }

    function unhighlightText(text) {
        console.log("🟨🧹unhighlightText", text);
        let [h, color_index] = highlight_map.get(text)
        highlight_map.delete(text)
        color_index_stack.push(color_index);
        CSS.highlights.delete(`c${color_index}`);
    }

    function rerunHighLighting() {
        if (highlight_map.length == 0) {
            return;
        }
        let elements = textNodesUnder(document.body);
        highlight_map.forEach(([h, color_index], keyword) => {
            h.clear();
            elements.forEach((element) => {
                addKeywordHighlight(h, element, keyword);
            });
        })
    }

    function parse_css_rgb_text(css_rgb_text) {
        const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*([0-9.]+))?\)$/;
        const match = css_rgb_text.match(rgbRegex);
        if (!match) {
            return null;
        }
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = match[5] ? parseFloat(match[5]) : 255;
        return {
            r,
            g,
            b,
            a
        };
    }

    function calculateDistance(color1, color2) {
        return Math.sqrt(
            Math.pow(color1.r - color2.r, 2) +
            Math.pow(color1.g - color2.g, 2) +
            Math.pow(color1.b - color2.b, 2)
        );
    }

    function getFurthestColor(targetColors, colorArray) {
        let maxValue = -1;
        let furthestColor = null;
        let index = -1;
        let i = 0;

        for (const color of colorArray) {
            let v = 0.0;
            for (const targetColor of targetColors) {
                let distance = calculateDistance(targetColor, color);
                v += distance * distance;
            }
            if (v > maxValue) {
                maxValue = v;
                furthestColor = color;
                index = i;
            }
            i += 1;
        }

        return {
            index: index,
            value: furthestColor
        };
    }

    function toggleHighlight(event) {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            let isHighlighted = highlight_map.has(selectedText);
            if (isHighlighted) {
                unhighlightText(selectedText);
            } else {
                let element = event.target;
                const ancestors = [element]; // with a self element
                while (element.parentNode && element.parentNode != document) {
                    element = element.parentNode;
                    ancestors.push(element);
                }

                let background_color = null;
                for (let i = 0; i < ancestors.length; i++) {
                    let e = ancestors[i];
                    let background_color_text = window.getComputedStyle(e, null).getPropertyValue('background-color');
                    let c = parse_css_rgb_text(background_color_text);
                    if (c.a != 0) {
                        background_color = c;
                        break;
                    }
                }

                highlightText(selectedText, background_color);
            }
        } else {
            console.log("🟨🖊🔁 rerunHighLighting")
            rerunHighLighting();
        }
    }

    // NOTE: ドラッグやダブルクリックの選択された後に発火する
    document.addEventListener('mouseup', toggleHighlight);

    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                let node = mutation.target;
                console.log("🟨🖊update highlightText", node.data);
                highlight_map.forEach((keyword, [h, color_index]) => {
                    addKeywordHighlight(h, node, keyword);
                })
            }
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        if (!node.textContent.trim()) {
                            return;
                        }
                        console.log("🟨🖊update highlightText", node.textContent);
                        highlight_map.forEach(([h, color_index], keyword) => {
                            addKeywordHighlight(h, node, keyword);
                        })
                    }
                });
            }
        }
    };

    // NOTE: GitHubのPRでexpandした範囲を正しく検知できないので、コメントアウトしている(空のクリック実行時に単純にページ全体をハイライトし直す処理とした)
    // const observer = new MutationObserver(callback);
    // observer.observe(document.body, { childList: true, subtree: true });
})();
