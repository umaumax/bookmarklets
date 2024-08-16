// ==UserScript==
// @name         url-to-clipboard
// @namespace
// @version      0.1
// @description  copy current tab url to os clipboard
// @author       You
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAARdQTFRFAAAAVme9hJTQdILQSFm4P1G0PlC0eIbTV2a/QVK0OkupOkuoGyNOGiJNTl+6TV66TV66TV66TV66XW3Df4zWSFm4Q1S2Xm7FdoTRdIHQP1C0PlC0dYPRdILQPlC0dILQdYPRe4jWbHrIZ3XETF26QVKvQVK0OkuoPU+xPU+xEBUvMD6MM0GTMkGSMD6LDBEkAAAAAAAAQVK1QFK1PlC0PVC0Xm3EdYPQdILQXm7FdYPRXWzDdoPRSVmzaHbEbHrIPU6xP0+sQVGtPU+0PU+zgo7Ps7risbnhsrnhbXvHPE6zo6vZ7e706uvz6+zzhZDOO02zUF+yRVazgY3OsrnisLfhsbjhbXrGUWCyUmCyRlezbHrG////L/L5TgAAADJ0Uk5TAAAAAAAAAAAAAAAAAABFkpeWmGsKFtH3gQge4feBHveACPd+Bd4cGNTTAlGCgU4CAQK7LD33AAAAAWJLR0Rc6tgAlwAAAAlwSFlzAAB2HAAAdhwBp8J46gAAAOFJREFUOMtjYKAPYGTi4xcQhAIhYRFmdAUsomJGcGAsLiGJroJVStoEDkzNZGTRVbDJISkwMTOXR1eBrsACXQWqAksrC3QVqAqsbczNzWUUFNlxKDC1tbMHAiVlFQ4cJjg4OoGAqhonDgVQIC3HhqbA2cUZClxMsSlwdnVzhwIPTy9sCrx9fKHAzz8AmxW2gXAQhNWK4JBQKAgLH/RWRERERuGzIiw6wBl7SEKtAJuPNS5sIyNAAGw+9siCAlNMBVzqGpjRranODVfAo6Wto4sGdPT0eZFSpYEhBjAgKXPiAQCnN3mFOTUjDAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0yM1QxODoyNDowMiswMTowMCQwhr8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMjNUMTg6MjQ6MDIrMDE6MDBVbT4DAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjcuOC05IDIwMTYtMDYtMTYgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn5r80tgAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQANTEywNBQUQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAA1MTIcfAPcAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1MjE4MjU4NDL67JvAAAAAE3RFWHRUaHVtYjo6U2l6ZQA0LjY2S0JCjHIFagAAAEV0RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L0dnYzc5QWUvMTM3Ny94b2ZmaWNlZG9jdW1lbnRfOTI3NzUucG5nbHrDMgAAAABJRU5ErkJggg==
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// ==/UserScript==

const custom_css_content = `
#toast-container {
    position: fixed;
    z-index: 10000;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    pointer-events: none;
}

#toast-container.top-center {
    top: 20px;
}

#toast-container.bottom-center {
    bottom: 20px;
}

.toast {
    position: relative;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: auto;
}

.toast.show {
    opacity: 1;
    transform: translateY(0);
}

.toast.hide {
    opacity: 0;
    transform: translateY(-20px);
}

.toast .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100%;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1s linear;
}
`;

function showToast(message, options = {}) {
    const {
        duration = 1000,
            loader = true,
            loaderBg = '#9EC600',
            position = 'top-center',
            bgColor = '#333',
            textColor = '#fff',
            width = 'min(99%, 1200px)'
    } = options;

    const container = document.getElementById('toast-container');
    container.classList.add(position);

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.backgroundColor = bgColor;
    toast.style.color = textColor;
    toast.style.width = width;

    if (loader) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.backgroundColor = loaderBg;
        progressBar.style.transitionDuration = `${duration*0.95}ms`;
        toast.appendChild(progressBar);

        setTimeout(() => {
            progressBar.style.transform = 'scaleX(1)';
        }, 100);
    }

    container.prepend(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, duration);
}

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

    showToast(content, {
        bgColor: '#2f4f4f',
        duration: 3000,
    });
}

(function() {
    'use strict';

    GM_registerMenuCommand("📗: COPY URL TO CLIPBOARD", url_to_clipboard, "e");

    let toastContainer = document.createElement('div');
    toastContainer.innerText = ' '; // NOTE: これがないとbodyへ追加されない
    toastContainer.id = 'toast-container';
    toastContainer.className = 'top-center';
    document.body.appendChild(toastContainer);

    add_css([custom_css_content]);

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
