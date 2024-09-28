// ==UserScript==
// @name         gitlab wiki sidebar expander
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  expand gitlab wiki sidebar
// @author       You
// @match        https://gitlab.com/*/wikis/*
// @icon         https://www.google.com/s2/favicons?domain=gitlab.com
// @grant        none
// ==/UserScript==

function moveCursorToStart(element) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.setStart(element, 0);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    element.focus();
}

function add_wiki_events() {
    let isCommandPressed = false;
    let isShiftPressed = false;

    document.addEventListener('keydown', function(event) {
        if (event.metaKey) {
            isCommandPressed = true;
        }
        if (event.shiftKey) {
            isShiftPressed = true;
        }
    });

    document.addEventListener('keyup', function(event) {
        if (!event.metaKey) {
            isCommandPressed = false;
        }
        if (!event.shiftKey) {
            isShiftPressed = false;
        }
    });

    document.addEventListener('paste', function(event) {
        const clipboardData = event.clipboardData || window.clipboardData;
        // console.log(clipboardData.getData("text/plain"));
        // NOTE: command + shift + V
        if (isCommandPressed && isShiftPressed) {
            // NOTE: command + shift + V or command + v(plain mode)
            // if (clipboardData.items.length == 1 && clipboardData.items[0].type=='text/plain') {
            event.stopPropagation();
        }
    }, true);

    document.addEventListener('keydown', function(event) {
        if (!is_gitlab_wiki) return;

        if (event.key === '`') {
            let codeBlockButtonFlag = false;
            let selectedText = window.getSelection().toString();
            if (selectedText) {
                codeBlockButtonFlag = true;
            } else {
                const selection = window.getSelection();
                const preText = selection.anchorNode.textContent.substring(0, selection.anchorOffset);
                const blockStartOffset = preText.indexOf("`");
                if (blockStartOffset != -1) {
                    const textNode = selection.anchorNode;
                    const range = document.createRange();
                    range.setStart(textNode, blockStartOffset);
                    range.setEnd(textNode, blockStartOffset + 1); // remove "`"
                    range.deleteContents()
                    range.setStart(textNode, blockStartOffset);
                    range.setEnd(textNode, selection.anchorOffset); // NOTE: この値は選択範囲が削除された後の最新の値が自動的に適用される
                    selection.removeAllRanges();
                    selection.addRange(range);
                    codeBlockButtonFlag = true;
                }
            }
            if (codeBlockButtonFlag) {
                const button = document.querySelector('button[aria-label="Code"][title="Code"][data-testid="code"]');
                if (button) {
                    setTimeout(() => { // NOTE: 直前にjavascript上で選択範囲を再設定した場合にdelayを入れないと反応しないため
                        button.click();
                    }, 100);
                    event.preventDefault();
                    return;
                }
            }
        }
        if (event.metaKey && event.key === 'Enter') {
            // click `Save changes`
            document.querySelector('button[data-testid="wiki-submit-button"][type="submit"]').click();
            event.preventDefault();
            return;
        }
    });

    setInterval(() => {
        if (!is_gitlab_wiki) return;

        let button_group = document.querySelector('div[data-tippy-root] div[data-state="visible"] div[class="btn-group"]');
        if (!button_group) return;
        if (button_group.querySelector('button.my-custom-label')) return;

        let inputs = [{
                label: "JS",
                language: "javascript"
            },
            {
                label: "🐍",
                language: "python"
            },
            {
                label: "bash",
                language: "bash"
            },
            {
                label: "c++",
                language: "cpp"
            },
            {
                label: "🦀",
                language: "rust"
            },
        ];
        console.log(inputs);

        inputs.forEach(input => {
            const button = document.createElement('button');
            button.classList.add('my-custom-label')
            button.textContent = input['label'];
            button.addEventListener('click', (event) => {
                console.log(input['language']);
                (async () => {
                    await updateCodeBlockLanguage(input['language']);
                })();
                event.preventDefault();
            });
            button_group.prepend(button);
        })
    }, 100);

    setInterval(() => {
        if (!is_gitlab_wiki) return;

        function applyDetails(targets, text) {
            const target = targets[0];
            if (target.closest('details')) return;
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = text;
            details.appendChild(summary);
            target.parentNode.insertBefore(details, target);
            targets.forEach(e => details.appendChild(e));
        }


        let header_targets = [document.querySelector('div.row:has(* label[for="wiki_title"])'), document.querySelector('div.row:has(* label[for="wiki_format"])')].filter(x => x);;
        if (header_targets.length > 0) applyDetails(header_targets, "title and format");

        let footer_targets = [document.querySelector('div.row:has(* input#wiki_message)'), document.querySelector('div[data-testid="wiki-form-actions"]')].filter(x => x);;
        if (footer_targets.length > 0) applyDetails(footer_targets, "wiki form actions");


        Array.from(document.querySelectorAll('[contenteditable="true"]:not(.scroll-key-event)')).forEach(e => {
            e.addEventListener('keydown', function(event) {
                const range = document.createRange();
                const selection = window.getSelection();

                if (event.metaKey && event.key === 'ArrowUp') {
                    range.setStart(event.target, 0);
                    range.collapse(true);
                } else if (event.metaKey && event.key === 'ArrowDown') {
                    range.selectNodeContents(event.target);
                    range.collapse(false);
                } else {
                    return;
                }

                selection.removeAllRanges();
                selection.addRange(range);
                event.preventDefault();
            })
            e.classList.add('scroll-key-event');
        })

        Array.from(document.querySelectorAll('ul.table-of-contents li a:not(.scroll-event)')).forEach(e => {
            e.addEventListener('click', function(event) {
                let elements = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,span'))
                    .filter((element) => element.textContent.startsWith(event.target.innerText));
                if (elements.length > 0) {
                    let element = elements[0];
                    element.scrollIntoView({
                        behavior: 'auto'
                    });
                    moveCursorToStart(element);
                    // textareaのtop位置と合わせるために上へスクロール調整をする
                    window.scrollBy(0, -40);
                }
                event.preventDefault();
            })
            e.classList.add('scroll-event');
        })
    }, 1000);
}

