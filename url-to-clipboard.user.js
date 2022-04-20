// ==UserScript==
// @name         url-to-clipboard
// @namespace
// @version      0.1
// @description  copy current tab url to os clipboard
// @author       You
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://raw.githubusercontent.com/kamranahmedse/jquery-toast-plugin/bd761d335919369ed5a27d1899e306df81de44b8/dist/jquery.toast.min.js
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAARdQTFRFAAAAVme9hJTQdILQSFm4P1G0PlC0eIbTV2a/QVK0OkupOkuoGyNOGiJNTl+6TV66TV66TV66TV66XW3Df4zWSFm4Q1S2Xm7FdoTRdIHQP1C0PlC0dYPRdILQPlC0dILQdYPRe4jWbHrIZ3XETF26QVKvQVK0OkuoPU+xPU+xEBUvMD6MM0GTMkGSMD6LDBEkAAAAAAAAQVK1QFK1PlC0PVC0Xm3EdYPQdILQXm7FdYPRXWzDdoPRSVmzaHbEbHrIPU6xP0+sQVGtPU+0PU+zgo7Ps7risbnhsrnhbXvHPE6zo6vZ7e706uvz6+zzhZDOO02zUF+yRVazgY3OsrnisLfhsbjhbXrGUWCyUmCyRlezbHrG////L/L5TgAAADJ0Uk5TAAAAAAAAAAAAAAAAAABFkpeWmGsKFtH3gQge4feBHveACPd+Bd4cGNTTAlGCgU4CAQK7LD33AAAAAWJLR0Rc6tgAlwAAAAlwSFlzAAB2HAAAdhwBp8J46gAAAOFJREFUOMtjYKAPYGTi4xcQhAIhYRFmdAUsomJGcGAsLiGJroJVStoEDkzNZGTRVbDJISkwMTOXR1eBrsACXQWqAksrC3QVqAqsbczNzWUUFNlxKDC1tbMHAiVlFQ4cJjg4OoGAqhonDgVQIC3HhqbA2cUZClxMsSlwdnVzhwIPTy9sCrx9fKHAzz8AmxW2gXAQhNWK4JBQKAgLH/RWRERERuGzIiw6wBl7SEKtAJuPNS5sIyNAAGw+9siCAlNMBVzqGpjRranODVfAo6Wto4sGdPT0eZFSpYEhBjAgKXPiAQCnN3mFOTUjDAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0yM1QxODoyNDowMiswMTowMCQwhr8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMjNUMTg6MjQ6MDIrMDE6MDBVbT4DAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjcuOC05IDIwMTYtMDYtMTYgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn5r80tgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQANTEywNBQUQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1MjE4MjU4NDL67JvAAAAAE3RFWHRUaHVtYjo6U2l6ZQA0LjY2S0JCjHIFagAAAEV0RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L0dnYzc5QWUvMTM3Ny94b2ZmaWNlZG9jdW1lbnRfOTI3NzUucG5nbHrDMgAAAABJRU5ErkJggg==
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// ==/UserScript==

// FYI: https://cdn.rawgit.com/kamranahmedse/jquery-toast-plugin/bd761d335919369ed5a27d1899e306df81de44b8/dist/jquery.toast.min.css
const jquery_toast_plugin_css_content = '.jq-toast-wrap,.jq-toast-wrap *{margin:0;padding:0}.jq-toast-wrap{display:block;position:fixed;width:250px;pointer-events:none!important;letter-spacing:normal;z-index:9000!important}.jq-toast-wrap.bottom-left{bottom:20px;left:20px}.jq-toast-wrap.bottom-right{bottom:20px;right:40px}.jq-toast-wrap.top-left{top:20px;left:20px}.jq-toast-wrap.top-right{top:20px;right:40px}.jq-toast-single{display:block;width:100%;padding:10px;margin:0 0 5px;border-radius:4px;font-size:12px;font-family:arial,sans-serif;line-height:17px;position:relative;pointer-events:all!important;background-color:#444;color:#fff}.jq-toast-single h2{font-family:arial,sans-serif;font-size:14px;margin:0 0 7px;background:0 0;color:inherit;line-height:inherit;letter-spacing:normal}.jq-toast-single a{color:#eee;text-decoration:none;font-weight:700;border-bottom:1px solid #fff;padding-bottom:3px;font-size:12px}.jq-toast-single ul{margin:0 0 0 15px;background:0 0;padding:0}.jq-toast-single ul li{list-style-type:disc!important;line-height:17px;background:0 0;margin:0;padding:0;letter-spacing:normal}.close-jq-toast-single{position:absolute;top:3px;right:7px;font-size:14px;cursor:pointer}.jq-toast-loader{display:block;position:absolute;top:-2px;height:5px;width:0;left:0;border-radius:5px;background:red}.jq-toast-loaded{width:100%}.jq-has-icon{padding:10px 10px 10px 50px;background-repeat:no-repeat;background-position:10px}.jq-icon-info{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=);background-color:#31708f;color:#d9edf7;border-color:#bce8f1}.jq-icon-warning{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=);background-color:#8a6d3b;color:#fcf8e3;border-color:#faebcc}.jq-icon-error{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=);background-color:#a94442;color:#f2dede;border-color:#ebccd1}.jq-icon-success{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==);color:#dff0d8;background-color:#3c763d;border-color:#d6e9c6}';
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

function is_macintosh() {
    return navigator.platform.indexOf('Mac') > -1
}

function is_windows() {
    return navigator.platform.indexOf('Win') > -1
}

function get_selection_text() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function url_to_clipboard() {
    var url = location.href;
    var title = get_selection_text() || document.title || url;
    var encoded_title = title.replaceAll(/([\[\]<>])/g, '\\$1');
    var content = `[${encoded_title}]( ${url} )`;
    GM_setClipboard(content);

    $.toast({
        text: content,
        //                heading: '📗[Clipboard]', // Optional heading to be shown on the toast
        loader: true,
        loaderBg: '#9EC600',
        showHideTransition: 'slide', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 1500, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 3, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'top-center',
        bgColor: '#2f4f4f',
        textColor: '#fffacd'
    });
}

(function() {
    'use strict';

    GM_registerMenuCommand("📗: COPY URL TO CLIPBOARD", url_to_clipboard, "e");

    add_css([jquery_toast_plugin_css_content, custom_css_content]);

    document.addEventListener('keydown', function(event) {
        // mac: ctrl + command + c
        // others: ctrl + shift + c
        if ((is_macintosh() && event.ctrlKey && event.metaKey && event.key === 'c') ||
            (!is_macintosh() && event.ctrlKey && event.shiftKey && event.key === 'C')) {
            url_to_clipboard();
            event.preventDefault();
            return false;
        }
        return true;
    });
})();
