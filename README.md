## Overview

![npm version](https://img.shields.io/npm/v/bbo.svg) ![gzip size](https://img.shields.io/bundlephobia/minzip/bbo.svg?label=gzip%20size) ![monthly npm installs](https://img.shields.io/npm/dm/bbo.svg?label=npm%20downloads) ![image](https://img.shields.io/badge/license-Apache2.0-blue.svg)

> A utility belt library for modern JavaScript.

Every frontend developer has written his own utils library, and we often write methods that are easily forgotten and highly used. [bbo](https://github.com/tnfe/bbo.git) is a super small and useful utils library for JavaScript. It and [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js) almost no coupling.

I sorted out the most frequently used function functions in everyday development. These functions are almost ubiquitous in your development, and they are not found in lodash underscore.

Most of the code comes from the [stackoverflow](https://stackoverflow.com/) site in the high score answer, here to pay tribute to the original author.

bbo little poor, gzip less than 7k, so a library you can use it anytime, anywhere without worrying about anything.

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
}, 1000/20, 8, 'helloworld')
```

## Why?

When you use react, vue, angular often need to write a lot of utils method. But lodash and underscore these libraries are not omnipotent. So you have to find a lot of tool library. Use bbo, you can solve the daily development of many small problems. Simple and compact!

## License

Trine is ISC licensed. See the [LICENSE](https://github.com/halldwang/bbo/blob/beta/LICENSE) document for more information.
