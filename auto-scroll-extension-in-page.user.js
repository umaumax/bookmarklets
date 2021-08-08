// ==UserScript==
// @name         auto scroll extension in a page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  auto scroll extension in a page
// @author       You
// @match        https://*/*
// @exclude      https://www.slideshare.net/*
// @grant        none
// @require http://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

var done_flag = false;

function auto_scroll_to_link_tag_id() {
    if (done_flag) {
        return;
    }

    var link_tag_id = '';
    var matches = location.href.match(/#(.*)/);
    if (matches && matches.length >= 2) {
        link_tag_id = decodeURI(matches[1]);
    } else {
        done_flag = ture;
        return;
    }

    var element = document.getElementById(link_tag_id);
    if (element != null) {
        // do nothing
        return;
    }

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
            // e: 69
            if (e.keyCode == 69) {
                var target_query = $.map($('.js-wiki-page-content>h2,.js-wiki-page-content>h3').filter(function(i, e) {
                    return $(e).text().trim().length > 0 && $(window).scrollTop() <= $(e).offset().top + $(e).outerHeight() && $(e).offset().top <= $(window).scrollTop() + $(window).height();
                }), function(v, i) {
                    return "pre:contains('# " + $(v).text().trim() + "')";
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
