// ==UserScript==
// @name         GitHub PR Extension
// @namespace
// @version      0.5
// @description  try to expand PR lines and generate diff links
// @author
// @license      MIT
// @match        https://github.com/*/*/pull/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

function GitHubPRLineExpander() {
    var fileboxes = $(".file-actions > div > div");
    fileboxes.before('<div class="d-flex" style="margin-left: 8px; padding: 8px;"><a class="ex_file_expand_btn btn btn-sm" style="background-color: #ffbf8b">💡Expand lines!</a></div>');
    $('.ex_file_expand_btn').on('click', function() {
        expandExpand($(this).closest('[data-details-container-group="file"]'))
    });

    var box = $(".pr-review-tools").first();
    box.prepend('<div class="js-reviews-container diffbar-item mr-3"><a id="_ex_expand_btn" class="btn btn-sm" style="background-color: #ffbf8b">💡Expand All lines!</a></div>');
    $('#_ex_expand_btn').on('click', function() {
        expandExpand($('body'))
    });

    function expandExpand(top_element) {
        var loadMore = $(top_element).find('.js-expandable-line a');
        if (loadMore.length == 0) {
            return;
        }
        console.log('[INFO] Clicking all these "Load more": ' + loadMore.length);
        loadMore.each(function(index) {
            this.click();
            console.log(index, $(this))
        });
        setTimeout(function() {
            expandExpand(top_element)
        }, 500);
    }
}

function GitHubPRDiffLinkGenerator() {
    // github pull request main page
    var commit_hash_hrefs = document.querySelectorAll('code > a.Link--secondary');
    if (commit_hash_hrefs.length == 0) {
        console.error("[clipboard copy button generater] This extension can not find git hash href elements.")
    }

    var prev_elem = null;
    for (var i = 0; i < commit_hash_hrefs.length; i++) {
        var elem = commit_hash_hrefs[i];
        let text = elem.innerText;
        if (!text.match(/[0-9a-f]{7}/)) continue;

        var diff_url = null;
        if (prev_elem == null) {
            diff_url = elem.href.replace(/\/commits\/.*/, '/files/')
        } else {
            diff_url = prev_elem.href.replace(/\/commits\//, '/files/') + '..HEAD'
        }
        prev_elem = elem
        $(elem).parent().append('<a href="' + diff_url + '"class="link-gray">' + '🎯DIFF' + '</a>');
    }
}

function run(url) {
    GitHubPRLineExpander()
    GitHubPRDiffLinkGenerator()
}

(function() {
    'use strict';

    const originalPushState = history.pushState;
    history.pushState = function() {
        originalPushState.apply(this, arguments);
        // NOTE: wait loading a new page
        setTimeout(() => {
            run(location.href);
        }, 2500);
    };
    run(location.href);
})();
