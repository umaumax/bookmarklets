// ==UserScript==
// @name         Wiki Searcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  interactive wiki search and go to item position directly
// @author       You
// @match        https://gitlab.com/umaumax/memo/-/wikis/home*
// @icon         https://www.google.com/s2/favicons?domain=gitlab.com
// @grant        none
// ==/UserScript==

const url = 'https://gitlab.com/umaumax/memo/-/wikis/_items.json';

let database;
let search_result
let search_info;

String.prototype.trimEllip = function(length) {
    return this.length > length ? this.substring(0, length) + "..." : this;
}

function escapeHtml(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}

String.prototype.enhanceAll = function(keyword) {
    return this.replaceAll(keyword, "<mark><span style='font-weight: bold'>" + keyword + "</span></mark>");
}

function query_oninput(event) {
    const top_n = 30;
    const max_content_length = 256;

    let queries = event.target.value.split(/\s+/);
    if (!database) {
        return;
    }
    // last query length
    if (queries.length == 0 || (queries.length > 0 && queries[queries.length - 1].length <= 2)) {
        return;
    }

    const start_time = (new Date()).getTime();

    // set high priority if hits wiki page title
    let high_priority_order = [];
    let low_priority_order = [];
    database.forEach(function(filedata, i) {
        if (queries.some(query => {
                return filedata.filepath.indexOf(query) != -1 || filedata.filepath.toLowerCase().indexOf(query) != -1;
            })) {
            high_priority_order.push(filedata);
        } else {
            low_priority_order.push(filedata);
        }
    });
    let priority_order = high_priority_order.concat(low_priority_order);

    let count = 0;
    let innerHTML = '<br/>';
    priority_order.some(function(filedata, i) {
        let pre_count = count;
        let result = filedata.items.some(function(itemdata, j) {
            let link = itemdata.link;
            let full_content = itemdata.content;
            if (queries.every(query => {
                    return link.indexOf(query) != -1 || full_content.indexOf(query) != -1;
                })) {
                // Idea: show before and after range of search hits
                let content = escapeHtml(full_content.trimEllip(max_content_length));
                queries.forEach(query => {
                    content = content.enhanceAll(query);
                });
                let link_text = escapeHtml(link.replace("#", ": "));
                queries.forEach(query => {
                    link_text = link_text.enhanceAll(query);
                });
                innerHTML += '<div><a href=' + escapeHtml(link) + '> ● ' + link_text + '</a><br/><p>' + content + '</p></div>';
                count++;
            }
            if (count >= top_n) {
                return true;
            }
            return false;
        });
        if (count != pre_count) {
            innerHTML += '<hr/><br/>';
        }
        return result;
    });
    const end_time = (new Date()).getTime();
    const elapsed_time = (end_time - start_time) / 1000.0;

    search_info.innerHTML = '<p>Top ' + count + ' (' + elapsed_time + '[s])' + '</p>';
    search_result.innerHTML = innerHTML;
}

(function() {
    'use strict';

    let container = document.getElementsByClassName('js-wiki-page-content')[0];
    search_result = document.createElement("div");
    container.prepend(search_result);

    var input = document.createElement("input");
    input.type = "text";
    input.oninput = query_oninput;
    container.prepend(input);
    input.focus();

    search_info = document.createElement("span");
    container.prepend(search_info);

    fetch(url)
        .then(res => res.json())
        .then((out) => {
            database = out;

            // for ?search=hoge+fuga
            var params = (new URL(document.location)).searchParams;
            var search = params.get('search');
            if (search) {
                input.value = search;
                input.dispatchEvent(new Event("input"))
                input.focus();
            }
        })
        .catch(err => {
            throw err
        });

    document.body.onclick = function(event) {
        if (event.target.tagName == 'A' || event.target.tagName == 'INPUT') {
            return;
        }
        input.value = '';
        input.focus();
    }
})();
