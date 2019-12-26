javascript: ;

/* FYI: [How to overwrite html element from javascript? \- Stack Overflow]( https://stackoverflow.com/questions/2487290/how-to-overwrite-html-element-from-javascript ) */

function replace_itself(element, new_element_text) {
    if (!element) {
        console.log('replace_itself failed: input element is empty');
        return null;
    }
    parent = element.parentNode;
    newElement = document.createElement('div');
    newElement.innerHTML = new_element_text;
    parent.insertBefore(newElement, element);
    parent.removeChild(element);
    return newElement;
};

var js_onload = function() {
    var renderer = new marked.Renderer();
    /* markdown-body class is for github.css */
    /* prettyprint class is for code-prettify.js */
    renderer.code = function(code, language) {
        return '<pre  class="markdown-body prettyprint linenums"><code>' + code + '</code></pre>';
    };
    renderer.table = function(header, body) {
        if (body) body = '<tbody class="markdown-body">' + body + '</tbody>';
        return '<table class="markdown-body table table-hover">' +
            '<thead>' +
            header +
            '</thead>' +
            body +
            '</table>';
    };
    marked.setOptions({
        gfm: true,
        breaks: true,
        langPrefix: '',
        renderer: renderer,
    });
    console.log('target_selector:', target_selector);
    Array.prototype.forEach.call(document.querySelectorAll(target_selector), function(element) {
        var text = element.textContent || element.innerText;
        /* jira text has duplicated new lines */
        text = text.replace(/\n\n/g, '\n');
        var markdown_html = marked(text);
        console.log('html to text');
        console.log('[prev element]:', element);
        console.log('[raw text]:', text);
        console.log('[markdown html]:', markdown_html);
        replace_itself(element, markdown_html);
    });
};

function add_js(urls) {
    var script;
    for (i = 0; i < urls.length; i++) {
        script = document.createElement("script");
        script.src = urls[i];
        if (i == urls.length - 1) {
            script.onload = js_onload;
        };
        document.body.appendChild(script);
    };
};

function add_css(datas) {
    var head = document.getElementsByTagName('head')[0];

    datas.forEach(function(data) {
        var style;
        if (data.startsWith('http')) {
            style = document.createElement('link');
            var url = data;
            console.log('[log]: add css from ', url);
            style.href = url;
            style.rel = 'stylesheet';
        } else {
            style = document.createElement('style');
            var raw_text = data;
            console.log('[log]: add css text ', raw_text);
            style.innerHTML = raw_text;
        }
        style.type = 'text/css';
        head.append(style);
    });
}

/* ---- ---- ---- */
var content_query = 'div[class="user-content-block"]';
var comment_query = 'div[class="action-body flooded"]';
var target_selector = [content_query, comment_query].join(', ');
add_js(["https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=desert", "https://cdn.jsdelivr.net/npm/marked/marked.min.js"]);
/* NOTE: github.css load is lazy, so add !important option to overcome lazy load css */
add_css(["https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css", '.linenums li { list-style-type: decimal !important; }']);
/* ---- ---- ---- */
void(0);
