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

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

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

async function check_auto_login() {
    console.log(Date(Date.now()));
    console.log('[check_auto_login]')
    console.log('url', document.URL)
    console.log('referrer', document.referrer)

    const session_timeout_urls = [
        'https://ctrl.kp-net.com/settingcontrol/remotevisualization/simplevisualization/updating/enduser',
        'https://ctrl.kp-net.com/settingcontrol/processLogin',
    ];
    if (session_timeout_urls.includes(document.URL)) {
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
        // NOTE: This is need to refresh input forms' values.
        document.getElementById('loginid').focus()
        // NOTE: Wait until the focus process on the element is complete.
        await sleep(1000)
        if (session_timeout_urls.includes(document.referrer) || document.referrer.match('https://ctrl.kp-net.com/settingcontrol/login.*')) {
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

(async function() {
    'use strict';

    let check_auto_login_interval_ms = 60 * 1000;
    while (true) {
        await check_auto_login()
        await sleep(check_auto_login_interval_ms)
    }
})();
