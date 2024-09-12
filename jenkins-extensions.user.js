// ==UserScript==
// @name         jenkins-parameters-util
// @namespace
// @version      0.1
// @description  jenkins-parameters-util
// @author       You
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://raw.githubusercontent.com/kamranahmedse/jquery-toast-plugin/bd761d335919369ed5a27d1899e306df81de44b8/dist/jquery.toast.min.js
// @match        *://*/job/*
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// ==/UserScript==

const jquery_toast_plugin_url = 'https://cdn.rawgit.com/kamranahmedse/jquery-toast-plugin/bd761d335919369ed5a27d1899e306df81de44b8/dist/jquery.toast.min.css';
const custom_css_content = `
.jq-toast-wrap {
    width: min(99%, 1200px);
}
`;

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
            style.innerHTML = raw_text;
        }
        style.type = 'text/css';
        head.append(style);
    });
}

function get_content() {
    var text = ""
    $('div.jenkins-form-item.tr').each(function() {
        var label = $(this).find('div.jenkins-form-label.help-sibling').text()
        var value = $(this).find('input').val()
        text += label + ":" + value + "\n"
    })
    console.log(text)
    return text;
}

function launch_clipboard(title) {
    $.toast({
        text: title,
        loader: true,
        loaderBg: '#9E00C6',
        showHideTransition: 'slide',
        allowToastClose: true,
        hideAfter: 1500,
        stack: 3,
        position: 'top-center',
        bgColor: '#2f4f4f',
        textColor: '#fffacd'
    });
}

function copy_to_clipboard() {
    var url = location.href;
    var title = document.title || url;
    var content = get_content()
    GM_setClipboard(content);
    launch_clipboard(title + "\n" + content)
}

function set_clipboard_content() {
    var text = $('textarea#text-input').val()
    var lines = text.split('\n');

    $('div.jenkins-form-item.tr').each(function() {
        var label = $(this).find('div.jenkins-form-label.help-sibling').text()
        var value = $(this).find('input.jenkins-input').val()

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i]
            var tmp = line.split(":")
            tmp = [tmp.shift(), tmp.join(":")]
            if (tmp.length != 2) continue
            var label_i = tmp[0]
            var value_i = tmp[1]
            console.log(value, label, value_i)
            if (label == label_i && value != value_i) {
                console.log('override')
                $(this).find('input.jenkins-input').val(value_i)
                $(this).find('input.jenkins-input').css("background-color", "#fffacd");
            }
        }
    })

    launch_clipboard(text)
}

$(function() {
    'use strict';

    GM_registerMenuCommand("🐿: COPY Jenkis Parameters TO CLIPBOARD", copy_to_clipboard, "e");

    add_css([jquery_toast_plugin_url, custom_css_content]);

    if (document.URL.match(/http:\/\/.*\/job\/.*\/build.*/)) {
        console.log('build')
        var textarea = $('<textarea />', {
            id: 'text-input',
            cols: 120,
            rows: 20,
        })
        $('div#main-panel h1').after(textarea)

        const NewEL = (tag, prop) => Object.assign(document.createElement(tag), prop);
        const EL_btn = NewEL("button", {
            textContent: "Parse Patameters",
            onclick() {
                set_clipboard_content()
            },
        });
        $('textarea#text-input').after(EL_btn)
    }

    if (document.URL.match(/http:\/\/.*\/job\/.*\/parameters\/.*/)) {
        console.log('parameters')

        const NewEL = (tag, prop) => Object.assign(document.createElement(tag), prop);
        const EL_btn = NewEL("button", {
            textContent: "Copy Patameters",
            onclick() {
                copy_to_clipboard();
            },
        });
        $('div#main-panel h1').after(EL_btn)
    }
});
