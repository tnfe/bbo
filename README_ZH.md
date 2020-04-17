<p align="right"><a href="./README_ZH.md">中文</a> / <a href="./README.md">English</a></p>

![logo](http://mat1.gtimg.com/www/js/libs/raw/bbo-logo.png)

---

![npm version](https://img.shields.io/npm/v/bbo.svg) ![gzip size](https://img.shields.io/bundlephobia/minzip/ppo-cli.svg?label=gzip%20size) ![monthly npm installs](https://img.shields.io/npm/dm/ppo-cli.svg?label=npm%20downloads) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

> bbo 项目是一个实用的 js 函数工具库。

使用 node，react，vue，angular，webpack 等进行项目开发时，需要编写许多 utils 方法，并且开发中还需要不断重写很多函数，使用 bbo 可以简单经凑地解决这些问题。

### 概述

每个前端开发人员都有自己的 utils 库, 这些方法我们高频使用，但又要在每个项目中重写。 [bbo](https://github.com/tnfe/bbo.git) 是一款超小且实用的函数工具库，而且不同于 [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

项目整理了日常开发中最常用的功能。 这些功能在您的开发中几乎无处不在，并且在主流的函数工具库中找不到。大多数代码来自于高分答案中的[stackoverflow.com](https://stackoverflow.com/) 网站，向原始作者表示敬意。项目在 gzip 压缩下只有 7K, 所以你可以随时随地使用。

请参阅最新的文档 [Documentation](https://tnfe.github.io/bbo/) 以获取完整的 API 参考，或者在 github 上贡献[bbo-docs](https://github.com/vsuke/bbo-docs.git)文档。

### 文档

- [在线阅读](https://tnfe.github.io/bbo/)
- [文档仓库](https://github.com/vsuke/bbo-docs.git)

## 功能

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
| [judge][judge]                       | **fill**                               | [isMap][ismap]                     | **object**                     | [equal][equal]                       |
| [getType][gettype]                   | [fill0][fill0]                         | [isSet][isset]                     | [properObject][properobject]   | [allEqual][allequal]                 |
| [isTypeof][istypeof]                 | [floor][floor]                         | [isFunction][isfunction]           | [objectDiff][objectdiff]       | [all][all]                           |
| [construct][construct]               | [chainAsync][chainasync]               | [isEmpty][isempty]                 | [addedDiff][addeddiff]         | [any][any]                           |
| [paramsName][paramsname]             | [numberFormat][numberformat]           | [isShallowEqual][isshallowequal]   | [deletedDiff][deleteddiff]     | [chunk][chunk]                       |
| [eventEmitter][eventemitter]         | [modulo][modulo]                       | [has][has]                         | [detailedDiff][detaileddiff]   | [countBy][countby]                   |
| **times**                            | **cookie**                             | [toPath][topath]                   | [updatedDiff][updateddiff]     | [countOccurrences][countoccurrences] |
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
| [storage][storage]                   |                                        | [isDate][isdate]                   |                                |                                      |
|                                      |                                        | [deepClone][deepclone]             |                                |                                      |

### 使用

#### 范例

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

#### 引用

[![bbo](https://nodei.co/npm/bbo.png)](https://npmjs.org/package/bbo)

可以在 Node.js, Rollup, Webpack, Browserify 等环境中使用。

![commonjs]

#### 使用 npm 安装

```js
npm install bbo --save
```

#### CommonJS

使用整个库

```js
const bbo = require('bbo');
bbo.isiPhone(); // => 'true'
```

个别功能：

```js
const cookie = require('bbo/cookie');
```

#### ES2015

```js
import bbo from 'bbo';
```

导入单个功能：

```js
import storage from 'bbo/storage';
```

#### 浏览器

![browsers]

直接将 js 引入到浏览器中

- [dist/bbo.min.js](./dist/bbo.min.js) , [source map](./dist/bbo.min.js.map) 混淆压缩
- [dist/bbo.js](./dist/bbo.js) 未压缩

```js
<script src="bbo.min.js" type="text/javascript"></script>
```

使用`bbo`为全局变量

```js
<script type="text/javascript">
  bbo.cookie().getJson(); // => {a: 1, b: 2}
</script>
```

#### CDN

```js
//mat1.gtimg.com/www/js/libs/bbo.min.js
```

### 开发

**依赖 nodejs, 请使用 terminal/iTerm 安装环境。**

构建项目

```js
git clone https://github.com/tnfe/bbo.git

...
npm install
npm run lint
npm run build
```

运行项目

```js
npm run start
// 访问 http://localhost:8080
```

### 贡献内容

如果你想参与这个项目的共同创作，修改或添加内容，可以先 [Fork](https://github.com/tnfe/bbo) 这个项目的仓库，然后将修改的内容提交 [Pull requests](https://github.com/tnfe/bbo/pulls) ；或者创建 [Issues](https://github.com/tnfe/bbo/issues)。

Fork 后的仓库如何同步本仓库？

```bash
# 添加 upstream 源，只需执行一次
git remote add upstream git@github.com:tnfe/bbo.git

# 拉取远程代码
git pull upstream master

# 提交修改
git add .
git commit

# 更新 fork 仓库
git push origin master
```

更多参考： [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)

### 贡献文档

文档使用 [Vuepress](https://vuepress.vuejs.org/zh/) 撰写并生成[网站](https://tnfe.github.io/bbo/)，请查看[文档仓库](https://github.com/halldwang/bbo-docs.git) `package.json` 中的 `scripts` 配置和 `/docs` 目录中的脚本来了解文档的构建和发布过程。

```bash
# 初始化 nodejs 依赖
npm install

# 安装 vuepress 插件
npm install -g vuepress

# 进入图书目录
cd docs

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .

# 查看本地文档内容
# 访问 http://localhost:8080

```

### 维护者

[@vsuke](https://github.com/vsuke).

### 贡献者

感谢为 bbo 做出贡献。

[https://github.com/tnfe/bbo/graphs/contributors](https://github.com/tnfe/bbo/graphs/contributors)

### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/tnfe/bbo/releases).

### License

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
[isdate]: https://tnfe.github.io/bbo/#isDate
[properobject]: https://tnfe.github.io/bbo/#properObject
[objectdiff]: https://tnfe.github.io/bbo/#objectDiff
[deleteddiff]: https://tnfe.github.io/bbo/#deletedDiff
[detaileddiff]: https://tnfe.github.io/bbo/#detailedDiff
[addeddiff]: https://tnfe.github.io/bbo/#addedDiff
[updateddiff]: https://tnfe.github.io/bbo/#updatedDiff