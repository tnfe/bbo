## Overview

![npm version](https://img.shields.io/npm/v/bbo.svg) ![gzip size](https://img.shields.io/bundlephobia/minzip/bbo.svg?label=gzip%20size) ![monthly npm installs](https://img.shields.io/npm/dm/bbo.svg?label=npm%20downloads) ![image](https://img.shields.io/badge/license-Apache2.0-blue.svg)

> A utility belt library for modern JavaScript.

Every frontend developer has his own utils library, and we often write methods that are easily forgotten and highly used. [bbo](https://github.com/tnfe/bbo.git) is a super small and useful utils library for JavaScript. It isn't couping with [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

I sorted out the most frequently used functions in daily development. These functions are almost ubiquitous in your development, and they cannot be found in lodash and underscore.

Most code comes from the [stackOverflow](https://stackoverflow.com/) site in the high-score answers, so we pay tribute to the original authors.

With easy code and less than 7k gzip, bbo can be used anytime and anywhere with no worries.

See the [latest docs/documentation](https://github.ahthw.com/bbo/) for a full API reference.

## From:

Project from：[https://github.com/a-jie/ppo](https://github.com/a-jie/ppo) and [ppo-cli](https://github.com/halldwang/ppo-cli) [onavo](https://github.com/halldwang/onavo/tree/master)

## Installation

#### Install using npm

[![anix](https://nodei.co/npm/bbo.png)](https://npmjs.org/package/bbo)

```
npm install bbo --save
...
import bbo from 'bbo';
```

## Usage

```
var username = bbo.getCookie('username');

bbo.log('hello world!');

var id = bbo.setTimesout(function(word){
    console.log(word);
    console.log(this);  // log {index: 3 ,times: 8, over: false}
}, 1000/20, 8, 'helloWorld')
```

## Why?

When you use react, vue, angular，you often need to write a lot of utils methods. But lodash and underscore libraries are not omnipotent. So you have to find a lot of tool libraries. By using bbo, you can solve many small problems in the daily development. It is simple and compact!

## Maintainers

[@halldwang](https://github.com/halldwang).

## Contribution

Thank you all who already contributed to bbo!

<a href="https://github.com/tnfe/bbo/graphs/contributors"><img src="https://opencollective.com/tnfe/bbo/contributors.svg?width=890" /></a>

## License

Trine is ISC licensed. See the [LICENSE](https://github.com/tnfe/bbo/blob/master/LICENSE) document for more information.
