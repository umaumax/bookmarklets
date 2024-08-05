// ==UserScript==
// @name         Manage Visited Links with LocalStorage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Mark all links on the page as visited and manage visited links using localStorage
// @author       Your Name
// @match        https://qiita.com/
// @match        https://zenn.dev/articles*
// @grant        GM_registerMenuCommand
// ==/UserScript==

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
    }

    // Function to clean visited links from localStorage
    function cleanVisitedLinks() {
        // localStorage.removeItem(VISITED_LINKS_KEY);
        const links = document.querySelectorAll('a.visited');
        links.forEach(link => {
            const isWhitelisted = whitelistPatterns.some(pattern => pattern.test(link));
            if (isWhitelisted) return;
            link.remove();
        });
        document.querySelectorAll('article').forEach(article => {
            if (!article.querySelector('a')) {
                article.remove();
            }
        });
        const emptyDivs = document.querySelectorAll('div:empty');
        emptyDivs.forEach(div => div.remove());
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
    GM_registerMenuCommand("🔗🗑️🧹: Clean Visited Links", cleanVisitedLinks);
})();
