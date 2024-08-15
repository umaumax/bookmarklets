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
    console.log('Started to exapnd lines!');

    var fileboxes = $(".file-actions");
    fileboxes.prepend('<div class=""><a class="ex_file_expand_btn btn btn-sm">💡Expand lines!</a></div>');
    $('.ex_file_expand_btn').on('click', function() {
        expandExpand($(this).closest('[data-details-container-group="file"]'))
    });

    var box = $(".pr-review-tools").first();
    box.prepend('<div class="js-reviews-container diffbar-item mr-3"><a id="_ex_expand_btn" class="btn btn-sm">💡Expand All lines!</a></div>');
    $('#_ex_expand_btn').on('click', function() {
        expandExpand($('body'))
    });

    function expandExpand(top_element) {
        var loadMore = $(top_element).find('.js-expandable-line a');
        if (loadMore.length !== 0) {
            console.log('Clicking all these "Load more": ' + loadMore.length);
            loadMore.each(function(index) {
                this.click();
                console.log(index, $(this))
            });
            setTimeout(function() {
                expandExpand(top_element)
            }, 500);
            return;
        }

        console.log('Completed to exapnad lines!');
    }
}

function GitHubPRDiffLinkGenerator() {
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
            var url = elem.href;
            diff_url = url.replace(/\/commits\/.*/, '/files/')
        } else {
            var url = prev_elem.href;
            diff_url = url.replace(/\/commits\//, '/files/') + '..HEAD'
        }
        prev_elem = elem
        $(elem).parent().append('<a href="' + diff_url + '"class="link-gray">' + '🎯DIFF' + '</a>');
    }
}

(function() {
    'use strict';

    GitHubPRLineExpander()
    GitHubPRDiffLinkGenerator()
})();
