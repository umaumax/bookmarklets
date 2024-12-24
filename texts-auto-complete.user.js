// ==UserScript==
// @name         AutoComplete
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto complete for input and textarea
// @author       You
// @match        https://github.com/*
// @exclude      https://*google.com/*
// @exclude      https://*instagram.com/*
// @icon         data:image/png;base64,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
// @require      https://cdn.jsdelivr.net/npm/@tarekraafat/autocomplete.js@10.2.9/dist/autoComplete.min.js
// @grant        none
// @noframes
// ==/UserScript==

// baseString: This is an apple.
// input: This is an a
// return This is an apple.
function partialTextComplete(baseString, input) {
    if (baseString.startsWith(input)) {
        return baseString.split(" ").slice(0, input.split(" ").length).join(" ");
    }
    return input;
}

// e.g. "I like an apple." => [ 'I', 'I like', 'I like an' ]
function extractPhrases(str) {
    const words = str.split(' ');
    const phrases = [];
    for (let i = 1; i < words.length; i++) {
        phrases.push(words.slice(0, i).join(' '));
    }
    return phrases;
}

function findSpaceIndices(str) {
    let indices = [];
    let pre_char = ' ';
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        if ((pre_char == ' ' || pre_char == '\n') && (char != ' ' && char != '\n')) {
            indices.push(i);
        }
        pre_char = char;
    }
    return indices;
}

// "hello wor" "world" => "hello world"
function mergeText(baseString, inputString) {
    let overlap = "";

    // ベース文字列の単語単位で部分一致を探す
    for (let i of findSpaceIndices(baseString)) {
        let suffix = baseString.slice(i);
        if (inputString.startsWith(suffix)) {
            overlap = suffix;
        }
    }

    // 重複部分を除いて結合する
    return baseString + inputString.slice(overlap.length);
}

function extractBeforeBracketPattern(input) {
    const match = input.match(/^(.*?)( \[.*?\])$/);
    if (match) {
        return match[1];
    }
    return input;
}

function elementToKey(element) {
    if (element instanceof HTMLInputElement) {
        if (element.id) {
            return element.id;
        }
        if (element.name) {
            return element.name;
        }
        return 'input';
    }
    if (element instanceof HTMLTextAreaElement) {
        return 'textarea';
    }
    return 'none';
}

function addItem(key, value) {
    let items = loadItems(key);
    items.push(value);
    saveItems(key, items);
}

function saveItems(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
}

function clearItem(key, value) {
    let items = loadItems(key);
    items = items.filter(value => value !== value);
    saveItems(key, items);
}

