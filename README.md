# bookmarklets

## code-prettify.js
adopt google `code-prettify.js` with `linenums` option and `desert` style

WIP

### FMI

<details>
<summary>FMI</summary>
* NOTE: `github.com`内だと，`Content Security Policy`の影響で外部javascriptやcssが読み込めない問題がある(許可されているURLは`github.githubassets.com`)
  * CDN(`https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js`),`https://raw.githubusercontent.com/google/code-prettify/master/src/prettify.js`,`https://raw.github.com/google/code-prettify/master/src/prettify.js`,`https://github.com/google/code-prettify/raw/master/src/prettify.js`などは利用できない

* 結論: bookmarkletの中に埋め込めばよい
</details>
