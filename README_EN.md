<p align="right"><a href="./README.md">中文</a> / <a href="./README_EN.md">English</a></p>

![logo](http://mat1.gtimg.com/www/js/libs/raw/bbo-logo.png)

---

![npm version](https://img.shields.io/npm/v/bbo.svg) ![gzip size](https://img.shields.io/bundlephobia/minzip/ppo-cli.svg?label=gzip%20size) ![monthly npm installs](https://img.shields.io/npm/dm/ppo-cli.svg?label=npm%20downloads) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

> 🐝🐜 bbo is a useful utility collection library with zero dependencies.

## Overview

Every frontend developer has his own utils library, and we often write methods that are easily forgotten and highly used. [bbo](https://github.com/tnfe/bbo.git) is a super small and useful utils library for JavaScript. It isn't couping with [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

I sorted out the most frequently used functions in daily development. These functions are almost ubiquitous in your development, and they cannot be found in lodash and underscore.

Most code comes from the [stackOverflow](https://stackoverflow.com/) site in the high-score answers, so we pay tribute to the original authors.

With easy code and less than 7k gzip, bbo can be used anytime and anywhere with no worries.

See the [latest docs/documentation](https://github.ahthw.com/bbo/) for a full API reference or [bbo-docs](https://github.com/halldwang/bbo-docs.git).

## Why

When you use react, vue, angular，you often need to write a lot of utils methods. But lodash and underscore libraries are not omnipotent. So you have to find a lot of tool libraries. By using bbo, you can solve many small problems in the daily development. It is simple and compact!

## Documentation

- [Full api documentation on Line ](https://github.ahthw.com/bbo)
- [Github docs](https://github.com/halldwang/bbo-docs.git)

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
//mat1.gtimg.com/www/js/libs/bbo.min.js
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

[@halldwang](https://github.com/halldwang).

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
