/**
 * @description 模块依赖注入
 * @author halld
 * @demo        [demo]
 */
void
function (exports) {

	var MODULES = []; // 存放涉及到的所有模块的信息，包含每个模块的url、依赖和回调
	var STATUS = {}; // 模块的状态
	var RESULTS = {}; // 模块的回调返回的结果
	var STACK = []; // 当前待加载的模块栈

	var seed = +new Date();

	var LOADING = 1; // 加载中
	var WAITING = 2; // 等待中
	var DEFINED = 3; // 已定义

	/*
	 * 格式化地址，取绝对路径
	 */
	var formatURL = (function () {
		var a = document.createElement('a');
		a.style.display = 'none';
		document.body.appendChild(a);

		// 相对路径转绝对路径
		var getAbsoluteURL = function (url) {
			// 利用浏览器特性，通过使用a标签来获取绝对路径
			a.href = url;
			return a.href;
		};

		return function (url, base) {
			if (!url) return '';

			if (url.indexOf('://') > 0) return getAbsoluteURL(url); // 已经是绝对路径的情况

			if (base && url.indexOf('.') == 0) url = base.replace(/[^\/]*$/, '') + url; // 以.开始的相对路径，则获取url路径的上一级，再补在相对路径前面

			return getAbsoluteURL(url); // 格式化成绝对路径
		};
	})();

	/**
	 * 处理模块进入等待队列
	 */
	var runLoading = function (url, deps, callback) {
		// 如果自身是内嵌脚本的话，则使用时间戳作为url
		if (typeof url !== 'string') {
			callback = deps;
			deps = url;

			url = './' + (seed++) + '.js'
		}

		url = formatURL(url);

		if (STATUS[url] === DEFINED) return; // 已定义

		// 加载依赖模块
		for (var i = 0, l = deps.length; i < l; i++) {
			deps[i] = formatURL((deps[i] || ''), url); // 格式化依赖列表中的url
			loadResource(deps[i]); // 加载资源
		}

		STATUS[url] = WAITING; // 存在依赖，当前模块标记为等待中

		// 放进模块队列中
		MODULES.push({
			url: url,
			deps: deps,
			callback: callback
		});

		// 检查等待中的模块
		runWaiting();
	};

	/*
	 * 对等待中的模块进行定义
	 */
	var runWaiting = (function () {
		// 检查所有文件是否都载入
		var isFinishLoaded = function () {
			for (var url in STATUS) {
				if (STATUS[url] === LOADING) return false;
			}

			return true;
		};

		// 检查依赖列表是否都载入完成
		var isListLoaded = function (deps) {
			for (var i = deps.length - 1; i >= 0; i--) {
				if (STATUS[deps[i]] !== DEFINED) return false;
			}

			return true;
		};

		return function () {
			if (!MODULES.length) return;

			for (var i = MODULES.length - 1; i >= 0;) {
				var item = MODULES[i];

				if (STATUS[item.url] !== DEFINED) {
					if (!isListLoaded(item.deps)) {
						// 存在未定义的文件，且依赖列表中也存在未定义的文件，则跳过
						i--;
						continue;

					} else {
						// 依赖列表中的文件都已定义，则进行定义自己
						runDefining(item);
					}
				}

				// 删除已经定义的文件，然后重新遍历
				MODULES.splice(i, 1);
				i = MODULES.length - 1;
			}

			if (MODULES.length > 0 && isFinishLoaded()) {
				// 存在循环引用，可以尝试强行定义，不过只能解决弱依赖引用，无法解决强依赖引用
				var item = MODULES.pop();
				runDefining(item);
				runWaiting();
			}
		};
	})();

	/**
	 * 执行模块定义
	 */
	var runDefining = function (item) {
		var args = [];

		// 遍历依赖列表
		for (var i = 0, len = item.deps.length; i < len; i++) {
			var it = item.deps[i];

			RESULTS[it] = RESULTS[it] || {};
			args.push(RESULTS[it]);
		}

		if (item.callback) {
			// 注入依赖并执行
			var result = item.callback.apply(window, args) || {};

			// 合并依赖注入结果		
			var ret = RESULTS[item.url] || {};
			if (typeof result === 'object') {
				for (var key in result)
					ret[key] = result[key];
			} else {
				ret = result;
			}

			// 将定义好的文件放入缓存
			RESULTS[item.url] = ret;
		}

		STATUS[item.url] = DEFINED;
	};


	/*
	 * 解析文件类型，并进行加载
	 */
	var loadResource = (function () {

		// 载入依赖文本
		var loadText = function (url, callback) {
			if (!url) return;
			// 未加载过
			if (STATUS[url] != null) return;
			// 加载文本
			STATUS[url] = LOADING; // 标记为加载中
			var xhr = new window.XMLHttpRequest();

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					var text = xhr.responseText || '';

					STATUS[url] = DEFINED; // 标记为已定义
					RESULTS[url] = text; // 储存结果

					if (callback) callback(text); // 针对json的处理

					// 加载完后检查等待中的模块
					runWaiting();
				}
			};

			xhr.open('GET', url, true);
			xhr.send(null);
		};

		// 载入依赖JSON
		var loadJSON = function (url) {
			loadText(url, function (text) {
				// 解析JSON
				RESULTS[url] = JSON.parse(text);
			});
		};

		// 载入依赖脚本
		var loadScript = function (url) {
			if (STATUS[url]) return; // 已加载则返回

			STATUS[url] = LOADING; // 标记当前模块为加载中

			// 使用script标签添加到文档中，加载运行完再删除
			var script = document.createElement('script');

			script.nowhasload = true;
			script.type = 'text/javascript';
			script.charset = 'utf-8';

			addScriptListener(script); // 监听脚本加载运行

			script.src = url;
			(document.getElementsByTagName('head')[0] || document.body).appendChild(script);
		};

		return function (url) {
			var arr = url.split('.');
			var type = arr.pop();

			if (type === 'js') loadScript(url);
			else if (type === 'json') loadJSON(url);
			else loadText(url);
		};
	})();

	/*
	 * 侦测脚本载入情况
	 */
	var addScriptListener = (function () {
		// 脚本载入完成回调
		var onScriptLoad = function (script) {
			var url = formatURL(script.src);
			if (!url) return;

			// 检查栈中缓存
			var arr = STACK.pop();
			if (arr) {
				arr.unshift(url);
				runLoading.apply(window, arr);
			}

			// 当前模块不处于等待中的话，则标记为已定义
			if (STATUS[url] !== WAITING) STATUS[url] = DEFINED;

			// 清理脚本节点
			if (script && script.parentNode) {
				// 清除事件
				script.onload = script.onerror = null;
				// 清除script标签
				script.parentNode.removeChild(script);
			}

			// 加载完后检查等待中的模块
			runWaiting();
		};

		return function (script) {
			// 加载成功 或 失败
			script.onload = script.onerror = function (e) {
				onScriptLoad(e.target || e.srcElement || this);
			};
		};
	})();


	/**
	 * 暴露出去的define接口
	 */
	var define = function (deps, callback) {
		var args = [].slice.call(arguments, 0);

		STACK.push(args);

		// 对于页面中仍未被检测过的脚本进行处理
		var list = document.getElementsByTagName('script');
		for (var i = list.length - 1; i >= 0; i--) {
			var script = list[i];

			if (!script.nowhasload) {
				script.nowhasload = true;

				if (!script.src && script.innerHTML.search(/\s*define\s*\(/) >= 0) {
					// 内嵌模块定义语句脚本
					args = STACK.pop();
					while (args) {
						runLoading.apply(window, args);
						args = STACK.pop();
					}

				} else {
					// 外嵌模块定义语句脚本
					addScriptListener(list[i]);
				}
			}
		}
	};

	exports.define = define;
}(ppo.modules);