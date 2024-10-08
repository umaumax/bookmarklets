// ==UserScript==
// @name         JIRA extensions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  JIRA extensions
// @author       You
// @match        https://*/*jira*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.atlassian.com
// @grant        none
// ==/UserScript==

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

String.prototype.hashCode = function() {
    return [...this].reduce(
        (hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0,
        0
    );
}

function get_hash_color(text) {
    return "hsl(" + text.hashCode() % 360 + ", 75%, 75%)";
}

(async function() {
    'use strict';

    // デフォルトでバックログのチケットの表示数が100なので、全てとするためにURLのGETパラメータを書き換えてリダイレクトする
    let url = new URL(window.location.href);
    if (url.searchParams.has('issueLimit')) {
        var issueLimit = url.searchParams.get('issueLimit');
        if (issueLimit == '100') {
            url.searchParams.set('issueLimit', '-1');
            window.location.replace(url.toString());
        }
    }

    // If you press ctrl + enter to creat a ticket, you will get 405 page.
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            event.stopPropagation();
            // trigger Enter key event at focused element
            const enterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true,
                cancelable: true
            });
            document.activeElement.dispatchEvent(enterEvent);
        }
    }, true);

    while (true) {
        while (document.querySelectorAll('.ghx-issue-content .ghx-extra-field-content').length == 0) {
            await sleep(100);
        }
        await sleep(100);

        // hide line which displays labels
        // backlog
        let switched_flag = false;
        Array.from(document.querySelectorAll('.ghx-plan-extra-fields.ghx-plan-extra-fields-1.ghx-row')).forEach((e) => {
            switched_flag |= e.style.display != "none";
            e.style.display = "none";
        })
        // active sprint
        Array.from(document.querySelectorAll('.ghx-issue-content .ghx-extra-field-row')).forEach((e) => {
            switched_flag |= e.style.display != "none";
            e.style.display = "none";
        })
        if (!switched_flag) continue;


        // create labels of elements
        Array.from(document.querySelectorAll('.ghx-issue-content')).forEach((ticket) => {
            Array.from(ticket.querySelectorAll('.ghx-summary .ext-label')).forEach((e) => {
                e.remove();
            });
            let extra_line = ticket.querySelector('.ghx-extra-field-content')
            if (extra_line != null && extra_line.innerText != "None") {
                extra_line.innerText.split(',').forEach((text) => {
                    let label = document.createElement("aui-badge")
                    label.classList.add("ext-label");
                    label.style.padding = "6px"
                    label.style.margin = "4px"
                    label.style.color = "black"
                    label.style.background = get_hash_color(text.trim())
                    console.log(text.trim(), get_hash_color(text.trim()))
                    label.textContent = text
                    ticket.querySelector('.ghx-summary').after(label)
                })
            }
        })
    }
})()
