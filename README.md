# bookmarklets

## code-prettify.js
adopt google `code-prettify.js` with `linenums` option and `desert` style

* `github.com`の`README.md`での動作は確認済み

[bookmarklets/code\-prettify\.js at master · umaumax/bookmarklets]( https://github.com/umaumax/bookmarklets/blob/master/code-prettify.js )

<details>
<summary>FMI</summary>

* `github.com`内だと，`Content Security Policy`の影響で外部javascriptやcssが読み込めない問題がある(許可されているURLは`github.githubassets.com`)
  * CDN(`https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/prettify.min.js`),`https://raw.githubusercontent.com/google/code-prettify/master/src/prettify.js`,`https://raw.github.com/google/code-prettify/master/src/prettify.js`,`https://github.com/google/code-prettify/raw/master/src/prettify.js`などは利用できない
  * 結論: bookmarkletの中に埋め込めばよい
* `run_prettify.js`を利用したときには自動的に適用されるが，`prettifyjs`と`prettify.css`を分割して読み込む場合には`PR.prettyPrint()`が必要
* `https://cdnjs.cloudflare.com/ajax/libs/prettify/r298/run_prettify.min.js`は`https://google-code-prettify.googlecode.com/svn/loader/prettify.css`に依存するので`Content Security Policy`に違反する
</details>

----

## NOTE

## ブックマークレットの登録方法
  * macの場合`cmd-D`->`More`->`URL`にコードをそのまま貼り付ける

## コード作成時の注意
* javascriptの仕様上省略可能であるが，ブックマークレット化する際にはうまく処理されないようので，`;`は必ず入れること
  * コメントは`/**/`で記述すること
* 理由は不明だが，minifiedなコードはなぜか直接動作しないケースがある
  * ただし，通常のdebug consoleでは問題ない
* cssの埋め込みに関して，cssをjavascriptの文字列に変更する必要がある
  * minifiedなcssがたまたまsingle quoteが使用されていない場合には，そのまま利用可能
    * そうではない場合には，base64を利用すればよいはず

## links

[そろそろ本気でブックマークレットを作る \| Qrunch（クランチ）]( https://qrunch.net/@okayu/entries/oCXiY7zM7yBhjhV0 )

> 手元のVSCodeで見たところ、57068文字ありました。
> これをブックマークのURL欄に入力し、そのブックマークを実行してみるとどうでしょうか?
> 少なくとも私の環境では、Google Chrome(Canary)でもFirefox(Developer Edition)でも実行できました。

下記はあくまで`URL`だが参考程度に
[各種OS/ブラウザでの長いフラグメント のあるURLの長さを調べてみました \- Qiita]( https://qiita.com/nwtgck/items/e83473dc63386d2da3e5 )

> また、長さ100万のURLをGoogle Chromeでブックマークすることは可能でした。ブックマークしたあと、開いてもちゃんと長さ100万ありました。