function loadItems(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function applyAutoComplete(targetTextarea, data_src) {
    function navigate(event, ctx) {
        switch (event.key) {
            case "ArrowDown":
                if (ctx.cursor >= 0) {
                    event.preventDefault();
                    ctx.next();
                } else {
                    ctx.close();
                }
                break;
            case "ArrowUp":
                if (ctx.cursor >= 0) {
                    event.preventDefault();
                    ctx.previous();
                } else {
                    ctx.close();
                }
                break;
            case "Enter":
                if (!ctx.submit && ctx.cursor >= 0) {
                    event.preventDefault()
                    ctx.select(event);
                    break;
                }
                break;
            case "Tab":
                event.preventDefault();
                if (event.shiftKey) {
                    ctx.previous();
                } else {
                    ctx.next();
                }
                break;
            case "Escape":
                ctx.close();
                break;
        }
    };

    function addEventListener(element) {
        element.nextSibling.querySelectorAll('ul button[data-onclick_status="false"]').forEach((button) => {
            console.log('💡:', button);
            button.dataset.onclick_status = "true";
            button.addEventListener("click", function(event) {
                const match_text = event.target.dataset.match_text;
                const key = event.target.dataset.key;
                const action = event.target.dataset.action;
                const hostname = new URL(window.location.href).hostname;
                if (action == "add") {
                    addItem(input_element_key, match_text);
                    alert(`${match_text} is saved to ${hostname} localStorage as ${input_element_key} key`);
                } else if (action == "delete") {
                    clearItem(input_element_key, match_text);
                    alert(`${match_text} is removed from ${hostname} localStorage`);
                } else {
                    console.error(`Unknown action "${action}"`);
                }
                console.log('🔥', event, match_text, key, action);
                event.stopPropagation();
            });
        });
    }

    let keys = null;
    if (data_src.length > 0 && data_src[0].constructor == Object) {
        keys = Object.keys(data_src[0]);
    }
    keys.push('user_defined');
    keys.push('auto_generated');

    let input_element_key = elementToKey(targetTextarea);
    let items = loadItems(input_element_key);
    if (items.length > 0) {
        data_src.concat(items);
    }

    let autoCompleteJS;
    autoCompleteJS = new autoComplete({
        name: "autoComplete",
        selector: () => {
            return targetTextarea;
        },
        wrapper: true,
        data: {
            // src: data_src,
            src: (query) => {
                /*
                if (targetTextarea.style.display=='none') {
                    autoCompleteJS.close();
                    return [];
                }
                */

                console.log('src', query);
                if (targetTextarea instanceof HTMLInputElement) {
                    return data_src;
                }

                let target = targetTextarea;
                let beforeCursor = target.dataset.autoComplete_beforeCursor;
                let afterCursor = target.dataset.autoComplete_afterCursor;
                let beforeCursorLine = target.dataset.autoComplete_beforeCursorLine;
                let beforeCursorWord = target.dataset.autoComplete_beforeCursorWord;

                let preferential_data_src = new Set();
                data_src.forEach((item) => {
                    Object.keys(item).forEach((key) => {
                        let data = extractBeforeBracketPattern(item[key]);
                        if (data.startsWith(beforeCursorLine)) {
                            // NOTE: 現在のカーソル位置に合わせて候補を表示する
                            // preferential_data_src.push(partialTextComplete(data, beforeCursorLine));
                            // preferential_data_src.push(data);

                            // NOTE: 単語ごとに区切って候補を表示する
                            // preferential_data_src =
                            for (const item of extractPhrases(data)) {
                                preferential_data_src.add({
                                    'auto_generated': item
                                });
                            }
                            if (beforeCursorLine != beforeCursorWord) {
                                preferential_data_src.add({
                                    'default': data
                                });
                            }
                            // console.log(data, preferential_data_src);
                        }
                    })
                })

                if (beforeCursorLine == beforeCursorWord) {
                    if (preferential_data_src.size > 0) {
                        return Array.from(preferential_data_src).concat(data_src);
                    }
                    return data_src;
                }
                return preferential_data_src;
            },
            cache: false,
            keys: keys,
            filter: (list) => {
                console.log('🔥', list);
                const filteredResults = list.filter((item) => {
                    if ('key' in item && item.key in item.value) return true;
                    return false;
                });
                return filteredResults;
            }
        },
        // trigger: (trigger_query) => {
        // let query = trigger_query;
        // query = query.replace(/ /g, "").length > 0; // スペースを無視する
        // console.log('trigger', trigger_query, query)
        // return query;
        // },
        query: (input) => {
            let beforeCursorWord = targetTextarea.dataset.autoComplete_beforeCursorWord;
            console.log('⭐️query', beforeCursorWord);
            return beforeCursorWord;
        },
        threshold: 0,
        debounce: 0, // Milliseconds value
        searchEngine: "loose",
        diacritics: true,
        resultsList: {
            element: (list, data) => {
                return

                // NOTE: chatgptのdisplay:noneなtextareaに反応してしまったため
                if (targetTextarea.style.display == 'none') {
                    autoCompleteJS.close();
                    return;
                }

                const info = document.createElement("div");
                info.style.display = "flex";
                info.style['justify-content'] = "space-between";
                info.style.margin = '4px 12px';
                let match_text = targetTextarea.value;
                if (data.results.length > 0) {
                    info.innerHTML = `<p style='margin:4px 12px 4px 0px;'>💡 Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results</p>`;
                } else {
                    // info.innerHTML = `<p style='margin:4px 12px 4px 0px;'>❌️ Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong></p>`;
                    return;
                }
                if (match_text) {
                    info.innerHTML += `<button data-match_text="${match_text}" data-key="user_defined" data-action="add" data-onclick_status="false" style="color:#4caf50;font-weight:900;">＋</button>`
                }

                list.prepend(info);
                setTimeout(() => {
                    addEventListener(targetTextarea);
                }, 50);
            },
            noResults: true,
            maxResults: 15,
            tabSelect: true
        },
        resultItem: {
            element: (item, data) => {
                // Modify Results Item Style
                item.style = "display: flex; justify-content: space-between;";
                // Modify Results Item Content
                let key = '';
                if (data.key) key = `[${data.key}]`;
                // TODO: avoid dom injection
                item.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>
      <span style="display: flex; align-items: center; text-transform: uppercase;">
        ${key}
      </span>
      `;
                if (key == 'user_defined') {
                    item.innerHTML += `<button data-match_text="${data.match}" data-key="${key}" data-action="delete" data-onclick_status="false">❌️</button>`;
                }
            },
            highlight: true
        },
        submit: false,
        events: {
            input: {
                keydown(event) {
                    let ctx = autoCompleteJS;
                    // console.log("💡 input > keydown", event);
                    if (ctx.isOpen) {
                        navigate(event, ctx);
                    }
                },
                focus: (event) => {
                    console.log("Input Field in focus!");
                    // trigger auto completion list
                    var input_event = new Event('input');
                    targetTextarea.dispatchEvent(input_event);
                    // autoCompleteJS.start(); // This causes an error.
                },
                selection: (event) => {
                    // console.log('selection', event)
                    let target = event.target;
                    let selection = event.detail.selection.value;
                    if ('key' in event.detail.selection) {
                        selection = event.detail.selection.value[event.detail.selection.key];
                    }
                    console.log('✅️[selection]', event.detail.selection);

                    selection = extractBeforeBracketPattern(selection);
                    let selectionCursorPosition = selection.indexOf("|");
                    selection = selection.replace("|", "");

                    if (targetTextarea instanceof HTMLInputElement) {
                        target.value = selection;
                        return;
                    }
                    if (selectionCursorPosition == -1 && targetTextarea instanceof HTMLTextAreaElement) selection += ' ';
                    if (selectionCursorPosition == -1) selectionCursorPosition = selection.length;

                    let beforeCursor = target.dataset.autoComplete_beforeCursor;
                    let afterCursor = target.dataset.autoComplete_afterCursor;
                    let beforeCursorWord = target.dataset.autoComplete_beforeCursorWord;

                    function rtrim(str, length) {
                        return str.substr(0, str.length - length);
                    }
                    let mergedText = mergeText(beforeCursor, selection);
                    // console.log('⭐️[selection][DEBUG]', { mergedText, beforeCursor, selection });
                    if (mergedText == beforeCursor + selection) {
                        beforeCursor = rtrim(beforeCursor, beforeCursorWord.length) + selection;
                    } else {
                        beforeCursor = mergedText;
                    }

                    target.value = beforeCursor + afterCursor;
                    let cursorPosition = beforeCursor.length - (selection.length - selectionCursorPosition);
                    target.selectionStart = cursorPosition;
                    target.selectionEnd = cursorPosition;
                }
            },
            list: {
                scroll: (event) => {
                    // console.log("Results List scrolled!");
                }
            }
        }
    });

    targetTextarea.addEventListener("open", function(event) {
        event.target.dataset.autoComplete_status = "open";
        // console.log('open', event);
    });

    targetTextarea.addEventListener("close", function(event) {
        event.target.dataset.autoComplete_status = "close";
        // console.log('close', event);
    });

    targetTextarea.addEventListener("navigate", function(event) {
        console.log('navigate', event.detail);
    });

    // NOTE: おそらく、styleのdisplay:noneの場合はこのイベントが発行されない
    targetTextarea.addEventListener("blur", function(event) {
        console.log('🔥blur', event);
        autoCompleteJS.close();
        //        autoCompleteJS.unInit();
    });

    targetTextarea.addEventListener("input", function(event) {
        console.log('💡[input]', event.target.value);
        let target = event.target;

        if (event.target.tagName != "INPUT" && event.target.tagName != "TEXTAREA") {
            return;
        }

        // 自動選択
        const auto_select_feature = false;
        if (auto_select_feature) {
            setTimeout(() => {
                autoCompleteJS.goTo(0);
            }, 1);
        }

        let beforeCursor = target.value.substring(0, target.selectionStart);
        let afterCursor = target.value.substring(target.selectionStart);
        let beforeCursorLine = beforeCursor.split("\n").pop();
        let beforeCursorWord = beforeCursorLine.split(" ").pop();

        event.target.dataset.autoComplete_beforeCursor = beforeCursor;
        event.target.dataset.autoComplete_beforeCursorLine = beforeCursorLine;
        event.target.dataset.autoComplete_beforeCursorWord = beforeCursorWord;
        event.target.dataset.autoComplete_afterCursor = afterCursor;

        // data_src.push(beforeCursorWord);
    });


    targetTextarea.focus();
}

function main() {

    let default_dataset = [
        ["narrow down", "絞り込む"],
        ["It would be great if we could", "提案"],
        ["Thanks all for the lighting fast response!", "感謝"],
        ["I see. That makes sense. 👍", "理解"],
        ["I have no other idea for now,", "❓️"],
        ["I think this is where unit tests can be effective, and I highly recommend writing unit tests.", "単体テスト"],
        ["Is there any update on this?", "進捗確認"],
        ["Approved from a grammatical point of view.", "承認"],
        ["Approve on the assumption that other comments will be addressed.", "承認"],
        ["Could you update the name of this variable?", "変数名改善"],
        ["Could you merge main branch to this PR branch?", "ブランチ取り込み"],
        ["To be exact,", "厳密に言うと、"],
        ["Exactly speaking,", "厳密に言うと、"],
        ["As to |,", "~に関して、"],
        ["As to |,", "~に関して、"],
        ["I approve this as an implementation of the feature itself.", "機能としては承認するが...(留意点がある)"],
        ["I will move this ticket to the backlog.", "チケットをバックログへ"],
        ["Thanks for sharing the information.", "感謝"],
        ["Could you gather the detail logs and create a ticket for it?", "チケット"],
        // for dummy test
        ["interesting", ""],
    ];
    let default_data_src = [];
    for (let text of default_dataset) {
        default_data_src.push({
            'default': `${text[0]} [${text[1]}]`
        });
    }
    // let targetTextarea = document.querySelector("#autoComplete");
    // applyAutoComplete(targetTextarea, data_src);

    console.log('🔥main');
    document.addEventListener("focus", function(e) {
        // NOTE: 要素が生成された後にstyleでdisplay:noneが適用される場合があるので、イベント設定の適用までに遅延を発生させるようにした
        setTimeout(() => {
            if (
                // NOTE: temporary disabled
                e.target instanceof HTMLInputElement && e.target.type === "text" ||
                e.target instanceof HTMLTextAreaElement
                // e.target.hasAttribute("contenteditable")
            ) {
                if (!e.target.dataset.listenerApplied) {
                    if (e.target.ariaReadOnly) {
                        return;
                    }
                    if (e.target.style.display == 'none') {
                        return;
                    }
                    console.log("Focus event for the first time on:", e.target);
                    e.target.dataset.listenerApplied = "true";
                    let data_src = default_data_src;
                    if (e.target instanceof HTMLInputElement) {
                        data_src = [{
                                "default": "default text",
                            },
                            {
                                "default": "hogehoge",
                            },
                            {
                                "default": "fugafuga",
                            },
                        ];
                    }
                    applyAutoComplete(e.target, data_src);
                }
            }

        }, 50);
    }, true);
}

function add_css(datas) {
    var head = document.getElementsByTagName('head')[0];

    datas.forEach(function(data) {
        var style;
        if (data.startsWith('http')) {
            style = document.createElement('link');
            var url = data;
            console.log('[log]: add css from ', url);
            style.href = url;
            style.rel = 'stylesheet';
        } else {
            style = document.createElement('style');
            var raw_text = data;
            console.log('[log]: add css text ', raw_text);
            style.insertAdjacentHTML('beforeend', raw_text);
        }
        style.type = 'text/css';
        head.append(style);
    });
}

const custom_css_content = `
:root {
    --autoComplete_wrapper-input-background-color: #fff;
}

body {
  overflow-y: hidden; /* 入力補完がページ下に表示されたときの画面表示がガタガタとなる現象を防ぐ */
}

/*
.autoComplete_wrapper {
    display: inline-block;
    position: relative;
}

.autoComplete_wrapper>input {
    height: 3rem;
    width: 370px;
    margin: 0;
    padding: 0 2rem 0 3.2rem;
    box-sizing: border-box;
    font-size: 1rem;
    text-overflow: ellipsis;
    color: rgba(255, 122, 122, 0.3);
    outline: 0;
    border-radius: 10rem;
    border: 0.05rem solid rgba(255, 122, 122, 0.5);
    background-image: url(images/search.svg);
    background-size: 1.4rem;
    background-position: left 1.05rem top 0.8rem;
    background-repeat: no-repeat;
    background-origin: border-box;
    background-color: var(--autoComplete_wrapper-input-background-color);
    transition: all 0.4s ease;
}

.autoComplete_wrapper>input::placeholder {
    color: rgba(255, 122, 122, 0.5);
    transition: all 0.3s ease;
}

.autoComplete_wrapper>input:hover::placeholder {
    color: rgba(255, 122, 122, 0.6);
    transition: all 0.3s ease;
}

.autoComplete_wrapper>input:focus::placeholder {
    padding: 0.1rem 0.6rem;
    font-size: 0.95rem;
    color: rgba(255, 122, 122, 0.4);
}

.autoComplete_wrapper>input:hover {
    color: rgba(255, 122, 122, 0.8);
    transition: all 0.3s ease;
}

.autoComplete_wrapper>input:focus {
    color: #ff7a7a;
    border: 0.06rem solid rgba(255, 122, 122, 0.8);
}
*/

.autoComplete_wrapper>ul {
    position: absolute;
    max-height: 160px;
    width: fit-content;
    overflow-y: scroll;
    box-sizing: border-box;
    left: 0;
    right: 0;
    margin: 0.5rem 0 0 0;
    padding: 0;
    font-size: 0.8rem;
    z-index: 1;
    list-style: none;
    border-radius: 0.6rem;
    background-color: #fff;
    border: 1px solid rgba(33, 33, 33, 0.07);
    box-shadow: 0 3px 6px rgba(149, 157, 165, 0.15);
    outline: 0;
    transition: opacity 0.15s ease-in-out;
}

.autoComplete_wrapper>ul>li {
    margin: 0.1rem;
    padding: 0.1rem 0.5rem;
    text-align: left;
    font-size: 0.8rem;
    color: #212121;
    border-radius: 0.35rem;
    background-color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.2s ease;
}

.autoComplete_wrapper>ul>li:hover {
    text-overflow: initial;
    overflow: scroll;
}

.autoComplete_wrapper>ul>li mark {
    background-color: transparent;
    color: #ff7a7a;
    font-weight: 700;
}

.autoComplete_wrapper>ul>li:hover {
    cursor: pointer;
    background-color: rgba(255, 122, 122, 0.15);
}

.autoComplete_wrapper>ul>li[aria-selected=true] {
    background-color: rgba(255, 122, 122, .15)
}

@media (prefers-color-scheme: dark) {
    .autoComplete_wrapper>input {
        color: rgba(255, 255, 255, 0.8);
        border: 0.05rem solid rgba(255, 255, 255, 0.5);
        /* background-color: #333; */
        background-image: url(images/search-dark.svg);
    }
    :root {
        --autoComplete_wrapper-input-background-color: #333;
    }
    .autoComplete_wrapper>input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
    .autoComplete_wrapper>ul {
        background-color: #444;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    }
    .autoComplete_wrapper>ul>li {
        color: #fff;
        background-color: #444;
    }
    .autoComplete_wrapper>ul>li:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
}

html[data-color-mode="dark"] {
    .autoComplete_wrapper>input {
        color: rgba(255, 255, 255, 0.8);
        border: 0.05rem solid rgba(255, 255, 255, 0.5);
        /* background-color: #333; */
        background-image: url(images/search-dark.svg);
    }
    :root {
        --autoComplete_wrapper-input-background-color: #333;
    }
    .autoComplete_wrapper>input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
    .autoComplete_wrapper>ul {
        background-color: #444;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
    }
    .autoComplete_wrapper>ul>li {
        color: #fff;
        background-color: #444;
    }
    .autoComplete_wrapper>ul>li:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
    .autoComplete_wrapper>ul>li[aria-selected=true] {
        background-color: rgba(255, 122, 122, .15)
    }
}
`;
(function() {
    let hoge = 'hoge';
    window.th = self;
    'use strict';
    add_css([custom_css_content]);
    main();
})();
