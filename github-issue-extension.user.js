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
            setTimeout(function() {
                var real_edit_button = top_elem.find('button.js-comment-edit-button');
                real_edit_button.each(function() {
                    $(this).click();
                });
            }, 300);
        });
        $(this).append(edit_button_elem);
    });
});
