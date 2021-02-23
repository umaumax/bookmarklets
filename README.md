# bookmarklets

## code-prettify.js
adopt google `code-prettify.js` with `linenums` option and `desert` style to any code block

* `github.com`の`README.md`での動作は確認済み
* `qiita.com`, `zenn.dev`: ok

[bookmarklets/code\-prettify\.js at master · umaumax/bookmarklets]( https://github.com/umaumax/bookmarklets/blob/master/code-prettify.js )

<details>
<summary>FMI</summary>

* `github.com`内だと，`Content Security Policy`の影響で外部javascriptやcssが読み込めない問題がある(許可されているURLは`github.githubassets.com`)
  * CDN(`https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js`),`https://raw.githubusercontent.com/google/code-prettify/master/src/prettify.js`,`https://raw.github.com/google/code-prettify/master/src/prettify.js`,`https://github.com/google/code-prettify/raw/master/src/prettify.js`などは利用できない
  * 結論: bookmarkletの中に埋め込めばよい
* `run_prettify.js`を利用したときには自動的に適用されるが，`prettify.js`と`prettify.css`を分割して読み込む場合には`PR.prettyPrint()`が必要
* `https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/run_prettify.min.js`は`https://google-code-prettify.googlecode.com/svn/loader/prettify.css`に依存するので`Content Security Policy`に違反する
</details>

## [code-prettify.user.js ]( https://github.com/umaumax/bookmarklets/raw/master/code-prettify.user.js )
[Tampermonkey • Userscript Sources]( https://www.tampermonkey.net/scripts.php )向けのscript

githubやgistの`raw`ボタンを押すとイントール可能な画面へ遷移する

## [niconico-adblocker.user.js]( https://github.com/umaumax/bookmarklets/raw/master/niconico-adblocker.user.js )

ニコニコ動画の広告を自動的にskipする

## [navigator.platform-switcher.user.js]( https://github.com/umaumax/bookmarklets/raw/master/navigator.platform-switcher.user.js )
特定のプラットフォームに偽造する(インストーラーのダウンロードサイト向け)

## [gitlab-wiki-sidebar-expander.user.js]( https://github.com/umaumax/bookmarklets/raw/master/gitlab-wiki-sidebar-expander.user.js )
gitlabのwikiの右側のサイドバーを隠す(クリック or ctrl+fで出現)

## markdownizer.js
convert normal text to markdown text

* `markdownizer-pre.js`: search css selector is `pre`
  * you can try this bookmarklet at [Markdown記法 サンプル集 \- Qiita]( https://qiita.com/tbpgr/items/989c6badefff69377da7 )
* `markdownizer-jira.js`: for body content and comments

FYI: [Markdownを「Marked\.js」を使ってHTMLに変換する方法 \- suzu6]( https://www.suzu6.net/posts/38/ )

## examples
### gerrit: expand all comments
``` js
javascript: document.querySelectorAll("gr-message").forEach(e => e.click()); void(0);
```

----

## NOTE

## ブックマークレットの登録方法
  * macの場合`cmd-D`->`More`->`URL`にコードをそのまま貼り付ける

## コード作成時の注意
* javascriptの仕様上省略可能であるが，ブックマークレット化する際にはうまく処理されないようので，`;`は必ず入れること
  * 特に，複数行の関数宣言のときに忘れがちなので注意(`function xxx(){};`)
  * コメントは`/**/`で記述すること
* 理由は不明だが，minifiedなコードはなぜか直接動作しないケースがある
  * ただし，通常のdebug consoleでは問題ない
* cssの埋め込みに関して，cssをjavascriptの文字列に変更する必要がある
  * minifiedなcssがたまたまsingle quoteが使用されていない場合には，そのまま利用可能
    * そうではない場合には，base64を利用すればよいはず
* cssを外部から取得する際にgithubのrawのURLを利用すると，`Refused to apply style from 'https://raw.githubusercontent.com/<user>/<repo>/master/xxx.css' because its MIME type ('text/plain') is not a supported stylesheet MIME type, and strict MIME checking is enabled.`となり，無効化されてしまう
  * `https://cdn.jsdelivr.net/gh/$USER/$REPO@master/$FILEPATH`を指定すると自動的にgithubのファイルをMIME付きで配布してくれるCDNが存在するのでそれを利用すと良い
  * [Migrate from GitHub to jsDelivr]( https://www.jsdelivr.com/github )
    * `github.com`のファイルのURLでも`raw.githubusercontent.com`のURLでもOK
* httpsのサイトにて，http経由のcssを利用する場合，下記のメッセージによって無効化される
```
VM1271:1 Mixed Content: The page at 'https://www.xxx.com/' was loaded over HTTPS, but requested an insecure stylesheet 'http://xxx.yyy.com/xxx.css'. This request has been blocked; the content must be served over HTTPS.
```

## tips
下記を利用すれば，中途半端な状態のjavascriptでもブックマークレット化できるが，コードが多少わかりにくくなるので注意
* [Closure Compiler Service]( https://closure-compiler.appspot.com/home )
  * [Communicating with the Closure Compiler Service API]( https://developers.google.com/closure/compiler/docs/api-tutorial1#how-to-communciate-with-the-api )

``` bash
brew install closure-compiler
```

``` bash
closure-compiler $target_js_file
```

### css selector
developer consoleで要素を取得できているかどうかの確認方法

``` js
var target_selector = 'div[class="xxx yyy"], div[class="abc def"]';
Array.prototype.forEach.call(document.querySelectorAll(target_selector), function(element) {
  console.log(element);
});
```

## links
* [Bookmarkletを作ろう\(準備編） \- Qiita]( https://qiita.com/kanaxx/items/63debe502aacd73c3cb8 )

* [そろそろ本気でブックマークレットを作る \| Qrunch（クランチ）]( https://qrunch.net/@okayu/entries/oCXiY7zM7yBhjhV0 )

> 手元のVSCodeで見たところ、57068文字ありました。
> これをブックマークのURL欄に入力し、そのブックマークを実行してみるとどうでしょうか?
> 少なくとも私の環境では、Google Chrome(Canary)でもFirefox(Developer Edition)でも実行できました。

下記はあくまで`URL`だが参考程度に

* [各種OS/ブラウザでの長いフラグメント のあるURLの長さを調べてみました \- Qiita]( https://qiita.com/nwtgck/items/e83473dc63386d2da3e5 )

> また、長さ100万のURLをGoogle Chromeでブックマークすることは可能でした。ブックマークしたあと、開いてもちゃんと長さ100万ありました。
