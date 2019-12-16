<div align="center"><img src="https://raw.githubusercontent.com/Tnfe/bbo/master/docs/bbo.png"/></div>

---

<div align="center">
  <a href='https://www.npmjs.com/package/bbo'>
    <img src='https://img.shields.io/npm/v/bbo.svg' alt='npm version' height='18'>
  </a>

  <img src='https://img.shields.io/bundlephobia/minzip/bbo.svg?label=gzip%20size' alt='gzip size' height='18'>

  <img src='https://img.shields.io/npm/dm/bbo.svg?label=npm%20downloads' alt='monthly npm installs' height='18'>

  <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='license' height='18'>
</div>

🐝🐜

> BBO 是一款非常实用的JavaScript函数工具库。

## 背景

当使用react，vue，angular进行前端开发时，通常需要编写许多utils方法。 但是lodash和underscore并不是万能的。 因此，开发中必须不断找到很多函数工具库。 通过使用bbo，您可以解决日常开发中的许多小问题，简单而紧凑！

## 概述

每个前端开发人员都有自己的utils库, 这些方法我们高频使用，但又要在每个项目中重写。 [bbo](https://github.com/tnfe/bbo.git) 是一款超小且实用的函数工具库，而且不同于 [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js).

我整理了日常开发中最常用的功能。 这些功能在您的开发中几乎无处不在，并且在一些主流的函数工具库中找不到。

大多数代码来自于高分答案中的[stackoverflow.com](https://stackoverflow.com/) 网站，向原始作者表示敬意。

项目在gzip压缩下只有9K, 所以你可以随时随地使用。

请参阅最新的文档 [Documentation](https://github.ahthw.com/bbo/) 以获取完整的API参考，或者在github上贡献[bbo-docs](https://github.com/halldwang/bbo-docs.git)文档。

## 文档

- [在线阅读](https://github.ahthw.com/bbo)
- [文档仓库](https://github.com/halldwang/bbo-docs.git)

## 安装

使用npm

[![anix](https://nodei.co/npm/bbo.png)](https://npmjs.org/package/bbo)

```JavaScript
npm install bbo --save
...
import bbo from 'bbo';
```

## 用法

```JavaScript
let username = bbo.getCookie('username'); // 'bbo'
let json =  cookie().getJson(); // {a: 1, b: 2}
let isiPhone = bbo.isiPhone(); //true or false

bbo.log('hello world!');

let id = bbo.setTimesout(function(word){
    console.log(word);
    console.log(this);  // log {index: 3 ,times: 8, over: false}
}, 1000/20, 8, 'helloWorld')

bbo.math.numberFormat(1234.56, 2, ',', ' ') // '1 234,56'
```

## 开发

**依赖nodejs, 请使用terminal/iTrem安装环境**

构建项目

```JavaScript
git clone git://github.com/tnfe/bbo.git

...
npm install
npm run lint
npm run build
```

运行项目

```JavaScript
npm run start
// 访问 http://localhost:8080
```

## 贡献内容

如果你想参与这个项目的共同创作，修改或添加内容，可以先 [Fork](https://github.com/tnfe/bbo) 这本书的仓库，然后将修改的内容提交 [Pull requests](https://github.com/tnfe/bbo/pulls) ；或者创建 [Issues](https://github.com/tnfe/bbo/issues)。

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

## 贡献文档

这本书使用 [Vuepress](https://vuepress.vuejs.org/zh/) 撰写并生成[网站](https://github.ahthw.com/bbo/)，请查看[文档仓库](https://github.com/halldwang/bbo-docs.git) `package.json` 中的 `scripts` 配置和 `/docs` 目录中的脚本来了解文档的构建和发布过程。

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

## 维护者

[@halldwang](https://github.com/halldwang).

## 贡献者

感谢所有为bbo做出贡献的人！

[https://github.com/tnfe/bbo/graphs/contributors](https://github.com/tnfe/bbo/graphs/contributors)

## 参考

[ppo](https://github.com/a-jie/ppo) , [ppo-cli](https://github.com/halldwang/ppo-cli) , [onavo](https://github.com/halldwang/onavo/tree/master) , [30-seconds](https://github.com/30-seconds) , [locutus](https://locutus.io/) , [mnu](https://github.com/ihtml5/mnu.git)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/tnfe/bbo/releases).

## License

Bbo is released under the MIT License. http://www.opensource.org/licenses/mit-license
