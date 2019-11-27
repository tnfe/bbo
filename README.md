## Overview

![npm version](https://img.shields.io/npm/v/ppo-cli.svg) ![gzip size](https://img.shields.io/bundlephobia/minzip/ppo-cli.svg?label=gzip%20size) ![monthly npm installs](https://img.shields.io/npm/dm/ppo-cli.svg?label=npm%20downloads) ![image](https://img.shields.io/badge/license-Apache2.0-blue.svg)

> A utility belt library for modern JavaScript.

Every frontend developer has written his own utils library, and we often write methods that are easily forgotten and highly used. [ppo](https://github.com/jiayi2/ppo/) is a super small and useful utils library for JavaScript. It and [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js) almost no coupling.

I sorted out the most frequently used function functions in everyday development. These functions are almost ubiquitous in your development, and they are not found in lodash underscore.

Most of the code comes from the [stackoverflow](https://stackoverflow.com/) site in the high score answer, here to pay tribute to the original author.

ppo little poor, gzip less than 6k, so a library you can use it anytime, anywhere without worrying about anything.

See the [latest docs/documentation](https://github.ahthw.com/ppo/) for a full API reference.

## From:

Project from：[https://github.com/a-jie/ppo](https://github.com/a-jie/ppo)

## Installation

#### Install using npm

[![anix](https://nodei.co/npm/ppo-cli.png)](https://npmjs.org/package/ppo-cli)

```
npm install ppo-cli --save
...
import ppo from 'ppo-cli';
```

### Include in html

This function can only be used in previous version. (version <= 1.3.22)
More Change [branch](https://github.com/halldwang/ppo-cli/tree/master)

```
<script type="text/javascript" src="js/ppo.min.js"></script>
```

#### CDN

```
//mat1.gtimg.com/www/js/libs/ppo.1.3.22.min.js
```

## Usage

```
var username = ppo.getCookie('username');

ppo.log('hello world!');

var id = ppo.setTimesout(function(word){
    console.log(word);
    console.log(this);  // log {index: 3 ,times: 8, over: false}
}, 1000/20, 8, 'helloworld')
```

## Why?

When you use react, vue, angular often need to write a lot of utils method. But lodash and underscore these libraries are not omnipotent. So you have to find a lot of tool library. Use ppo, you can solve the daily development of many small problems. Simple and compact!

## License

Trine is ISC licensed. See the [LICENSE](https://github.com/halldwang/ppo-cli/blob/beta/LICENSE) document for more information.
