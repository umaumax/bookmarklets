// ==UserScript==
// @name         GitHub Issue Extension
// @namespace
// @version      0.1
// @description  extend GitHub Issue features
// @author       You
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @match        https://github.com/*/issues/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

$(function() {
    'use strict';

    $('.timeline-comment-header-text').each(function() {
        var edit_button_elem = $('<span>', {
            class: 'btn btn-sm btn-primary m-0 ml-2 ml-md-2',
            text: 'Edit'
        });
        edit_button_elem.click(function() {
            var top_elem = edit_button_elem.parent().parent();
            var three_dots_icon = top_elem.find('summary.timeline-comment-action.Link--secondary.btn-link:last');
            if (!three_dots_icon) {
                return;
            }
            three_dots_icon.click();

            var click_edit_button_loop = function() {
                var real_edit_button = top_elem.find('button.js-comment-edit-button');
                if (real_edit_button && real_edit_button.is(":visible")) {
                    console.log("GitHub Edit Button Found");
                    real_edit_button.click();
                } else {
                    console.log("GitHub Edit Button Not Found");
                    setTimeout(click_edit_button_loop, 100);
                }
            }
            click_edit_button_loop();
        });
        $(this).append(edit_button_elem);
    });
});
