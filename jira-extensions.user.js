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
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function get_hash_color(text) {
    return "hsl(" + text.hashCode() % 360 + ", 75%, 75%)";
}

(async function() {
    'use strict';

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
            let extra_line = ticket.querySelector('.ghx-extra-field-content')
            if (extra_line != null && extra_line.innerText != "None") {
                extra_line.innerText.split(',').forEach((text) => {
                    let label = document.createElement("aui-badge")
                    label.style.padding = "6px"
                    label.style.margin = "4px"
                    label.style.color = "black"
                    label.style.background = get_hash_color(text)
                    label.textContent = text
                    ticket.querySelector('.ghx-summary').after(label)
                })
            }
        })
    }
})()
