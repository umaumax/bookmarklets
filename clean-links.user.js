// ==UserScript==
// @name         Clean Visited Links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mark all links on the page as visited and manage visited links using localStorage
// @author       Your Name
// @match        https://qiita.com/
// @match        https://zenn.dev/articles*
// @match        https://2chmm.com/*
// @match        https://tver.jp/tags/*
// @match        https://setusoku.com/*
// @match        https://www.enjoytokyo.jp/event/list/*
// @match        https://www.walkerplus.com/event_list/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

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

(function() {
    'use strict';

    const VISITED_LINKS_KEY = 'visitedLinks';

    // Function to get visited links from localStorage
    function getVisitedLinks() {
        const visitedLinks = localStorage.getItem(VISITED_LINKS_KEY);
        return visitedLinks ? JSON.parse(visitedLinks) : [];
    }

    // Function to save visited links to localStorage
    function saveVisitedLinks(links) {
        localStorage.setItem(VISITED_LINKS_KEY, JSON.stringify(links));
    }

    const whitelistPatterns = [
        /^https:\/\/zenn\.dev\/articles.*$/,
        /^https:\/\/2chmm\.com\/.*$/,
        /^https:\/\/tver\.jp\/(?!episodes\/).*$/,
        new RegExp('^https://setusoku\.com/[^/]$'),
        new RegExp('^https://setusoku\.com/page/.*$'),
        new RegExp('^https://www.enjoytokyo.jp/event/list/ranking/.*$'),
        new RegExp('^https://www.enjoytokyo.jp/event/list/its.*$'),
        new RegExp('^https://www.walkerplus.com/event_list/[0-9]+/.*$'),
    ];

    // Function to mark all links as visited
    function markLinksVisited() {
        const links = document.querySelectorAll('a');
        const visitedLinks = getVisitedLinks();

        links.forEach(link => {
            const url = link.href;
            if (!visitedLinks.includes(url)) {
                visitedLinks.push(url);
            }
            link.classList.add('visited');
        });

        saveVisitedLinks(visitedLinks);
        cleanVisitedLinks();
        // scroll to top
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }

    // Function to clean visited links from localStorage
    function cleanVisitedLinks() {
        // localStorage.removeItem(VISITED_LINKS_KEY);
        const links = document.querySelectorAll('a.visited:not([style*="display: none"])');
        links.forEach(link => {
            const isWhitelisted = whitelistPatterns.some(pattern => pattern.test(link.href));
            if (isWhitelisted) {
                console.log('🔒 keep:', link.href);
                return;
            }
            console.log('🗑 clean:', link.href);
            link.style.display = 'none';
            // link.remove();
        });
        // for qiita.com
        document.querySelectorAll('article').forEach(article => {
            if (!article.querySelector('a:not([style*="display: none"])')) {
                article.style.display = 'none';
                // article.remove();
            }
        });
        // for tver.jp
        document.querySelectorAll('div[class^="result-list_content__"]').forEach(e => {
            if (!e.querySelector('a:not([style*="display: none"])')) {
                e.style.display = 'none';
                // e.remove();
            }
        });
        // for www.enjoytokyo.jp
        document.querySelectorAll('li.article-list_vertical-item.separator').forEach(e => {
            if (!e.querySelector('a:not([style*="display: none"])')) {
                e.style.display = 'none';
                // e.remove();
            }
        });
        // for www.walkerplus.com
        document.querySelectorAll('li.m-mainlist__item').forEach(e => {
            if (!e.querySelector('a:not([style*="display: none"])')) {
                e.style.display = 'none';
                // e.remove();
            }
        });
        // for zenn.com
        const emptyDivs = Array.from(document.querySelectorAll('div:not([style*="display: none"])')).filter(div => {
            const children = Array.from(div.children);
            return children.length > 0 && children.every(child => window.getComputedStyle(child).display === 'none');
        });
        // const emptyDivs = document.querySelectorAll('div:empty');
        emptyDivs.forEach(div => {
            div.style.display = 'none';
        });
        // emptyDivs.forEach(div => div.remove());
    }

    // Function to apply the visited style to visited links
    function applyVisitedStyle() {
        const visitedLinks = getVisitedLinks();
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            if (visitedLinks.includes(link.href)) {
                link.classList.add('visited');
            }
        });
    }

    // Add CSS for visited links
    const style = document.createElement('style');
    style.innerHTML = `
        a.visited {
            color: purple !important;
        }
    `;
    document.head.appendChild(style);

    // Apply visited style on page load
    window.addEventListener('load', applyVisitedStyle);
    window.addEventListener('load', cleanVisitedLinks);

    if ((new RegExp('^https://tver.jp/.*')).test(window.location.href)) {
        setInterval(() => {
            applyVisitedStyle();
            cleanVisitedLinks();
        }, 500);
    }

    if ((new RegExp('^https://www.walkerplus.com/event_list/.*')).test(window.location.href)) {
        setInterval(() => {
            applyVisitedStyle();
            cleanVisitedLinks();
        }, 500);
    }

    var prevURL = location.href;
    const observer = new MutationObserver(() => {
        if (prevURL != location.href) {
            console.log('URL changed:', location.href);
            prevURL = location.href;
            applyVisitedStyle();
            cleanVisitedLinks();
        }
    });
    observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true
    });

    // Add menu commands to trigger the functions
    GM_registerMenuCommand("🔗✅: Mark All Links as Visited", markLinksVisited);
    GM_registerMenuCommand("🔗🗑️🧹: Clean Visited Links", function() {
        applyVisitedStyle();
        cleanVisitedLinks();
    });

    function appendButton() {
        var button = document.createElement("button");
        button.textContent = "🔗✅: Mark All Links as Visited";
        button.style['z-index'] = 9999;
        button.style.position = 'fixed';
        button.style.left = '50%';
        button.style.top = '10px';
        button.style.padding = '2px 4px';
        button.style['border-radius'] = '4px';
        button.style['background-color'] = '#777';
        button.style.color = '#eee';
        button.onclick = markLinksVisited;
        button.className = 'mark-action';
        document.body.appendChild(button);

        add_css(['button.mark-action { border: 2px solid transparent; transition: border 0.3s ease; } button.mark-action:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.6); border: 2px solid #333; }']);
    }
    appendButton();
})();
