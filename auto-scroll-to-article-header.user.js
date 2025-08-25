// ==UserScript==
// @name         Auto scroll to article header
// @namespace    http://tampermonkey.net/
// @version      2024-09-04
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @exclude      https://b.hatena.ne.jp/*
// @exclude      https://gihyo.jp/*
// @exclude      *://localhost:*/*
// @grant        none
// ==/UserScript==

function get_article_header() {
    const article_header_selector = [
        '#blogbody_id',
        'article header',
        '.article-header',
        'h3:has(a[title])',
        'h2:has(a[title])',
        'div.day:has(div.body)',
        'div.blogbody:has(div.titlebody)',
        'div#info-header',
        'section#report',
        'h1.article_title',
        'div.mainEntryBlock',
    ].join(', ');
    let article_header = document.querySelector(article_header_selector);
    if (article_header) return article_header;
    return null;
}

function auto_scroll(behavior = 'smooth') {
    let article_header = get_article_header();
    if (article_header) {
        const article_header_rect = article_header.getBoundingClientRect();
        if (article_header_rect.top < 200 || article_header_rect.top > document.body.scrollHeight * 0.3) {
            console.log('[INFO] skip article header:', article_header_rect, document.body.scrollHeight);
            return;
        }
        const allElements = document.querySelectorAll('*');
        const stickyElements = Array.from(allElements).filter(element => {
            if (window.getComputedStyle(element).position === 'sticky') {
                console.log('[DEBUG] header?:', window.getComputedStyle(element).position, element.getBoundingClientRect());
            }
            const rect = element.getBoundingClientRect();
            // NOTE: 有効なヘッダ領域であるかどうか
            return window.getComputedStyle(element).position === 'sticky' && rect.top < 60 && rect.height > 0;
        });

        let header_height = 0;
        if (stickyElements.length > 0) {
            header_height = stickyElements[0].getBoundingClientRect().height;
        }
        console.log('[INFO] header_height:', header_height);
        console.log('[INFO] scroll to :', article_header);
        article_header.scrollIntoView({
            behavior: behavior
        });
        window.scrollBy(0, -20 - header_height);
    }
}

function scrollToElementHorizontally(element) {
    const elementRect = element.getBoundingClientRect();
    const scrollLeft = window.scrollX + elementRect.left - (window.innerWidth / 2) + (elementRect.width / 2);

    window.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
    });
}

function adjustHolizontalScrollPosition() {
    let article_header = get_article_header();
    if (article_header) {
        scrollToElementHorizontally(article_header);
    }
}

(function() {
    'use strict';

    // only for top page
    if (window.self !== window.top) {
        // early return at iframe page
        console.log(`[INFO] skip iframe page: ${window.location.herf}`);
        return;
    }

    // for resize
    window.addEventListener('resize', adjustHolizontalScrollPosition);

    // NOTE: スクロール位置を記録しているブラウザではその位置を優先するため
    if (window.scrollY < 50) {
        auto_scroll('instant');

        // for reload (スクロール位置が遅れて反映される場合向け)
        setTimeout(() => {
            auto_scroll('instant');
        }, 1000);
    }
})();
