<p align="right"><a href="./README_ZH.md">中文</a> / <a href="./README.md">English</a></p>

![logo](http://mat1.gtimg.com/www/js/libs/raw/bbo-logo.png)

---

![npm version](https://img.shields.io/npm/v/bbo.svg) ![gzip size](https://img.shields.io/bundlephobia/minzip/ppo-cli.svg?label=gzip%20size) ![monthly npm installs](https://img.shields.io/npm/dm/ppo-cli.svg?label=npm%20downloads) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

> 🐝🐜 bbo is a useful utility collection library with zero dependencies.

## Overview

Every frontend developer has his own utils library, and we often write methods that are easily forgotten and highly used. [bbo](https://github.com/tnfe/bbo.git) is a super small and useful utils library for JavaScript. It isn't couping with [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

I sorted out the most frequently used functions in daily development. These functions are almost ubiquitous in your development, and they cannot be found in lodash and underscore.

Most code comes from the [stackOverflow](https://stackoverflow.com/) site in the high-score answers, so we pay tribute to the original authors.

With easy code and less than 7k gzip, bbo can be used anytime and anywhere with no worries.

See the [latest docs/documentation](https://tnfe.github.io/bbo/) for a full API reference or [bbo-docs](https://github.com/vsuke/bbo-docs.git).

## Why

When you use react, vue, angular，you often need to write a lot of utils methods. But lodash and underscore libraries are not omnipotent. So you have to find a lot of tool libraries. By using bbo, you can solve many small problems in the daily development. It is simple and compact!

## Documentation

- [Full api documentation on Line](https://tnfe.github.io/bbo/)
- [Github docs](https://github.com/vsuke/bbo-docs.git)

## Functions

| device                               | args                                   | http                               | string                         | array                                |
| :----------------------------------- | :------------------------------------- | :--------------------------------- | :----------------------------- | :----------------------------------- |
| [ua][ua]                             | [args][args]                           | [open][open]                       | [trim][trim]                   | [unique][unique]                     |
| [isIos][isios]                       | [trash][trash]                         | [getUrlParam][geturlparam]         | [fillZero][fillzero]           | [uniqueBy][uniqueby]                 |
| [isiPhone][isiphone]                 | [noop][noop]                           | [setUrlParam][seturlparam]         | [longUnique][longunique]       | [uniqueFrom][uniquefrom]             |
| [isIPad][isipad]                     | [merge][merge]                         | [deleteUrlParam][deleteurlparam]   | [stripTags][striptags]         | [random][random]                     |
| [isAndroid][isandroid]               | [over][over]                           | [objectParam][objectparam]         | [capitalize][capitalize]       | [randomSize][randomsize]             |
| [isMobile][ismobile]                 | [call][call]                           | [httpGet][httpget]                 | [deCapitalize][decapitalize]   | [shuffle][shuffle]                   |
| [isPC][ispc]                         | **bom**                                | [httpPost][httppost]               | [isAbsoluteURL][isabsoluteurl] | [contains][contains]                 |
| [isWeixin][isweixin]                 | [stopPropagation][stoppropagation]     | **random**                         | [mapString][mapstring]         | [includesAll][includesall]           |
| [isNewsApp][isnewsapp]               | [g][g]                                 | [randomColor][randomcolor]         | [mask][mask]                   | [includesAny][includesany]           |
| [isQQ][isqq]                         | [gc][gc]                               | [randomA2B][randoma2b]             | [splitLines][splitlines]       | [removeAt][removeat]                 |
| [mqqbrowser][mqqbrowser]             | [c][c]                                 | [randomKey][randomkey]             | [camelize][camelize]           | [remove][remove]                     |
| [isTenvideo][istenvideo]             | [query][query]                         | **behavior**                       | [underscored][underscored]     | [compact][compact]                   |
| [isWeiShi][isweishi]                 | [show][show]                           | [trigger][trigger]                 | [dasherize][dasherize]         | [compactAll][compactall]             |
| [isIphoneXmodel][isiphonexmodel]     | [hide][hide]                           | [lockTouch][locktouch]             | [truncate][truncate]           | [pluck][pluck]                       |
| [isIE][isie]                         | [elementContains][elementcontains]     | [copyToClipboard][copytoclipboard] | [byteSize][bytesize]           | [union][union]                       |
| [ieVersion][ieversion]               | [formToObject][formtoobject]           | **mlodash**                        | [byteLen][bytelen]             | [unionBy][unionby]                   |
| **log**                              | [getStyle][getstyle]                   | [getTag][gettag]                   | [repeat][repeat]               | [unionWith][unionwith]               |
| [log][log]                           | [setStyle][setstyle]                   | [hasOwnProperty][hasownproperty]   | [endsWith][endswith]           | [intersect][intersect]               |
| [logs][logs]                         | [attr][attr]                           | [isObject][isobject]               | [startsWith][startswith]       | [intersectBy][intersectby]           |
| [removeConsole][removeconsole]       | **load**                               | [isArray][isarray]                 | [containsWith][containswith]   | [difference][difference]             |
| **other**                            | [loadImages][loadimages]               | [isString][isstring]               | [xssFilter][xssfilter]         | [differenceBy][differenceby]         |
| [uuid][uuid]                         | [loadjs][loadjs]                       | [isBoolean][isboolean]             | [effortIndex][effortindex]     | [max][max]                           |
| [hash][hash]                         | [loadcss][loadcss]                     | [isNumber][isnumber]               | [capwords]                     | [min][min]                           |
| [judge][judge]                       | **fill**                               | [isMap][ismap]                     |                                | [equal][equal]                       |
| [getType][gettype]                   | [fill0][fill0]                         | [isSet][isset]                     |                                | [allEqual][allequal]                 |
| [isTypeof][istypeof]                 | [floor][floor]                         | [isFunction][isfunction]           |                                | [all][all]                           |
| [construct][construct]               | [chainAsync][chainasync]               | [isEmpty][isempty]                 |                                | [any][any]                           |
| [paramsName][paramsname]             | [numberFormat][numberformat]           | [isShallowEqual][isshallowequal]   |                                | [chunk][chunk]                       |
| [eventEmitter][eventemitter]         | [modulo][modulo]                       | [has][has]                         |                                | [countBy][countby]                   |
| **times**                            | **cookie**                             | [toPath][topath]                   |                                | [countOccurrences][countoccurrences] |
| [setTimesout][settimesout]           | [cookie][cookie]                       | [reduce][reduce]                   |                                | [drop][drop]                         |
| [clearTimesout][cleartimesout]       | [setCookie][setcookie]                 | [forEach][foreach]                 |                                | [dropRight][dropright]               |
| [getDate][getdate]                   | [getCookie][getcookie]                 | [map][map]                         |                                | [dropWhile][dropwhile]               |
| [formatPassTime][formatpasstime]     | [deleteCookie][deletecookie]           | [find][find]                       |                                | [dropRightWhile][droprightwhile]     |
| [formatRemainTime][formatremaintime] | [parseCookie][parsecookie]             | [findIndex][findindex]             |                                | [column][column]                     |
| [formatDuration][formatduration]     | **image**                              | [get][get]                         |                                | [search][search]                     |
| [sleep][sleep]                       | [checkImageSize][checkimagesize]       | [debounce][debounce]               |                                | [unary][unary]                       |
| **json**                             | [imageOptimization][imageoptimization] | [throttle][throttle]               |                                | [indexBy][indexby]                   |
| [toJson][tojson]                     |                                        | [pick][pick]                       |                                |                                      |
| [jsonp][jsonp]                       |                                        | [omit][omit]                       |                                |                                      |
| **storage**                          |                                        | [isSymbol][issymbol]               |                                |                                      |
| [storage][storage]                   |                                        | [deepClone][deepclone]             |                                |                                      |

### Usage

#### example

```js
let username = bbo.getCookie('username'); // => 'bbo'
let json = cookie().getJson(); //  => {a: 1, b: 2}
let isiPhone = bbo.isiPhone(); // => true

// X XS, XSMax, XR
let isIphoneXmodel = bbo.isIphoneXmodel(); // => false

bbo.log('hello world!');

let id = bbo.setTimesout(
  function(word) {
    console.log(word);
    console.log(this); // => log {index: 3 ,times: 8, over: false}
  },
  1000 / 20,
  8,
  'helloWorld'
);

bbo.math.numberFormat(1234.56, 2, ',', ' '); // => '1 234,56'
```

#### Install

bbo supports Node.js, Rollup, Webpack, Browserify。

![commonjs]

#### npm

[![bbo](https://nodei.co/npm/bbo.png)](https://npmjs.org/package/bbo)

Install the library with npm into your local modules directory:

```js
npm install bbo --save
```

#### CommonJS modules

Then in your application require the entire library:

```js
const bbo = require('bbo');
bbo.isiPhone(); // => 'true'
```

Or require individual functions:

```js
const cookie = require('bbo/cookie');
```

#### ES2015 modules

Bbo is compatible with ES2015 modules to import the entire library:

```js
import bbo from 'bbo';
```

Or import individual functions:

```js
import storage from 'bbo/storage';
```

#### Browser

![browsers]

Load the UMD builds directly into browser's web page:

- [dist/bbo.min.js](./dist/bbo.min.js) , minified production-ready, with [source map](./dist/bbo.min.js.map)
- [dist/bbo.js](./dist/bbo.js) uncompressed with comments

```js
<script src="bbo.min.js" type="text/javascript"></script>
```

Then a global variable `bbo` is exposed for the entire library:

```js
<script type="text/javascript">
  bbo.cookie().getJson(); // => {a: 1, b: 2}
</script>
```

#### CDN

```js
https://mat1.gtimg.com/www/js/libs/bbo.min.js
```

## Building

**node is a dependency, use terminal/iTerm to install it with**

```JavaScript
git clone git://github.com/tnfe/bbo.git

...
npm install
npm run lint
npm run build
```

And run example

```JavaScript
npm run start
//visit http://localhost:8080
```

## Maintainers

[@vsuke](https://github.com/vsuke).

## Contribution

Contribution is welcome!

- Create a pull request containing bug fixes or new features. 😎

- [Propose](https://github.com/tnfe/bbo/issues/news) new functions, improvements, better documentation

See [contributors](https://github.com/tnfe/bbo/graphs/contributors).

If you want to participate in the creation of this project,Edit or add function,[Fork](https://github.com/tnfe/bbo) this project,Modify and [Pull requests](https://github.com/tnfe/bbo/pulls) or new [Issues](https://github.com/tnfe/bbo/issues).

How to sync？

```bash
# Add upstream origin，Just execute it once
git remote add upstream git@github.com:tnfe/bbo.git

# Pull remote code
git pull upstream master

# Commit changes
git add .
git commit

# update fork
git push origin master
```

More: [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/tnfe/bbo/releases).

## License

[MIT](http://www.opensource.org/licenses/mit-license).

[commonjs]: http://mat1.gtimg.com/www/js/libs/raw/commonjs.png
[browsers]: http://mat1.gtimg.com/www/js/libs/raw/browsers.png
[ua]: https://tnfe.github.io/bbo/#ua
[isios]: https://tnfe.github.io/bbo/#isios
[isiphone]: https://tnfe.github.io/bbo/#isiphone
[isipad]: https://tnfe.github.io/bbo/#isipad
[isandroid]: https://tnfe.github.io/bbo/#isandroid
[ismobile]: https://tnfe.github.io/bbo/#ismobile
[ispc]: https://tnfe.github.io/bbo/#ispc
[isweixin]: https://tnfe.github.io/bbo/#isweixin
[isnewsapp]: https://tnfe.github.io/bbo/#isnewsapp
[isqq]: https://tnfe.github.io/bbo/#isqq
[mqqbrowser]: https://tnfe.github.io/bbo/#mqqbrowser
[istenvideo]: https://tnfe.github.io/bbo/#istenvideo
[isweishi]: https://tnfe.github.io/bbo/#isweishi
[isiphonexmodel]: https://tnfe.github.io/bbo/#isiphonexmodel
[isie]: https://tnfe.github.io/bbo/#isie
[ieversion]: https://tnfe.github.io/bbo/#ieversion
[log]: https://tnfe.github.io/bbo/#log
[logs]: https://tnfe.github.io/bbo/#logs
[removeconsole]: https://tnfe.github.io/bbo/#removeconsole
[uuid]: https://tnfe.github.io/bbo/#uuid
[hash]: https://tnfe.github.io/bbo/#hash
[judge]: https://tnfe.github.io/bbo/#judge
[gettype]: https://tnfe.github.io/bbo/#gettype
[istypeof]: https://tnfe.github.io/bbo/#istypeof
[construct]: https://tnfe.github.io/bbo/#construct
[paramsname]: https://tnfe.github.io/bbo/#paramsname
[eventemitter]: https://tnfe.github.io/bbo/#eventemitter
[args]: https://tnfe.github.io/bbo/#args
[trash]: https://tnfe.github.io/bbo/#trash
[noop]: https://tnfe.github.io/bbo/#noop
[merge]: https://tnfe.github.io/bbo/#merge
[over]: https://tnfe.github.io/bbo/#over
[call]: https://tnfe.github.io/bbo/#call
[stoppropagation]: https://tnfe.github.io/bbo/#stoppropagation
[g]: https://tnfe.github.io/bbo/#g
[gc]: https://tnfe.github.io/bbo/#gc
[c]: https://tnfe.github.io/bbo/#c
[query]: https://tnfe.github.io/bbo/#query
[show]: https://tnfe.github.io/bbo/#show
[hide]: https://tnfe.github.io/bbo/#hide
[elementcontains]: https://tnfe.github.io/bbo/#elementcontains
[formtoobject]: https://tnfe.github.io/bbo/#formtoobject
[getstyle]: https://tnfe.github.io/bbo/#getstyle
[setstyle]: https://tnfe.github.io/bbo/#setstyle
[attr]: https://tnfe.github.io/bbo/#attr
[loadimages]: https://tnfe.github.io/bbo/#loadimages
[loadjs]: https://tnfe.github.io/bbo/#loadjs
[loadcss]: https://tnfe.github.io/bbo/#loadcss
[tojson]: https://tnfe.github.io/bbo/#tojson
[jsonp]: https://tnfe.github.io/bbo/#jsonp
[cookie]: https://tnfe.github.io/bbo/#cookie
[setcookie]: https://tnfe.github.io/bbo/#setCookie
[getcookie]: https://tnfe.github.io/bbo/#getcookie
[deletecookie]: https://tnfe.github.io/bbo/#deletecookie
[parsecookie]: https://tnfe.github.io/bbo/#parsecookie
[storage]: https://tnfe.github.io/bbo/#storage
[open]: https://tnfe.github.io/bbo/#open
[geturlparam]: https://tnfe.github.io/bbo/#geturlparam
[seturlparam]: https://tnfe.github.io/bbo/#seturlparam
[deleteurlparam]: https://tnfe.github.io/bbo/#deleteurlparam
[objectparam]: https://tnfe.github.io/bbo/#objectparam
[httpget]: https://tnfe.github.io/bbo/#httpget
[httppost]: https://tnfe.github.io/bbo/#httppost
[settimesout]: https://tnfe.github.io/bbo/#settimesout
[cleartimesout]: https://tnfe.github.io/bbo/#cleartimesout
[getdate]: https://tnfe.github.io/bbo/#getdate
[formatpasstime]: https://tnfe.github.io/bbo/#formatpasstime
[formatremaintime]: https://tnfe.github.io/bbo/#formatremaintime
[formatduration]: https://tnfe.github.io/bbo/#formatduration
[sleep]: https://tnfe.github.io/bbo/#sleep
[fill0]: https://tnfe.github.io/bbo/#fill0
[floor]: https://tnfe.github.io/bbo/#floor
[chainasync]: https://tnfe.github.io/bbo/#chainasync
[numberformat]: https://tnfe.github.io/bbo/#numberformat
[modulo]: https://tnfe.github.io/bbo/#modulo
[randomcolor]: https://tnfe.github.io/bbo/#randomcolor
[randoma2b]: https://tnfe.github.io/bbo/#randoma2b
[randomkey]: https://tnfe.github.io/bbo/#randomkey
[trigger]: https://tnfe.github.io/bbo/#trigger
[locktouch]: https://tnfe.github.io/bbo/#locktouch
[copytoclipboard]: https://tnfe.github.io/bbo/#copytoclipboard
[checkimagesize]: https://tnfe.github.io/bbo/#checkimagesize
[imageoptimization]: https://tnfe.github.io/bbo/#imageoptimization
[gettag]: https://tnfe.github.io/bbo/#gettag
[hasownproperty]: https://tnfe.github.io/bbo/#hasownproperty
[isobject]: https://tnfe.github.io/bbo/#isobject
[isarray]: https://tnfe.github.io/bbo/#isarray
[isstring]: https://tnfe.github.io/bbo/#isstring
[isboolean]: https://tnfe.github.io/bbo/#isboolean
[isnumber]: https://tnfe.github.io/bbo/#isnumber
[ismap]: https://tnfe.github.io/bbo/#ismap
[isset]: https://tnfe.github.io/bbo/#isset
[isfunction]: https://tnfe.github.io/bbo/#isfunction
[isempty]: https://tnfe.github.io/bbo/#isempty
[isshallowequal]: https://tnfe.github.io/bbo/#isshallowequal
[has]: https://tnfe.github.io/bbo/#has
[reduce]: https://tnfe.github.io/bbo/#reduce
[foreach]: https://tnfe.github.io/bbo/#foreach
[map]: https://tnfe.github.io/bbo/#map
[findindex]: https://tnfe.github.io/bbo/#findindex
[find]: https://tnfe.github.io/bbo/#find
[topath]: https://tnfe.github.io/bbo/#topath
[get]: https://tnfe.github.io/bbo/#get
[debounce]: https://tnfe.github.io/bbo/#debounce
[throttle]: https://tnfe.github.io/bbo/#throttle
[pick]: https://tnfe.github.io/bbo/#pick
[omit]: https://tnfe.github.io/bbo/#omit
[issymbol]: https://tnfe.github.io/bbo/#issymbol
[deepclone]: https://tnfe.github.io/bbo/#deepclone
[trim]: https://tnfe.github.io/bbo/#trim
[fillzero]: https://tnfe.github.io/bbo/#fillzero
[longunique]: https://tnfe.github.io/bbo/#longunique
[striptags]: https://tnfe.github.io/bbo/#striptags
[capitalize]: https://tnfe.github.io/bbo/#capitalize
[decapitalize]: https://tnfe.github.io/bbo/#decapitalize
[isabsoluteurl]: https://tnfe.github.io/bbo/#isabsoluteurl
[mapstring]: https://tnfe.github.io/bbo/#mapstring
[mask]: https://tnfe.github.io/bbo/#mask
[splitlines]: https://tnfe.github.io/bbo/#splitlines
[camelize]: https://tnfe.github.io/bbo/#camelize
[underscored]: https://tnfe.github.io/bbo/#underscored
[dasherize]: https://tnfe.github.io/bbo/#dasherize
[truncate]: https://tnfe.github.io/bbo/#truncate
[bytesize]: https://tnfe.github.io/bbo/#bytesize
[bytelen]: https://tnfe.github.io/bbo/#bytelen
[repeat]: https://tnfe.github.io/bbo/#repeat
[endswith]: https://tnfe.github.io/bbo/#endswith
[startswith]: https://tnfe.github.io/bbo/#startswith
[containswith]: https://tnfe.github.io/bbo/#containswith
[xssfilter]: https://tnfe.github.io/bbo/#xssfilter
[effortindex]: https://tnfe.github.io/bbo/#effortindex
[capwords]: https://tnfe.github.io/bbo/#capwords
[unique]: https://tnfe.github.io/bbo/#unique
[uniqueby]: https://tnfe.github.io/bbo/#uniqueby
[uniquefrom]: https://tnfe.github.io/bbo/#uniquefrom
[random]: https://tnfe.github.io/bbo/#random
[randomsize]: https://tnfe.github.io/bbo/#randomsize
[shuffle]: https://tnfe.github.io/bbo/#shuffle
[contains]: https://tnfe.github.io/bbo/#contains
[includesall]: https://tnfe.github.io/bbo/#includesall
[includesany]: https://tnfe.github.io/bbo/#includesany
[removeat]: https://tnfe.github.io/bbo/#removeat
[remove]: https://tnfe.github.io/bbo/#remove
[compact]: https://tnfe.github.io/bbo/#compact
[compactall]: https://tnfe.github.io/bbo/#compactall
[pluck]: https://tnfe.github.io/bbo/#pluck
[union]: https://tnfe.github.io/bbo/#union
[unionby]: https://tnfe.github.io/bbo/#unionby
[unionwith]: https://tnfe.github.io/bbo/#unionwith
[intersect]: https://tnfe.github.io/bbo/#intersect
[intersectby]: https://tnfe.github.io/bbo/#intersectby
[difference]: https://tnfe.github.io/bbo/#difference
[differenceby]: https://tnfe.github.io/bbo/#differenceby
[max]: https://tnfe.github.io/bbo/#max
[min]: https://tnfe.github.io/bbo/#min
[equal]: https://tnfe.github.io/bbo/#equal
[allequal]: https://tnfe.github.io/bbo/#allequal
[all]: https://tnfe.github.io/bbo/#all
[any]: https://tnfe.github.io/bbo/#any
[chunk]: https://tnfe.github.io/bbo/#chunk
[countby]: https://tnfe.github.io/bbo/#countby
[countoccurrences]: https://tnfe.github.io/bbo/#countoccurrences
[drop]: https://tnfe.github.io/bbo/#drop
[dropright]: https://tnfe.github.io/bbo/#dropright
[dropwhile]: https://tnfe.github.io/bbo/#dropwhile
[droprightwhile]: https://tnfe.github.io/bbo/#droprightwhile
[column]: https://tnfe.github.io/bbo/#column
[search]: https://tnfe.github.io/bbo/#search
[unary]: https://tnfe.github.io/bbo/#unary
[indexby]: https://tnfe.github.io/bbo/#indexby