function is_gitlab_wiki() {
    return document.URL.match(/https:\/\/gitlab.com\/.*\/wikis\/.*edit=true/);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function updateCodeBlockLanguage(language) {
    // NOTE: リストを選択する場合
    // Array.from(document.querySelectorAll('div[data-tippy-root] ul li button')).filter(e => console.log(e.textContent.trim()));

    let expand_button = document.querySelector('div[data-tippy-root] button[aria-expanded="false"]')
    if (expand_button) {
        expand_button.focus();
        await sleep(50);
        expand_button.click();
        await sleep(50);
    }

    let input = document.querySelector('div[data-tippy-root] input[placeholder="Language type"]');
    if (!input) {
        let [create_custom_type_button] = Array.from(document.querySelectorAll('div[data-tippy-root] ul li button')).filter(e => e.textContent.trim() == "Create custom type");
        if (!create_custom_type_button) return;
        create_custom_type_button.focus();
        await sleep(50);
        create_custom_type_button.click();
        await sleep(50);
    }

    input = document.querySelector('div[data-tippy-root] input[placeholder="Language type"]');
    if (!input) return;
    input.focus();
    await sleep(50);
    input.value = language;
    await sleep(50);

    let apply_button = document.querySelector('div[data-tippy-root] button[type="submit"]');
    if (!apply_button) return;
    await sleep(50);
    apply_button.focus();
    await sleep(50);
    apply_button.click();
    await sleep(50);
    expand_button.click();
}

(function() {
    'use strict';

    var content = '';
    content += '.right-sidebar-expanded .content-wrapper { padding-right: 30px; }';
    content += '.container-limited.limit-container-width { max-width: 100%; }';
    content += '.right-sidebar.wiki-sidebar { transform: translate(95%, 0px); transition: all 0.5s; }';
    content += '.right-sidebar.wiki-sidebar:hover, .right-sidebar.wiki-sidebar:focus, .right-sidebar.wiki-sidebar.focus { transform: translate(0%, 0px); transition: all 0.5s; }';

    /*
    if (document.URL.match(/https:\/\/gitlab.com\/.*\/wikis\/.*edit=true/)) {
        content += '.col-sm-2 { flex: 0 0 0.0% !important; }'
    }
    */
    // for wiki textarea
    content += '.content-wrapper { padding-right: 0 !important; padding-bottom: 0 !important; } .wiki-form .markdown-area, .wiki-form .ProseMirror { max-height: 75vh !important; }';

    content += `
    h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
        content: "";
        position: absolute;
        top: -16px;
        left: 0px;
        background-color: #000;
        color: white;
        font-size: 10px;
        padding: 1px 2px;
        border-radius: 2px;
        white-space: nowrap;
    }

    h1, h2, h3, h4, h5, h6 {
        position: relative;
    }

    h1::before { content: "H1"; background: #ff6347; }
    h2::before { content: "H2"; background: #1e90ff; }
    h3::before { content: "H3"; background: #228b22; }
    h4::before { content: "H4"; background: #c71585; }
    h5::before { content: "H5"; background: #8a2be2; }
    h6::before { content: "H6"; background: #666666; }
    `

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);

    // NOTE: 通常期のviewのwikiからeditへ遷移するときにシームレスに遷移する可能性があるためイベントは事前に登録しておく
    add_wiki_events();
    if (is_gitlab_wiki()) {
        return;
    }

    var sidebar = document.querySelectorAll('.right-sidebar.wiki-sidebar')[0];
    // NOTE: enable focus() event
    sidebar.setAttribute('tabindex', '-1');
    // force enable sidebar even small window size
    sidebar.classList.remove('right-sidebar-collapsed');
    sidebar.classList.add('right-sidebar-expanded');

    // [events \- Is there a way to detect find on the page searches in javascript \- Stack Overflow]( https://stackoverflow.com/questions/6680213/is-there-a-way-to-detect-find-on-the-page-searches-in-javascript )
    document.addEventListener('keydown', function(e) {
        // 70: f
        // 191: ?/
        if ((e.ctrlKey || e.metaKey) || (e.keyCode == 70 && (e.ctrlKey || e.metaKey)) || (e.keyCode == 191)) {
            if (is_gitlab_wiki()) {
                return;
            }
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
