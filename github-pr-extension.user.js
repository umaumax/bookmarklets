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

function add_css(datas) {
    var head = document.getElementsByTagName('head')[0];

    datas.forEach(function(data) {
        var style;
        if (data.startsWith('http')) {
            style = document.createElement('link');
            var url = data;
            style.href = url;
            style.rel = 'stylesheet';
        } else {
            style = document.createElement('style');
            var raw_text = data;
            style.insertAdjacentHTML('beforeend', raw_text);
        }
        style.type = 'text/css';
        head.append(style);
    });
}

function highlightText(highlight, css_selector, regex, css_style_name) {
    let elements = document.querySelectorAll(css_selector);

    elements.forEach((element) => {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        const nodes_offset_infos = [];
        let offset = 0;
        nodes.forEach((node) => {
            nodes_offset_infos.push({
                start: offset,
                end: offset + node.length,
                node: node
            });
            offset += node.length;
        });

        // reset global variable
        regex.lastIndex = 0;
        let match;
        while ((match = regex.exec(element.textContent)) !== null) {
            const startOffset = match.index;
            const endOffset = startOffset + match[0].length;

            const start_node_info = nodes_offset_infos.find((x) => x.start <= startOffset && startOffset < x.end);
            const end_node_info = nodes_offset_infos.find((x) => x.start < endOffset && endOffset <= x.end);

            const range = document.createRange();
            range.setStart(start_node_info.node, startOffset - start_node_info.start);
            range.setEnd(end_node_info.node, endOffset - end_node_info.start);
            highlight.add(range);
        }
    });
}

function GitHubPRSyntaxHighLight() {
    // WARN: Please add the g flag, because regex.exec() while loop is used.
    // NOTE: もとからあるコードはspan.blob-code-innerであるが、expandしたらtd.blob-code-innerとして生成される模様
    const highlight_settings = [{
            name: "cpp-namespace",
            rules: [
                ['div.file-header[data-file-type=".hpp"] + * .blob-code-inner', /[a-zA-Z0-9_]*(::[a-zA-Z0-9_]*)+(?![\(0-9a-zA-Z:])/g],
                ['div.file-header[data-file-type=".cpp"] + * .blob-code-inner', /[a-zA-Z0-9_]*(::[a-zA-Z0-9_]*)+(?![\(0-9a-zA-Z:])/g],
            ]
        },
        {
            name: "number",
            rules: [
                ['.blob-code-inner', /\b[0-9]+(.[0-9]+)?\b/g],
            ],
        },
        {
            name: "const",
            rules: [
                ['.blob-code-inner', /\b[A-Z_][A-Z0-9_]+\b/g],
            ],
        },
        {
            name: "sign",
            rules: [
                ['.blob-code-inner', /[#\[\]!=()<>{},.:;+*\-\/|&]/g],
            ],
        },
        {
            name: "quote",
            rules: [
                ['.blob-code-inner', /['"]/g],
            ],
        },
    ];
    highlight_settings.forEach((x) => {
        const highlight = new Highlight();
        x.rules.forEach((rule) => {
            const css_selector = rule[0];
            const regex_rule = rule[1];
            highlightText(highlight, css_selector, regex_rule);
        });
        CSS.highlights.set(x.name, highlight);
    });
}

function GitHubPRSyntaxHighLighter() {
    GitHubPRSyntaxHighLight();

    var box = $(".pr-review-tools").first();
    box.prepend(`<div class="diffbar-item mr-3"><a id="_ex_reload_highlight_btn" class="btn btn-sm" style="color: #e6db74">♻🖍️Reload Syntax Hightlight</a></div>`);
    $('#_ex_reload_highlight_btn').on('click', function() {
        GitHubPRSyntaxHighLight()
    });

    // NOTE: You can also use Stylus. (You can see the colors in real time.)
    add_css([`
::highlight(cpp-namespace) {
    color: #f470a0;
}

.pl-s, ::highlight(quote) {
    color: #e6db74;
}

::highlight(const) {
    color: #BED754;
}

::highlight(number) {
    color: #a6e22e;
}

::highlight(sign) {
    color: #999999;
}
    `]);
}

function GitHubPRLineExpander() {
    const isDarkMode = document.documentElement.hasAttribute('data-dark-theme');
    let button_style = isDarkMode ? "color: #eee; background-color: #E48B63;" : "background-color: #ffbf8b;";

    var fileboxes = $(".file-actions > div > div");
    fileboxes.before(`<div class="d-flex" style="margin-left: 8px; padding: 8px;"><a class="ex_file_expand_btn btn btn-sm" style="${button_style}">💡Expand lines!</a></div>`);
    $('.ex_file_expand_btn').on('click', function() {
        expandExpand($(this).closest('[data-details-container-group="file"]'))
    });

    var box = $(".pr-review-tools").first();
    box.prepend(`<div class="js-reviews-container diffbar-item mr-3"><a id="_ex_expand_btn" class="btn btn-sm" style="${button_style}">💡Expand All lines!</a></div>`);
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
    GitHubPRSyntaxHighLighter()
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
