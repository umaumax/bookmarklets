// ==UserScript==
// @name         ctrl.kp-net.com extension
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add features to this site
// @author       You
// @match        https://ctrl.kp-net.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.kids.isas.jaxa.jp
// ==/UserScript==

function searchTextContents(element_tag, text) {
    return Array.from(document.querySelectorAll(element_tag))
        .filter((element) => element.textContent === text)
}

function searchTextContent(element_tag, text) {
    let elements = searchTextContents(element_tag, text)
    if (elements.length > 0) {
        return elements[0];
    }
    return null;
}

function check_auto_login() {
    console.log(Date(Date.now()));
    console.log('check_auto_login')
    console.log('url', document.URL)
    console.log('referrer', document.referrer)
    const session_timeout_url = 'https://ctrl.kp-net.com/settingcontrol/remotevisualization/simplevisualization/updating/enduser'
    if (document.URL == session_timeout_url) {
        if (searchTextContent('span', 'セッションタイムアウト')) {
            let button = searchTextContent('button', 'ログインに戻る');
            if (button) {
                console.log('back to login')
                button.click();
            } else {
                console.log('not found "ログインに戻る" button')
            }
        }
        return;
    }

    if (document.URL.match('https://ctrl.kp-net.com/settingcontrol/login.*')) {
        if (document.referrer == session_timeout_url) {
            let button = searchTextContent('button', 'ログイン');
            console.log(button)
            if (button) {
                console.log('do login')
                button.click();
            } else {
                console.log('not found "ログイン" button')
            }
        }
    }

}

(function() {
    'use strict';

    let check_auto_login_interval_ms = 60 * 1000;
    setInterval(check_auto_login, check_auto_login_interval_ms);
})();
