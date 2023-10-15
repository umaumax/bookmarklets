// ==UserScript==
// @name         GitHub PR: line expander!
// @namespace
// @version      0.5
// @description  try to expand PR lines
// @author
// @license      MIT
// @match        https://github.com/*/*/pull/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

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
})();
