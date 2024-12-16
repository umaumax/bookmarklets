// ==UserScript==
// @name         auto scroll extension in a page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto scroll extension in a page
// @author       You
// @match        https://gitlab.com/*
// @exclude      https://www.slideshare.net/*
// @exclude      https://wandbox.org/*
// @exclude      https://web-ace.jp/youngaceup/*
// @exclude      https://www.yodobashi.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

var done_flag = false;

function auto_scroll_to_link_tag_id() {
    if (done_flag) {
        return;
    }

    let link_tag_id = '';
    const hyperlink = localStorage.getItem('hyperlink');
    let matches = location.href.match(/#(.+)/);
    if (hyperlink) {
        link_tag_id = hyperlink;
    } else {
        if (matches && matches.length >= 2) {
            link_tag_id = decodeURI(matches[1]);
        } else {
            done_flag = true;
            return;
        }
    }

    let element = document.getElementById(link_tag_id);
    if (element != null) {
        // do nothing
        return;
    }

    let elements = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,span'))
        .filter((element) => element.textContent.startsWith(link_tag_id));
    if (elements.length > 0) {
        let element = elements[0];
        element.scrollIntoView({
            behavior: 'auto'
        });
        // textareaのtop位置と合わせるために上へスクロール調整をする
        window.scrollBy(0, -40);
        done_flag = true;
        return;
    }

    // NOTE: 上記の条件に合致する要素がロード中の場合に備えてエラーを無視する
    try {
        let elements = $(link_tag_id);
        if (elements.length < 1) {
            return;
        }

        // disable reload auto scrolling
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        let target = $(elements[0]);
        $(window).scrollTop(target.offset().top - target.outerHeight());
        done_flag = true;
    } catch (error) {
        console.error(link_tag_id, error);
    }
}

var timer;
(function() {
    'use strict';

    auto_scroll_to_link_tag_id();
    // 500ms
    timer = setInterval(auto_scroll_to_link_tag_id, 500);
    // 10sec
    setTimeout(function() {
        done_flag = true;
    }, 10000);

    /* for only gitlab.com wikis */
    // override 'e' edit shortcut key
    var new_page = document.URL.includes('?random_title=true');
    if (document.URL.match(/https:\/\/gitlab.com\/.*\/wikis\/.*/) && !document.URL.match(/https:\/\/gitlab.com\/.*\/wikis\/.*\/edit/) && !new_page) {
        document.addEventListener('keydown', function(e) {
            // ignore while typing something at input
            var focus_elements = $(':focus');
            if (focus_elements.length != 0) {
                if (focus_elements.first().is("input")) {
                    return true;
                }
            }
            // e: 69
            if (e.keyCode == 69) {
                var target_query = $.map($('.js-wiki-page-content>h3,.js-wiki-page-content>h2,.js-wiki-page-content>h1').filter(function(i, e) {
                    return $(e).text().trim().length > 0 && $(window).scrollTop() <= $(e).offset().top + $(e).outerHeight() && $(e).offset().top <= $(window).scrollTop() + $(window).height();
                }).filter(function(i, e) {
                    return i == 0
                }), function(v, i) {
                    return $(v).text().trim();
                }).join(',');
                localStorage.setItem('hyperlink', target_query);
                done_flag = false;
                // event.preventDefault();
            }
            return true;
        });
    }
})();
