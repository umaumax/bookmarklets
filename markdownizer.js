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
    marked.setOptions({
        gfm: true,
        breaks: true
    });
    var target_query = 'pre';
    Array.prototype.forEach.call(document.querySelectorAll(target_query), function(element) {
        var text = element.textContent || element.innerText;
        var markdown_html = marked(text);
        console.log('html to text');
        console.log('[prev element]:', element);
        console.log('[raw text]:', text);
        console.log('[markdown html]:', markdown_html);
        replace_itself(element, markdown_html);
    });
};

(function(urls) {
    var script;
    for (i = 0; i < urls.length; i++) {
        script = document.createElement("script");
        script.src = urls[i];
        if (i == urls.length - 1) {
            script.onload = js_onload;
        };
        document.body.appendChild(script);
    };
})(["https://cdn.jsdelivr.net/npm/marked/marked.min.js"]);

function add_css(urls) {
    var head = document.getElementsByTagName('head')[0];

    urls.forEach(function(url) {
        console.log('add css from ', url);
        var style = document.createElement('link');
        style.href = url;
        style.type = 'text/css';
        style.rel = 'stylesheet';
        head.append(style);
    });
}
add_css(["https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"]);

void(0);
