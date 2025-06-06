# bookmarklets

`*.user.js` files are for [Tampermonkey • Userscript Sources]( https://www.tampermonkey.net/scripts.php ).

## ⭐[texts-auto-complete.user.js]( https://github.com/umaumax/bookmarklets/raw/master/texts-auto-complete.user.js )
enhance `<input type="text">` and `<textarea>` by adding auto complete feature

## ⭐[visit-logger.user.js]( https://github.com/umaumax/bookmarklets/raw/master/visit-logger.user.js )
enhance a tags

## ⭐[clipboard-text-html-converter.user.js]( https://github.com/umaumax/bookmarklets/raw/master/clipboard-text-html-converter.user.js )
* Add text/html Clipboard Converter
  * Add a shortcut key (command + ctrl + v)

## ⭐[image-to-base64.user.js]( https://github.com/umaumax/bookmarklets/raw/master/image-to-base64.user.js )
Image to Base64 Copy via Context Menu

## ⭐[url-to-clipboard.user.js]( https://github.com/umaumax/bookmarklets/raw/master/url-to-clipboard.user.js )
This copies url to clibpboard as markdown style with toast notification.

## ⭐[copy-css-background-img-url.user.js]( https://github.com/umaumax/bookmarklets/raw/master/copy-css-background-img-url.user.js )
This copy css background image url to clibpboard with toast notification.
You can test this user script at https://store.line.me/stickershop/product/1435895/en .

## ⭐[google-search-enhancer.user.js]( https://github.com/umaumax/bookmarklets/raw/master/google-search-enhancer.user.js )
This adds one click search bottons(`日本語のみ`,`Only English`, `1年以内`, `アメリカ版`).

## ⭐[highlight-keywords.user.js]( https://github.com/umaumax/bookmarklets/raw/master/highlight-keywords.user.js )
* マウスで選択 or ダブルクリックしてテキストをハイライトする
  * 空文字を選択(空のクリック)すると変更・追加されたテキストに対しても再度処理が適用される

## ⭐[jira-extensions.user.js ]( https://github.com/umaumax/bookmarklets/raw/master/jira-extensions.user.js )
for JIRA

* Make labels easier to see on backlog and active sprint screens.

## [code-prettify.js]( https://github.com/umaumax/bookmarklets/blob/master/code-prettify.js )
This adopts google `code-prettify.js` with `linenums` option and `desert` style to any code blocks.

<details>
<summary>FMI</summary>

* `github.com`内だと，`Content Security Policy`の影響で外部javascriptやcssが読み込めない問題がある(許可されているURLは`github.githubassets.com`)
  * CDN(`https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js`),`https://raw.githubusercontent.com/google/code-prettify/master/src/prettify.js`,`https://raw.github.com/google/code-prettify/master/src/prettify.js`,`https://github.com/google/code-prettify/raw/master/src/prettify.js`などは利用できない
  * 結論: bookmarkletの中に埋め込めばよい
* `run_prettify.js`を利用したときには自動的に適用されるが，`prettify.js`と`prettify.css`を分割して読み込む場合には`PR.prettyPrint()`が必要
* `https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/run_prettify.min.js`は`https://google-code-prettify.googlecode.com/svn/loader/prettify.css`に依存するので`Content Security Policy`に違反する
</details>

## ⭐[auto-scroll-to-article-header.user.js]( https://github.com/umaumax/bookmarklets/raw/master/auto-scroll-to-article-header.user.js )
Webページのタイトルだと思われる要素まで自動的にスクロールする

## [picuki.user.js]( https://github.com/umaumax/bookmarklets/raw/master/picuki.user.js )

## [code-prettify.user.js ]( https://github.com/umaumax/bookmarklets/raw/master/code-prettify.user.js )

## 🔧[niconico-adblocker.user.js]( https://github.com/umaumax/bookmarklets/raw/master/niconico-adblocker.user.js )
This skips ads of Niconico movie site. (Under Maintenance)

## 🔧[niconico-adblocker.us]( https://github.com/umaumax/bookmarklets/raw/master/niconico-adblocker.us )
This skips ads of TVer site.

## [navigator.platform-switcher.user.js]( https://github.com/umaumax/bookmarklets/raw/master/navigator.platform-switcher.user.js )
特定のプラットフォームに偽造する(インストーラーのダウンロードサイト向け)

## [gitlab-wiki-sidebar-expander.user.js]( https://github.com/umaumax/bookmarklets/raw/master/gitlab-wiki-sidebar-expander.user.js )
* gitlabのwikiの右側のサイドバーを隠す(クリック or command or ctrl or ctrl+fで出現)
* wikiの編集時にテキストを選択している状態で「\`」キーを押すと、コードブロックのトグルとなる
* wikiの編集時にcommand+↑/↓でページの上と下へ飛ぶ機能

## [gitlab-wiki-search-filter.user.js]( https://github.com/umaumax/bookmarklets/raw/master/gitlab-wiki-search-filter.user.js )
* インクリメンタルに検索ができる
* 直接、各トピックへジャンプできる

## [image-link-checker.user.js]( https://github.com/umaumax/bookmarklets/raw/master/image-link-checker.user.js )
画像のリンク切れをトーストで知らせる

## 🔧[disable-google-account-popup.user.js]( https://github.com/umaumax/bookmarklets/raw/master/disable-google-account-popup.user.js )
redditのgoogle account loginのpopupを抑制する

## 🌟[github-issue-extension.user.js]( https://github.com/umaumax/bookmarklets/raw/master/github-issue-extension.user.js )
Add `Edit` button to edit an issue comment in one operation.

## 🌟[github-pr-extension.user.js]( https://github.com/umaumax/bookmarklets/raw/master/github-pr-extension.user.js )
* Add `Expand line` button to entire files and each files.
* Add a commit diff link to each commits.

ref: [umaumax/giiiithub-extension]( https://github.com/umaumax/giiiithub-extension )

## 🌟[github-extension.user.js]( https://github.com/umaumax/bookmarklets/raw/master/github-extension.user.js )
* Tampermonkeyのメニューに現在のブランチを`main`や`master`と比較するURLを新しいタブで開くメニューを追加する

## 🌟[github-cache-extension.user.js]( https://github.com/umaumax/bookmarklets/raw/master/github-cache-extension.user.js )
* GitHubをwebでアクセスしている間に、ファイルのコンテンツをブランチごとにローカルに保存する
  * プライベートなリポジトリに対しても機能する
  * READMEはデフォルトで`Preview`となり、`textarea`ではない表示のためキャッシュされないが、`Code`を表示するとキャッシュされる
* GitHubのファイルが他のサイトからリンクされたときにモーダルウィンドウで表示する
  * CSSを遅延読み込みする際に、本来のページのcode blockへの影響がある
    * CSSを適用する範囲を限定する手法はあるのかどうか

## 🌟[github-wiki-edit.user.js]( https://github.com/umaumax/bookmarklets/raw/master/github-wiki-edit.user.js )
githubのwikiのeditのショートカットキーを定義する(gitlabと同じ)

## 🌟[clipboard-copy.user.js]( https://github.com/umaumax/bookmarklets/raw/master/clipboard-copy.user.js )
githubのpull requestの特定のcommitのshaをコピーするボタンを追加する

## [filtering-sony-books.js]( https://github.com/umaumax/bookmarklets/raw/master/filtering-sony-books.js )
Sony Readerの無料本のランキングのフィルタリングをする(アイコンメニューから実行する)

## [instagram.user.js]( https://github.com/umaumax/bookmarklets/raw/master/instagram.user.js )
`more`の自動展開

## [auto-scroll-extension-in-page.user.js]( https://github.com/umaumax/bookmarklets/raw/master/auto-scroll-extension-in-page.user.js )
`#id`のリンクスクロールをjQueryのセレクタ表記にも対応する拡張

ついでに、gitlabのwikiをeditする際に、現在のビュー位置に自動的に遷移する機能を付加している(なお、この機能は独立したuser scriptとして分離可能である)

e.g. [GitHub \- Wikipedia - GitHub Actions]( https://ja.wikipedia.org/wiki/GitHub?key=value#h3:contains(%22GitHub%20Actions%22) )

``` markdown
[GitHub \- Wikipedia - GitHub Actions]( https://ja.wikipedia.org/wiki/GitHub?key=value#h3:contains(%22GitHub%20Actions%22) )
```

## [jenkins-extensions.user.js]( https://github.com/umaumax/bookmarklets/raw/master/jenkins-extensions.user.js )
jenkinsのjobのパラメータのstore/loadを可能にする

## [qiita-trend.user.js]( https://github.com/umaumax/bookmarklets/raw/master/qiita-trend.user.js )
qiitaのtrendの表示を昨日の日付のみにフィルターする

## [clean-links.user.js]( https://github.com/umaumax/bookmarklets/raw/master/clean-links.user.js )
* `🔗✅: Mark All Links as Visited`: リンクを訪問済みとしてローカルストレージへ保存する
* `🔗🗑️🧹: Clean Visited Links`: ローカルストレージから訪問済みリンク情報を読み取り、その要素を削除する(ページロード時に自動実行される)

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

## How to add bookmarklets
* mac: `cmd-D`->`More`->`URL`(paste here)

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

下記はあくまで`URL`だが、ブックマークレットの長さの参考程度に

* [各種OS/ブラウザでの長いフラグメント のあるURLの長さを調べてみました \- Qiita]( https://qiita.com/nwtgck/items/e83473dc63386d2da3e5 )

> また、長さ100万のURLをGoogle Chromeでブックマークすることは可能でした。ブックマークしたあと、開いてもちゃんと長さ100万ありました。
