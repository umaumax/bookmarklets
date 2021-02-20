javascript:
    /* FYI: [code\-prettify/prettify\.js at master · google/code\-prettify]( https://github.com/google/code-prettify/blob/master/src/prettify.js ) */
;
! function() {
    var e = null;
    window.PR_SHOULD_USE_CONTINUATION = !0,
        function() {
            function t(e) {
                function t(e) {
                    var t = e.charCodeAt(0);
                    if (92 !== t) return t;
                    var i = e.charAt(1);
                    return (t = u[i]) ? t : i >= "0" && "7" >= i ? parseInt(e.substring(1), 8) : "u" === i || "x" === i ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
                }

                function i(e) {
                    return 32 > e ? (16 > e ? "\\x0" : "\\x") + e.toString(16) : (e = String.fromCharCode(e), "\\" === e || "-" === e || "]" === e || "^" === e ? "\\" + e : e)
                }

                function n(e) {
                    var n = e.substring(1, e.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),
                        e = [],
                        r = "^" === n[0],
                        s = ["["];
                    r && s.push("^");
                    for (var r = r ? 1 : 0, o = n.length; o > r; ++r) {
                        var a = n[r];
                        if (/\\[bdsw]/i.test(a)) s.push(a);
                        else {
                            var l, a = t(a);
                            o > r + 2 && "-" === n[r + 1] ? (l = t(n[r + 2]), r += 2) : l = a, e.push([a, l]), 65 > l || a > 122 || (65 > l || a > 90 || e.push([32 | Math.max(65, a), 32 | Math.min(l, 90)]), 97 > l || a > 122 || e.push([-33 & Math.max(97, a), -33 & Math.min(l, 122)]))
                        }
                    }
                    for (e.sort(function(e, t) {
                            return e[0] - t[0] || t[1] - e[1]
                        }), n = [], o = [], r = 0; e.length > r; ++r) a = e[r], a[0] <= o[1] + 1 ? o[1] = Math.max(o[1], a[1]) : n.push(o = a);
                    for (r = 0; n.length > r; ++r) a = n[r], s.push(i(a[0])), a[1] > a[0] && (a[1] + 1 > a[0] && s.push("-"), s.push(i(a[1])));
                    return s.push("]"), s.join("")
                }

                function r(e) {
                    for (var t = e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), r = t.length, a = [], l = 0, h = 0; r > l; ++l) {
                        var c = t[l];
                        "(" === c ? ++h : "\\" === c.charAt(0) && (c = +c.substring(1)) && (h >= c ? a[c] = -1 : t[l] = i(c))
                    }
                    for (l = 1; a.length > l; ++l) - 1 === a[l] && (a[l] = ++s);
                    for (h = l = 0; r > l; ++l) c = t[l], "(" === c ? (++h, a[h] || (t[l] = "(?:")) : "\\" === c.charAt(0) && (c = +c.substring(1)) && h >= c && (t[l] = "\\" + a[c]);
                    for (l = 0; r > l; ++l) "^" === t[l] && "^" !== t[l + 1] && (t[l] = "");
                    if (e.ignoreCase && o)
                        for (l = 0; r > l; ++l) c = t[l], e = c.charAt(0), c.length >= 2 && "[" === e ? t[l] = n(c) : "\\" !== e && (t[l] = c.replace(/[A-Za-z]/g, function(e) {
                            return e = e.charCodeAt(0), "[" + String.fromCharCode(-33 & e, 32 | e) + "]"
                        }));
                    return t.join("")
                }
                for (var s = 0, o = !1, a = !1, l = 0, h = e.length; h > l; ++l) {
                    var c = e[l];
                    if (c.ignoreCase) a = !0;
                    else if (/[a-z]/i.test(c.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                        o = !0, a = !1;
                        break
                    }
                }
                for (var u = {
                        b: 8,
                        t: 9,
                        n: 10,
                        v: 11,
                        f: 12,
                        r: 13
                    }, d = [], l = 0, h = e.length; h > l; ++l) {
                    if (c = e[l], c.global || c.multiline) throw Error("" + c);
                    d.push("(?:" + r(c) + ")")
                }
                return RegExp(d.join("|"), a ? "gi" : "g")
            }

            function i(e, t) {
                function i(e) {
                    var l = e.nodeType;
                    if (1 == l) {
                        if (!n.test(e.className)) {
                            for (l = e.firstChild; l; l = l.nextSibling) i(l);
                            l = e.nodeName.toLowerCase(), ("br" === l || "li" === l) && (r[a] = "\n", o[a << 1] = s++, o[1 | a++ << 1] = e)
                        }
                    } else(3 == l || 4 == l) && (l = e.nodeValue, l.length && (l = t ? l.replace(/\r\n?/g, "\n") : l.replace(/[\t\n\r ]+/g, " "), r[a] = l, o[a << 1] = s, s += l.length, o[1 | a++ << 1] = e))
                }
                var n = /(?:^|\s)nocode(?:\s|$)/,
                    r = [],
                    s = 0,
                    o = [],
                    a = 0;
                return i(e), {
                    a: r.join("").replace(/\n$/, ""),
                    d: o
                }
            }

            function n(e, t, i, n) {
                t && (e = {
                    a: t,
                    e: e
                }, i(e), n.push.apply(n, e.g))
            }

            function r(e) {
                for (var t = void 0, i = e.firstChild; i; i = i.nextSibling) var n = i.nodeType,
                    t = 1 === n ? t ? e : i : 3 === n ? x.test(i.nodeValue) ? e : t : t;
                return t === e ? void 0 : t
            }

            function s(i, r) {
                function s(e) {
                    for (var t = e.e, i = [t, "pln"], c = 0, u = e.a.match(o) || [], d = {}, p = 0, f = u.length; f > p; ++p) {
                        var m, g = u[p],
                            y = d[g],
                            v = void 0;
                        if ("string" == typeof y) m = !1;
                        else {
                            var b = a[g.charAt(0)];
                            if (b) v = g.match(b[1]), y = b[0];
                            else {
                                for (m = 0; l > m; ++m)
                                    if (b = r[m], v = g.match(b[1])) {
                                        y = b[0];
                                        break
                                    }
                                v || (y = "pln")
                            }!(m = y.length >= 5 && "lang-" === y.substring(0, 5)) || v && "string" == typeof v[1] || (m = !1, y = "src"), m || (d[g] = y)
                        }
                        if (b = c, c += g.length, m) {
                            m = v[1];
                            var L = g.indexOf(m),
                                x = L + m.length;
                            v[2] && (x = g.length - v[2].length, L = x - m.length), y = y.substring(5), n(t + b, g.substring(0, L), s, i), n(t + b + L, m, h(y, m), i), n(t + b + x, g.substring(x), s, i)
                        } else i.push(t + b, y)
                    }
                    e.g = i
                }
                var o, a = {};
                (function() {
                    for (var n = i.concat(r), s = [], l = {}, h = 0, c = n.length; c > h; ++h) {
                        var u = n[h],
                            d = u[3];
                        if (d)
                            for (var p = d.length; --p >= 0;) a[d.charAt(p)] = u;
                        u = u[1], d = "" + u, l.hasOwnProperty(d) || (s.push(u), l[d] = e)
                    }
                    s.push(/[\S\s]/), o = t(s)
                })();
                var l = r.length;
                return s
            }

            function o(t) {
                var i = [],
                    n = [];
                t.tripleQuotedStrings ? i.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, e, "'\""]) : t.multiLineStrings ? i.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, e, "'\"`"]) : i.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, e, "\"'"]), t.verbatimStrings && n.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, e]);
                var r = t.hashComments;
                if (r && (t.cStyleComments ? (r > 1 ? i.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, e, "#"]) : i.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/, e, "#"]), n.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, e])) : i.push(["com", /^#[^\n\r]*/, e, "#"])), t.cStyleComments && (n.push(["com", /^\/\/[^\n\r]*/, e]), n.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, e])), r = t.regexLiterals) {
                    var o = (r = r > 1 ? "" : "\n\r") ? "." : "[\\S\\s]";
                    n.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" + ("/(?=[^/*" + r + "])(?:[^/\\x5B\\x5C" + r + "]|\\x5C" + o + "|\\x5B(?:[^\\x5C\\x5D" + r + "]|\\x5C" + o + ")*(?:\\x5D|$))+/") + ")")])
                }
                return (r = t.types) && n.push(["typ", r]), r = ("" + t.keywords).replace(/^ | $/g, ""), r.length && n.push(["kwd", RegExp("^(?:" + r.replace(/[\s,]+/g, "|") + ")\\b"), e]), i.push(["pln", /^\s+/, e, " \r\n	 "]), r = "^.[^\\s\\w.$@'\"`/\\\\]*", t.regexLiterals && (r += "(?!s*/)"), n.push(["lit", /^@[$_a-z][\w$@]*/i, e], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, e], ["pln", /^[$_a-z][\w$@]*/i, e], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, e, "0123456789"], ["pln", /^\\[\S\s]?/, e], ["pun", RegExp(r), e]), s(i, n)
            }

            function a(e, t, i) {
                function n(e) {
                    var t = e.nodeType;
                    if (1 != t || s.test(e.className)) {
                        if ((3 == t || 4 == t) && i) {
                            var l = e.nodeValue,
                                h = l.match(o);
                            h && (t = l.substring(0, h.index), e.nodeValue = t, (l = l.substring(h.index + h[0].length)) && e.parentNode.insertBefore(a.createTextNode(l), e.nextSibling), r(e), t || e.parentNode.removeChild(e))
                        }
                    } else if ("br" === e.nodeName) r(e), e.parentNode && e.parentNode.removeChild(e);
                    else
                        for (e = e.firstChild; e; e = e.nextSibling) n(e)
                }

                function r(e) {
                    function t(e, i) {
                        var n = i ? e.cloneNode(!1) : e,
                            r = e.parentNode;
                        if (r) {
                            var r = t(r, 1),
                                s = e.nextSibling;
                            r.appendChild(n);
                            for (var o = s; o; o = s) s = o.nextSibling, r.appendChild(o)
                        }
                        return n
                    }
                    for (; !e.nextSibling;)
                        if (e = e.parentNode, !e) return;
                    for (var i, e = t(e.nextSibling, 0);
                        (i = e.parentNode) && 1 === i.nodeType;) e = i;
                    h.push(e)
                }
                for (var s = /(?:^|\s)nocode(?:\s|$)/, o = /\r\n?|\n/, a = e.ownerDocument, l = a.createElement("li"); e.firstChild;) l.appendChild(e.firstChild);
                for (var h = [l], c = 0; h.length > c; ++c) n(h[c]);
                t === (0 | t) && h[0].setAttribute("value", t);
                var u = a.createElement("ol");
                u.className = "linenums";
                for (var t = Math.max(0, 0 | t - 1) || 0, c = 0, d = h.length; d > c; ++c) l = h[c], l.className = "L" + (c + t) % 10, l.firstChild || l.appendChild(a.createTextNode(" ")), u.appendChild(l);
                e.appendChild(u)
            }

            function l(e, t) {
                for (var i = t.length; --i >= 0;) {
                    var n = t[i];
                    w.hasOwnProperty(n) ? u.console && console.warn("cannot override language handler %s", n) : w[n] = e
                }
            }

            function h(e, t) {
                return e && w.hasOwnProperty(e) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), w[e]
            }

            function c(e) {
                var t = e.h;
                try {
                    var n = i(e.c, e.i),
                        r = n.a;
                    e.a = r, e.d = n.d, e.e = 0, h(t, r)(e);
                    var s = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
                        s = s && 8 >= +s[1],
                        t = /\n/g,
                        o = e.a,
                        a = o.length,
                        n = 0,
                        l = e.d,
                        c = l.length,
                        r = 0,
                        d = e.g,
                        p = d.length,
                        f = 0;
                    d[p] = a;
                    var m, g;
                    for (g = m = 0; p > g;) d[g] !== d[g + 2] ? (d[m++] = d[g++], d[m++] = d[g++]) : g += 2;
                    for (p = m, g = m = 0; p > g;) {
                        for (var y = d[g], v = d[g + 1], b = g + 2; p >= b + 2 && d[b + 1] === v;) b += 2;
                        d[m++] = y, d[m++] = v, g = b
                    }
                    d.length = m;
                    var L, x = e.c;
                    x && (L = x.style.display, x.style.display = "none");
                    try {
                        for (; c > r;) {
                            var C, w = l[r + 2] || a,
                                S = d[f + 2] || a,
                                b = Math.min(w, S),
                                O = l[r + 1];
                            if (1 !== O.nodeType && (C = o.substring(n, b))) {
                                s && (C = C.replace(t, "\r")), O.nodeValue = C;
                                var _ = O.ownerDocument,
                                    E = _.createElement("span");
                                E.className = d[f + 1];
                                var k = O.parentNode;
                                k.replaceChild(E, O), E.appendChild(O), w > n && (l[r + 1] = O = _.createTextNode(o.substring(b, w)), k.insertBefore(O, E.nextSibling))
                            }
                            n = b, n >= w && (r += 2), n >= S && (f += 2)
                        }
                    } finally {
                        x && (x.style.display = L)
                    }
                } catch (T) {
                    u.console && console.log(T && T.stack || T)
                }
            }
            var u = window,
                d = ["break,continue,do,else,for,if,return,while"],
                p = [
                    [d, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
                ],
                f = [p, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
                m = [p, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
                g = [m, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],
                p = [p, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
                y = [d, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
                v = [d, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
                b = [d, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],
                d = [d, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
                L = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
                x = /\S/,
                C = o({
                    keywords: [f, g, p, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", y, v, d],
                    hashComments: !0,
                    cStyleComments: !0,
                    multiLineStrings: !0,
                    regexLiterals: !0
                }),
                w = {};
            l(C, ["default-code"]), l(s([], [
                ["pln", /^[^<?]+/],
                ["dec", /^<!\w[^>]*(?:>|$)/],
                ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
                ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
                ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
                ["pun", /^(?:<[%?]|[%?]>)/],
                ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
                ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
                ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
                ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
            ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), l(s([
                ["pln", /^\s+/, e, " 	\r\n"],
                ["atv", /^(?:"[^"]*"?|'[^']*'?)/, e, "\"'"]
            ], [
                ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
                ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
                ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
                ["pun", /^[/<->]+/],
                ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
                ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
                ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
                ["lang-css", /^style\s*=\s*"([^"]+)"/i],
                ["lang-css", /^style\s*=\s*'([^']+)'/i],
                ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
            ]), ["in.tag"]), l(s([], [
                ["atv", /^[\S\s]+/]
            ]), ["uq.val"]), l(o({
                keywords: f,
                hashComments: !0,
                cStyleComments: !0,
                types: L
            }), ["c", "cc", "cpp", "cxx", "cyc", "m"]), l(o({
                keywords: "null,true,false"
            }), ["json"]), l(o({
                keywords: g,
                hashComments: !0,
                cStyleComments: !0,
                verbatimStrings: !0,
                types: L
            }), ["cs"]), l(o({
                keywords: m,
                cStyleComments: !0
            }), ["java"]), l(o({
                keywords: d,
                hashComments: !0,
                multiLineStrings: !0
            }), ["bash", "bsh", "csh", "sh"]), l(o({
                keywords: y,
                hashComments: !0,
                multiLineStrings: !0,
                tripleQuotedStrings: !0
            }), ["cv", "py", "python"]), l(o({
                keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
                hashComments: !0,
                multiLineStrings: !0,
                regexLiterals: 2
            }), ["perl", "pl", "pm"]), l(o({
                keywords: v,
                hashComments: !0,
                multiLineStrings: !0,
                regexLiterals: !0
            }), ["rb", "ruby"]), l(o({
                keywords: p,
                cStyleComments: !0,
                regexLiterals: !0
            }), ["javascript", "js"]), l(o({
                keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
                hashComments: 3,
                cStyleComments: !0,
                multilineStrings: !0,
                tripleQuotedStrings: !0,
                regexLiterals: !0
            }), ["coffee"]), l(o({
                keywords: b,
                cStyleComments: !0,
                multilineStrings: !0
            }), ["rc", "rs", "rust"]), l(s([], [
                ["str", /^[\S\s]+/]
            ]), ["regex"]);
            var S = u.PR = {
                createSimpleLexer: s,
                registerLangHandler: l,
                sourceDecorator: o,
                PR_ATTRIB_NAME: "atn",
                PR_ATTRIB_VALUE: "atv",
                PR_COMMENT: "com",
                PR_DECLARATION: "dec",
                PR_KEYWORD: "kwd",
                PR_LITERAL: "lit",
                PR_NOCODE: "nocode",
                PR_PLAIN: "pln",
                PR_PUNCTUATION: "pun",
                PR_SOURCE: "src",
                PR_STRING: "str",
                PR_TAG: "tag",
                PR_TYPE: "typ",
                prettyPrintOne: u.prettyPrintOne = function(e, t, i) {
                    var n = document.createElement("div");
                    return n.innerHTML = "<pre>" + e + "</pre>", n = n.firstChild, i && a(n, i, !0), c({
                        h: t,
                        j: i,
                        c: n,
                        i: 1
                    }), n.innerHTML
                },
                prettyPrint: u.prettyPrint = function(t, i) {
                    function n() {
                        for (var i = u.PR_SHOULD_USE_CONTINUATION ? f.now() + 250 : 1 / 0; l.length > g && i > f.now(); g++) {
                            for (var s = l[g], h = w, d = s; d = d.previousSibling;) {
                                var p = d.nodeType,
                                    S = (7 === p || 8 === p) && d.nodeValue;
                                if (S ? !/^\??prettify\b/.test(S) : 3 !== p || /\S/.test(d.nodeValue)) break;
                                if (S) {
                                    h = {}, S.replace(/\b(\w+)=([\w%+\-.:]+)/g, function(e, t, i) {
                                        h[t] = i
                                    });
                                    break
                                }
                            }
                            if (d = s.className, (h !== w || v.test(d)) && !b.test(d)) {
                                for (p = !1, S = s.parentNode; S; S = S.parentNode)
                                    if (C.test(S.tagName) && S.className && v.test(S.className)) {
                                        p = !0;
                                        break
                                    }
                                if (!p) {
                                    if (s.className += " prettyprinted", p = h.lang, !p) {
                                        var O, p = d.match(y);
                                        !p && (O = r(s)) && x.test(O.tagName) && (p = O.className.match(y)), p && (p = p[1])
                                    }
                                    if (L.test(s.tagName)) S = 1;
                                    else var S = s.currentStyle,
                                        _ = o.defaultView,
                                        S = (S = S ? S.whiteSpace : _ && _.getComputedStyle ? _.getComputedStyle(s, e).getPropertyValue("white-space") : 0) && "pre" === S.substring(0, 3);
                                    _ = h.linenums, (_ = "true" === _ || +_) || (_ = (_ = d.match(/\blinenums\b(?::(\d+))?/)) ? _[1] && _[1].length ? +_[1] : !0 : !1), _ && a(s, _, S), m = {
                                        h: p,
                                        c: s,
                                        j: _,
                                        i: S
                                    }, c(m)
                                }
                            }
                        }
                        l.length > g ? setTimeout(n, 250) : "function" == typeof t && t()
                    }
                    for (var s = i || document.body, o = s.ownerDocument || document, s = [s.getElementsByTagName("pre"), s.getElementsByTagName("code"), s.getElementsByTagName("xmp")], l = [], h = 0; s.length > h; ++h)
                        for (var d = 0, p = s[h].length; p > d; ++d) l.push(s[h][d]);
                    var s = e,
                        f = Date;
                    f.now || (f = {
                        now: function() {
                            return +new Date
                        }
                    });
                    var m, g = 0,
                        y = /\blang(?:uage)?-([\w.]+)(?!\S)/,
                        v = /\bprettyprint\b/,
                        b = /\bprettyprinted\b/,
                        L = /pre|xmp/i,
                        x = /^code$/i,
                        C = /^(?:pre|code|xmp)$/i,
                        w = {};
                    n()
                }
            };
            "function" == typeof define && define.amd && define("google-code-prettify", [], function() {
                return S
            })
        }()
}();

/* FYI: https://github.com/google/code-prettify/blob/master/styles/desert.css */
var content = '/* desert scheme ported from vim to google prettify */ pre.prettyprint { display: block; background-color: #333 } pre .nocode { background-color: none; color: #000 } pre .str { color: #ffa0a0 } /* string  - pink */ pre .kwd { color: #f0e68c; font-weight: bold } pre .com { color: #87ceeb } /* comment - skyblue */ pre .typ { color: #98fb98 } /* type    - lightgreen */ pre .lit { color: #cd5c5c } /* literal - darkred */ pre .pun { color: #fff }    /* punctuation */ pre .pln { color: #fff }    /* plaintext */ pre .tag { color: #f0e68c; font-weight: bold } /* html/xml tag    - lightyellow */ pre .atn { color: #bdb76b; font-weight: bold } /* attribute name  - khaki */ pre .atv { color: #ffa0a0 } /* attribute value - pink */ pre .dec { color: #98fb98 } /* decimal         - lightgreen */  /* Specify class=linenums on a pre to get line numbering */ ol.linenums { margin-top: 0; margin-bottom: 0; color: #AEAEAE } /* IE indents via margin-left */ li.L0,li.L1,li.L2,li.L3,li.L5,li.L6,li.L7,li.L8 { list-style-type: none } /* Alternate shading for lines */ li.L1,li.L3,li.L5,li.L7,li.L9 { }  @media print {   pre.prettyprint { background-color: none }   pre .str, code .str { color: #060 }   pre .kwd, code .kwd { color: #006; font-weight: bold }   pre .com, code .com { color: #600; font-style: italic }   pre .typ, code .typ { color: #404; font-weight: bold }   pre .lit, code .lit { color: #044 }   pre .pun, code .pun { color: #440 }   pre .pln, code .pln { color: #000 }   pre .tag, code .tag { color: #006; font-weight: bold }   pre .atn, code .atn { color: #404 }   pre .atv, code .atv { color: #060 } }';
/* FYI: [javascript \- How to add line numbers to all lines in Google Prettify? \- Stack Overflow]( https://stackoverflow.com/questions/8399547/how-to-add-line-numbers-to-all-lines-in-google-prettify ) */
content += '.linenums li { list-style-type: decimal; }';

/* for github.com */
content += '.markdown-body pre { background-color: #333 !important; }';
/* for gitlab.com */
content += 'code { background-color: #333 !important; }';

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = content;
document.getElementsByTagName('head')[0].appendChild(style);

Array.prototype.forEach.call(document.querySelectorAll("pre"), function(pre_element) {
    console.log('set class="prettyprint" at <pre>', pre_element);
    pre_element.setAttribute("class", "prettyprint linenums");
});

PR.prettyPrint();
void(0);
