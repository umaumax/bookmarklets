// ==UserScript==
// @name         GitHub Cache Extension
// @namespace
// @version      0.1
// @description  extend GitHub features
// @author       You
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js
// @resource     jquery.modal.min.css https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css
// @resource     github-dark.min.css https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github-dark.min.css
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

GM_addStyle(GM_getResourceText("jquery.modal.min.css"));

function IsGitHubURL(url) {
    return url.match(/https:\/\/github.com\/.*/)
}

function getCurrentURL() {
    return location.protocol + '//' + location.host + location.pathname
}

var fileContentCache = null

function cacheCurrentGitHubPageFile() {
    var url = getCurrentURL()
    var textarea = $('textarea#read-only-cursor-text-area.react-blob-print-hide').first()
    var fileContent = textarea.text()
    if (fileContent == "" || fileContentCache == fileContent) {
        return;
    }
    fileContentCache = fileContent

    GM_setValue(url, fileContent);

    console.log("Cache ", url, fileContent.length / 1024.0, "KB");
    return true;
}

function getGitHubPageFile(url) {
    return GM_getValue(url, null);
}

function pollingHighlightPlugin() {
    if (typeof hljs !== "undefined") {
        $('body').prepend(`<script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js"></script>`);
        return
    }
    setTimeout(pollingHighlightPlugin, 1000)
}

let activeKeyEvent = null;

document.addEventListener('keydown', (event) => {
    activeKeyEvent = event;
});

document.addEventListener('keyup', (event) => {
    activeKeyEvent = event;
});

function showModalWindow(fileContent, hash) {
    var modalCode = document.getElementById('_ex_code_modal_code');
    modalCode.innerHTML = fileContent
    hljs.highlightAll();
    hljs.lineNumbersBlock(modalCode, {
        singleLine: true
    });

    var modal = $('#_ex_code_modal');
    modal.modal();

    if (!cssInitFlag) {
        // WARN: This css conflicts original css of current page.
        GM_addStyle(GM_getResourceText("github-dark.min.css"));
        cssInitFlag = true;
    }

    setTimeout(() => {
        var startLineNo = 0
        var endLineNo = -1
        var oneLineMatch = hash.match(/^#L([0-9]+)$/)
        if (oneLineMatch) {
            startLineNo = Number(oneLineMatch[1])
            endLineNo = Number(oneLineMatch[1])
        }
        var multiLineMatch = hash.match(/^#L([0-9]+)-L([0-9]+)$/)
        if (multiLineMatch) {
            startLineNo = Number(multiLineMatch[1])
            endLineNo = Number(multiLineMatch[2])
        }
        for (var lineNo = startLineNo; lineNo <= endLineNo; lineNo++) {
            var line = document.querySelector(
                '.hljs-ln-line[data-line-number="' + lineNo + '"]');
            line.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
            $(line).css('color', '#F0F090');
        }
    }, 100)
}

var cssInitFlag = false;

let currentHoveredEl = null;

$(function() {
    'use strict';

    // NOTE: [highlight.js not detected! · Issue #78 · wcoder/highlightjs-line-numbers.js]( https://github.com/wcoder/highlightjs-line-numbers.js/issues/78 )
    $('body').prepend(`<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>`);
    pollingHighlightPlugin()

    if (IsGitHubURL(document.URL)) {
        setInterval(() => {
            cacheCurrentGitHubPageFile()
        }, 1000);
    }

    var body = $("body").first();
    body.prepend('<div id="_ex_code_modal" class="modal" style="max-width:100%; padding:64px 16px"><pre><code id="_ex_code_modal_code" style="width:auto; height:640px;"></code></pre><a href="#" rel="modal:close">Close</a></div>');
    $('body').prepend('<style>.hljs { white-space: pre; word-wrap: normal; overflow-wrap: normal; }<style/>');

    document.addEventListener('mouseover', function(event) {
        var hoveredEl = event.target
        currentHoveredEl = hoveredEl
        if (hoveredEl.tagName !== 'A') {
            return;
        }

        var url = hoveredEl.protocol + '//' + hoveredEl.host + hoveredEl.pathname
        var hash = hoveredEl.hash
        if (!IsGitHubURL(url)) {
            return
        }
        var currentURL = getCurrentURL()
        if (url == currentURL) {
            return
        }

        var fileContent = getGitHubPageFile(url)
        if (fileContent == null) {
            return
        }
        hoveredEl.setAttribute('title', 'alt: show this link content');

        const mouseover_time_ms = 100
        let intervalId = undefined
        let f = function() {
            if (intervalId && currentHoveredEl != hoveredEl) {
                clearInterval(intervalId)
                return false
            }
            if (activeKeyEvent && activeKeyEvent.altKey) {
                showModalWindow(fileContent, hash)
                if (intervalId) {
                    clearInterval(intervalId)
                }
                return true
            }
            return false
        };
        if (!f()) {
            intervalId = setInterval(f, mouseover_time_ms)
        }
    });
});
