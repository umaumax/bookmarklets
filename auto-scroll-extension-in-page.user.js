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
// @require http://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

var done_flag = false;

function auto_scroll_to_link_tag_id() {
    if (done_flag) {
        return;
    }

    var link_tag_id = '';
    var matches = location.href.match(/#(.+)/);
    if (matches && matches.length >= 2) {
        link_tag_id = decodeURI(matches[1]);
    } else {
        done_flag = true;
        return;
    }

    var element = document.getElementById(link_tag_id);
    console.log('💡', link_tag_id)
    if (element != null) {
        // do nothing
        return;
    }

    var elements = Array.from(document.querySelectorAll('span,h1,h2,h3,h4,h5,h6'))
        .filter((element) => element.textContent.includes(link_tag_id));
    if (elements.length > 0) {
        var element = elements[0];
        element.scrollIntoView({
            behavior: 'smooth'
        });
        done_flag = true;
        return;
    }

    // NOTE: 上記の条件に合致する要素がロード中の場合に備えてエラーを無視する
    try {
        var elements = $(link_tag_id);
        if (elements.length < 1) {
            return;
        }

        // disable reload auto scrolling
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        var target = $(elements[0]);
        $(window).scrollTop(target.offset().top - target.outerHeight());
        done_flag = true;
    } catch (error) {
        console.error(error);
    }
}

var timer;
(function() {
    'use strict';

    auto_scroll_to_link_tag_id();
    // 500ms
    timer = setInterval(auto_scroll_to_link_tag_id, 500);
    // 10sec
    setTimeout(function(timer) {
        clearInterval(timer)
    }, 10000, timer);

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
                var target_query = $.map($('.js-wiki-page-content>h3,.js-wiki-page-content>h2').filter(function(i, e) {
                    return $(e).text().trim().length > 0 && $(window).scrollTop() <= $(e).offset().top + $(e).outerHeight() && $(e).offset().top <= $(window).scrollTop() + $(window).height();
                }).filter(function(i, e) {
                    return i == 0
                }), function(v, i) {
                    //                    return "pre:contains('" + $(v).text().trim() + "')"; # for jquery
                    return $(v).text().trim();
                }).join(',');
                var edit_query = 'edit';
                if (target_query != '') {
                    edit_query = "edit#" + target_query;
                }
                document.location.href = location.protocol + '//' + location.host + location.pathname + '/' + edit_query;
                event.preventDefault();
            }
            return true;
        });
    }
})();
