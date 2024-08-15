// ==UserScript==
// @name         gitlab wiki sidebar expander
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  expand gitlab wiki sidebar
// @author       You
// @match        https://gitlab.com/*/wikis/*
// @grant        none
// ==/UserScript==

function add_wiki_events() {
    document.addEventListener('keydown', function(event) {
        if (!is_gitlab_wiki) return;

        if (event.key === '`') {
            const selectedText = window.getSelection().toString();
            if (selectedText) {
                const button = document.querySelector('button[aria-label="Code"][title="Code"][data-testid="code"]');
                if (button) {
                    button.click();
                    event.preventDefault();
                }
            }
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

    if (document.URL.match(/https:\/\/gitlab.com\/.*\/wikis\/.*edit=true/)) {
        content += '.col-sm-2 { flex: 0 0 0.0% !important; }'
    }

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
