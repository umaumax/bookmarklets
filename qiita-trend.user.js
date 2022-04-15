// ==UserScript==
// @name         Filter Latest Trend at Qiita
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  filter yersterday topics only
// @author       You
// @match        https://qiita.com/trend
// @icon         https://www.google.com/s2/favicons?domain=qiita.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let header = document.getElementsByClassName('st-NewHeader_subNavigationTabContainer')[0];
    let a = document.createElement("a");
    a.href = '#';
    a.appendChild(document.createTextNode("⭐最新(昨日の日付)"));
    a.classList.add('st-NewHeader_subNavigationItem');
    a.onclick = function filter_lateset() {
        // document.getElementsByClassName('st-NewHeader_subNavigationItem').forEach(function(e) {
        // e.classList.remove('is-active');
        // });
        // a.classList.add('is-active');

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        document.querySelectorAll('article header time').forEach(function(e) {
            let match = e.innerText.match(/(?<year>[0-9]+)年(?<month>[0-9]+)月(?<day>[0-9]+)日/);
            if (match && (match.groups.month != (yesterday.getMonth() + 1) || match.groups.day != yesterday.getDate())) {
                e.closest('article').style.display = 'none';
            }
        })
    }
    header.appendChild(a);
})();
