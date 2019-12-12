<div align="center"><img src="https://raw.githubusercontent.com/Tnfe/bbo/master/docs/bbo.png"/></div>

---

<div align="center">
  <a href='https://www.npmjs.com/package/bbo'>
    <img src='https://img.shields.io/npm/v/bbo.svg' alt='npm version' height='18'>
  </a>

  <img src='https://img.shields.io/bundlephobia/minzip/bbo.svg?label=gzip%20size' alt='gzip size' height='18'>

  <img src='https://img.shields.io/npm/dm/bbo.svg?label=npm%20downloads' alt='monthly npm installs' height='18'>

  <img src='https://img.shields.io/badge/license-Apache2.0-blue.svg' alt='license' height='18'>
</div>

🐝🐜

> BBO is a small useful modern JavaScript utility library.

## Overview

Every frontend developer has his own utils library, and we often write methods that are easily forgotten and highly used. [bbo](https://github.com/tnfe/bbo.git) is a super small and useful utils library for JavaScript. It isn't couping with [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

I sorted out the most frequently used functions in daily development. These functions are almost ubiquitous in your development, and they cannot be found in lodash and underscore.

Most code comes from the [stackOverflow](https://stackoverflow.com/) site in the high-score answers, so we pay tribute to the original authors.

With easy code and less than 9k gzip, bbo can be used anytime and anywhere with no worries.

See the [latest docs/documentation](https://github.ahthw.com/bbo/) for a full API reference or [bbo-docs](https://github.com/halldwang/bbo-docs.git).

## Why

When you use react, vue, angular，you often need to write a lot of utils methods. But lodash and underscore libraries are not omnipotent. So you have to find a lot of tool libraries. By using bbo, you can solve many small problems in the daily development. It is simple and compact!

## Documentation

- [Full api documentation on Line ](https://github.ahthw.com/bbo)
- [Github docs](https://github.com/halldwang/bbo-docs.git)

## Installation

Install using npm

[![anix](https://nodei.co/npm/bbo.png)](https://npmjs.org/package/bbo)

```JavaScript
npm install bbo --save
...
import bbo from 'bbo';
```

## Usage

```JavaScript
let username = bbo.getCookie('username');

bbo.log('hello world!');

let id = bbo.setTimesout(function(word){
    console.log(word);
    console.log(this);  // log {index: 3 ,times: 8, over: false}
}, 1000/20, 8, 'helloWorld')
```

## Building

**node is a dependency, use terminal to install it with**

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

Thank you all who already contributed to bbo!

[contributors](https://github.com/tnfe/bbo/graphs/contributors)

## Refer

[ppo](https://github.com/a-jie/ppo) , [ppo-cli](https://github.com/halldwang/ppo-cli) , [onavo](https://github.com/halldwang/onavo/tree/master) , [30-seconds](https://github.com/30-seconds) , [locutus](https://locutus.io/) , [mnu](https://github.com/ihtml5/mnu.git)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/tnfe/bbo/releases).

## License

Bbo is released under the MIT License. http://www.opensource.org/licenses/mit-license
