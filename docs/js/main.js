$(function() {
  // ------------------ LOGS -----------------
  addChapter({
    name: "LOGS"
  });

  // log
  addFragment({
    name: "log",
    api: "ppo.log(msg, styles?)",
    introduce: "the tool that display log information on your phone device.",
    code: [
      "var cookie = ppo.getCookie('pid'); \n",
      "ppo.log(cookie); or ppo.log(cookie, {color:'#fff', 'background':'#ff0000'});"
    ],
    example: '<div class="button">open log</div>',
    script: function(ele) {
      let style = { color: "#fff", background: "#ff0000" };
      let id = 0;

      ele.find(".button").click(function() {
        clearInterval(id);
        id = setInterval(function() {
          let random = ppo.randomA2B(10000, 90000, "int");
          let isMobile = ppo.isMobile();
          ppo.log("log :: isMobile-" + isMobile + " random-" + random, style);
        }, 1000 / 3);
      });
    }
  });

  // logs
  addFragment({
    name: "logs",
    api: "ppo.logs(onlyid&time, arg1, arg2, ...)",
    introduce:
      "In setInterval or requestAnimationFrame functions, a fixed number of log is performed only.",
    code: [
      "setInterval(function(){ \n",
      "   //Onlyid is myid, print only 15 times \n",
      "   ppo.logs(myid + '&15', r, 'show id: '+myid, ' index:', ++index); \n",
      "}, 20);"
    ],
    example:
      '<div class="button">start log</div> Please press f12 to open the console panel',
    script: function(ele) {
      let id = 0;
      let myid;
      ele.find(".button").click(function() {
        let index = 0;
        myid = ppo.randomA2B(1, 9999, true);
        clearInterval(id);

        id = setInterval(function() {
          ppo.logs(
            myid + "&15",
            ppo.floor(Math.random(), 5),
            "show id: " + myid,
            " index:",
            ++index
          );
        }, 20);
      });
    }
  });

  // removeConsole
  addFragment({
    name: "removeConsole",
    api: "ppo.removeConsole(clear?)",
    introduce:
      "Clear the console information to make the console cleaner and just keep the console.error",
    code: ["ppo.removeConsole(); \n", "ppo.removeConsole('clear');"],
    example:
      '<div class="button">remove console</div> Please press f12 to open the console panel',
    script: function(ele) {
      ele.find(".button").click(function() {
        console.log(1);
        console.log(2);
        setTimeout(function() {
          ppo.removeConsole("clear");
        }, 300);
      });
    }
  });

  // ------------------ Bom and Dom -----------------
  addChapter({
    name: "Global"
  });

  // open new url dont not blocked by browser
  addFragment({
    name: "open",
    api: "ppo.open(url)",
    introduce: "js opens a new page without being blocked by the browser.",
    code: [
      "btn.onclick = function(){ \n",
      "   setTimeout(function () { ppo.open('https://github.com'); }, 200); \n",
      "}"
    ],
    example: '<div class="button">open github</div>',
    script: function(ele) {
      ele.find(".button").click(function() {
        if (ppo.isMobile()) {
          ppo.open("https://github.com");
        } else {
          setTimeout(function() {
            ppo.open("https://github.com");
          }, 200);
        }
      });
    }
  });

  // setInterval func fix times
  addFragment({
    name: "setTimesout",
    api: "ppo.setTimesout(func, delay, times, ...args)",
    introduce:
      'Similar to window.setTimeout, but you can repeat a fixed number of times a function. The function of this is pointing to <code style="margin-left:5px;">{"index":index ,"times":times, "over":over}</code>.',
    code: [
      "var id = ppo.setTimesout(function(word){ \n",
      "    console.log(word); \n",
      "    console.log(this);  // log {index: 3 ,times: 8, over: false} \n\n",
      "    if(this.over) ... \n",
      "}, 50, 8, 'helloworld')"
    ],
    example: [
      'times:: <select><option value ="10">10</option><option value ="20" selected="selected">20</option><option value="30">30</option><option value="40">40</option></select> ',
      '<div class="button">start</div>  num:: <span>0</span>'
    ],
    script: function(ele) {
      let id = 0;
      ele.find(".button").click(function() {
        let times = ele.find("select").val();

        if ($(this).text() == "stop") {
          $(this).text("start");
          ppo.clearTimesout(id);
        } else {
          $(this).text("stop");

          id = ppo.setTimesout(
            function(target) {
              ele.find("span").text(this.index);
              if (this.over) $(target).text("start");
            },
            150,
            parseInt(times),
            this
          );
        }
      });
    }
  });

  // setInterval func fix times
  addFragment({
    name: "clearTimesout",
    api: "ppo.clearTimesout(id)",
    introduce: "clear ppo.setTimesout.",
    code: ["ppo.clearTimesout(id)"]
  });

  addFragment({
    name: "construct",
    api: "ppo.construct(class, ...args)",
    introduce:
      "Instantiate a class object and can pass parameters, only support es5 and above.",
    code: [
      "var classs = [Dog, Cat, Goose, Elephant]; \n",
      "var randomClass = ppo.randomFromArray(classs); \n",
      "var animal = ppo.construct(randomClass, 'animal', 300); \n",
      "console.log(animal.name); \n"
    ]
  });

  addFragment({
    name: "paramsName",
    api: "ppo.paramsName(func)",
    introduce: "Gets all the formal parameter names of a function.",
    code: [
      "function abc($use, $next, $name, $key){ ... }; \n",
      "let paramsName = ppo.paramsName(abc); \n",
      '// ["$use", "$next", "$name", "$key"]; \n'
    ],
    script: function(ele) {
      function abc($use, $next, $name, $key) {}
      // console.log(ppo.paramsName(abc));
    }
  });

  // lock touch in mobile phone
  addFragment({
    name: "lockTouch",
    api: "ppo.lockTouch()",
    introduce:
      'Mobile web development often binds the touch event and sets e.preventDefault(). <br/>like code: <code style="margin-left:5px;">document.addEventListener("touchmove", function (e) { e.preventDefault(); }, false);</code>',
    code: ["ppo.lockTouch()"]
  });

  // ------------------ Url Params -----------------
  addChapter({
    name: "Detecting"
  });

  // is ios
  addFragment({
    name: "isIOS",
    api: "ppo.isIOS() or ppo.isIos()",
    introduce: "Check whether the mobile device is an IOS device.",
    code: ["if(ppo.isIOS()) { console.log('this is ios'); }"],
    example: "detecting is ios - " + ppo.isIOS()
  });

  // is Android
  addFragment({
    name: "isAndroid",
    api: "ppo.isAndroid()",
    introduce: "Check whether the mobile device is an Android device.",
    code: ["if(ppo.isAndroid()) { console.log('this is android'); }"],
    example: "detecting is android - " + ppo.isAndroid()
  });

  // is iPhone
  addFragment({
    name: "isiPhone",
    api: "ppo.isiPhone()",
    introduce: "Check whether the mobile device is an iphone.",
    code: ["if(ppo.isiPhone()) { console.log('this is iphone'); }"],
    example: "detecting is iphone - " + ppo.isiPhone()
  });

  // is ipad
  addFragment({
    name: "isIPad",
    api: "ppo.isIPad()",
    introduce: "Check whether the mobile device is an IPad.",
    code: ["if(ppo.isIPad()) { console.log('this is ipad'); }"],
    example: "detecting is ipad - " + ppo.isIPad()
  });

  // is isMobile
  addFragment({
    name: "isMobile",
    api: "ppo.isMobile()",
    introduce: "Check if the current device is a mobile device.",
    code: [
      "if(ppo.isMobile()) { document.querySelector('.title').style.color = '#fff'; }"
    ],
    example: "detecting is Mobile - " + ppo.isMobile()
  });

  // is isWeixin
  addFragment({
    name: "isWeixin",
    api: "ppo.isWeixin()",
    introduce: "Check if the current device is Weixin device.",
    code: [
      "if(ppo.isWeixin()) { document.querySelector('.title').style.color = '#fff'; }"
    ],
    example: "detecting is Weixin - " + ppo.isWeixin()
  });

  // is isIE
  addFragment({
    name: "isIE",
    api: "ppo.isIE()",
    introduce: "Detect the current browser is Microsoft IE.",
    code: ["ppo.isIE()"],
    example: "detecting is IE browser - " + ppo.isIE()
  });

  // get ie Version
  addFragment({
    name: "ieVersion",
    api: "ppo.ieVersion() or ppo.ieVer()",
    introduce: "Check the IE browser version.",
    code: ["document.getElementById('info').innerText = ppo.ieVersion();"],
    example: "IE browser version - " + ppo.ieVersion()
  });

  // get navigator.userAgent
  addFragment({
    name: "ua",
    api: "ppo.ua(lower?)",
    introduce: "return navigator.userAgent.",
    code: [
      "console.log(ppo.ua()); \n",
      "console.log(ppo.ua('l')); \n",
      "console.log(ppo.ua('lower')); \n"
    ],
    example: "<span style='font-size:12px'>" + ppo.ua() + "</span>"
  });

  // ------------------ Url Params -----------------
  addChapter({
    name: "Url Params"
  });

  // getUrlParam
  addFragment({
    name: "getUrlParam",
    api: "ppo.getUrlParam(name, url?)",
    introduce: "get the url parameter of the current page(or custom).",
    code: [
      "console.log(ppo.getUrlParam('id')); \n",
      "ppo.getUrlParam('a' ,'http://xxx.com?a=3&b=sd23s');"
    ]
  });

  // setUrlParam
  addFragment({
    name: "setUrlParam",
    api: "ppo.setUrlParam(name, val, url?)",
    introduce:
      "Set the current page (or custom) url parameters, return the modified url.",
    code: [
      "console.log(ppo.setUrlParam('abc', 'helloworld')); \n",
      "ppo.setUrlParam('a', 1, 'http://xxx.com?a=3&b=sd23s');"
    ]
  });

  // deleteUrlParam
  addFragment({
    name: "deleteUrlParam",
    api: "ppo.deleteUrlParam(name, url?) or ppo.delUrlParam(name)",
    introduce:
      "delete the current page (or custom) url parameter, return the modified url.",
    code: [
      "console.log(ppo.delUrlParam('uid')); \n",
      "ppo.delUrlParam('a', 'http://xxx.com?a=3&b=sd23s');"
    ]
  });

  // ------------------ Cookies -----------------
  addChapter({
    name: "Cookie"
  });

  // setCookie
  addFragment({
    name: "setCookie",
    api: "ppo.setCookie(name, value, option?)",
    introduce:
      "Set the browser cookie. The option param can set the following parameters: days, hour, path, domain, secure, raw.",
    code: [
      "ppo.setCookie('username', 'small'); \n",
      "ppo.setCookie('time', 123, { hour: 12 }); \n",
      "ppo.setCookie('a', 'helloworld', { domain: '.github.com' }); \n",
      "ppo.setCookie('code', '%3Ca%3E%20sd', { raw: true }); //do not encode"
    ],
    example:
      '<input placeholder="input a word!"></input><div class="button">set cookie</div> <span></span>',
    script: function(ele) {
      ele.find(".button").click(function() {
        let val = $(this)
          .prev()
          .val();
        if (!val) return;

        ppo.setCookie(
          "ppo_cookie",
          $(this)
            .prev()
            .val(),
          {
            hour: 12
          }
        );

        alert("set success! please see getCookie!");
      });
    }
  });

  // getCookie
  addFragment({
    name: "getCookie",
    api: "ppo.getCookie(name)",
    introduce: "Get the browser cookie.",
    code: ["ppo.getCookie('username');"],
    example: '<div class="button">get cookie</div> <span>ppo_cookie :: </span>',
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();
      ele.find(".button").click(function() {
        ele
          .find(".button")
          .next()
          .text(preText + ppo.getCookie("ppo_cookie"));
      });
    }
  });

  // deleteCookie
  addFragment({
    name: "deleteCookie",
    api: "ppo.deleteCookie(name) or ppo.delCookie(name)",
    introduce: "delete the browser cookie.",
    code: ["ppo.delCookie('username');"],
    example: '<div class="button">delete cookie</div>',
    script: function(ele) {
      ele.find(".button").click(function() {
        ppo.delCookie("ppo_cookie");
        alert("delete success! please see getCookie!");
      });
    }
  });

  // cookie().set()
  addFragment({
    name: "cookie().set()",
    api: 'ppo.cookie().set("name","value")',
    introduce: "set the browser cookie.",
    code: [
      "ppo.cookie().set('name', 'value', { expires: 7 }); \n",
      'ppo.cookie().set("name", "value", { expires: 7, path: "" }); \n',
      "ppo.cookie().set('name', { foo: 'bar' })"
    ]
  });

  // cookie().get()
  addFragment({
    name: "cookie().get()",
    api: "ppo.cookie().get()",
    introduce: "get the browser cookie.",
    code: [
      "ppo.cookie().get('name'); \n",
      "ppo.cookie().get(); \n",
      'ppo.cookie().getJson("name");\n',
      "ppo.cookie().getJson();\n"
    ]
  });

  // cookie().remove()
  addFragment({
    name: "cookie().remove()",
    api: "ppo.cookie().remove()",
    introduce: "remove the browser cookie.",
    code: [
      'ppo.cookie().remove("name"); \n',
      'ppo.cookie().remove("name", { path: "" }); \n'
    ]
  });

  // ------------------ Random And Math -----------------
  addChapter({
    name: "Random And Math"
  });

  // randomFromA2B
  addFragment({
    name: "randomFromA2B",
    api: "ppo.randomFromA2B(min, max, int?)",
    introduce: "Returns the random number between two numbers.",
    code: ["ppo.randomFromA2B(1, 20) \n", "ppo.randomFromA2B(1, 20, true)"],
    example:
      '<div class="button">get random</div> <span>[1-1000](int) :: </span>',
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();
      ele
        .find(".button")
        .click(function() {
          let text = preText + ppo.randomA2B(1, 1000, true);
          $(this)
            .next()
            .text(text);
        })
        .trigger("click");
    }
  });

  // randomFromArray
  addFragment({
    name: "randomFromArray",
    api: "ppo.randomFromArray(arr)",
    introduce: "Returns a random item in the array.",
    code: ["ppo.randomFromArray([1, 3, 9, 20]) \n"],
    example:
      "<div class=\"button\">get random</div> <span>[1, 3, 9, 20, 'a', 'b'] :: </span>",
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();
      ele
        .find(".button")
        .click(function() {
          let text = preText + ppo.randomFromArray([1, 3, 9, 20, "a", "b"]);
          $(this)
            .next()
            .text(text);
        })
        .trigger("click");
    }
  });

  // randomColor
  addFragment({
    name: "randomColor",
    api: "ppo.randomColor()",
    introduce: "Returns the hex format random color.",
    code: ["ppo.randomColor() \n"],
    example: '<div class="button">get random</div> <span>color :: </span>',
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();
      ele
        .find(".button")
        .click(function() {
          let color = ppo.randomColor();
          let text = preText + color;
          $(this)
            .next()
            .text(text);
          $(this).css("background", color);
        })
        .trigger("click");
    }
  });

  // randomKey
  addFragment({
    name: "randomKey",
    api: "ppo.randomKey(length?)",
    introduce:
      "Returns a random string containing uppercase and lowercase letters and numbers.",
    code: ["ppo.randomKey(12) \n"],
    example: '<div class="button">get random</div> <span>key :: </span>',
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();

      ele
        .find(".button")
        .click(function() {
          let text = preText + ppo.randomKey(12);
          $(this)
            .next()
            .text(text);
        })
        .trigger("click");
    }
  });

  // floor
  addFragment({
    name: "floor",
    api: "ppo.floor(a, b?)",
    introduce: "Keep a few decimal places. Default is 0",
    code: ["ppo.floor(Math.random()*100, 5) \n"],
    example: '<div class="button">get result</div> <span>result :: </span>',
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();
      ele
        .find(".button")
        .click(function() {
          let text = preText + ppo.floor(Math.random() * 100, 5);
          $(this)
            .next()
            .text(text);
        })
        .trigger("click");
    }
  });

  // fill0
  addFragment({
    name: "fill0",
    api: "ppo.fill0(num)",
    introduce: "Number less than 10 complement 0",
    code: ["ppo.fill0(5) // 05 \n"]
  });

  // ------------------ Assets and Data -----------------
  addChapter({
    name: "Assets and Data"
  });

  // loadjs
  addFragment({
    name: "loadjs",
    api: "ppo.loadjs(urls, idOrCallback?, callback?)",
    introduce:
      "Asynchronous loading javascript script file and only load once.",
    code: [
      "ppo.loadjs('http://x.com/a.js'); \n",
      "ppo.loadjs('http://x.com/a.js', callback); \n",
      "ppo.loadjs('http://x.com/a.js', 'only_id', callback); \n",
      "ppo.loadjs(['./a.js','./b.js','./c.js'], callback); \n"
    ],
    example:
      '<a href="https://github.com/SmartDoubleXiao/multipleClick" target="_blank">a jQuery plugin for multiple click</a><span style="color:#000;"></span><div class="button">three click</div>',
    script: function(ele) {
      ppo.loadjs("./docs/js/mclick.js", function() {
        ele
          .find(".button")
          .prev()
          .text(" is loaded!");
        ele.find(".button").mClick(300, 3, function() {
          alert("press three times");
        });
      });
    }
  });

  // toJson
  addFragment({
    name: "toJson",
    api: "ppo.toJson(res) or ppo.toJSON(res)",
    introduce:
      "This method is used to handle the data returned by ajax, which is not determined to be a string or json",
    code: [
      "$.ajax({ url:'xx', success: res => { \n",
      "       // res = \"{ code: 0 , msg: 'xxx' , data: ... }\"; \n",
      "       res = ppo.toJson(res); \n",
      "       if(res.code==0){ ... }; \n",
      "   } \n",
      "});"
    ]
  });

  // ------------------ Date -----------------
  addChapter({
    name: "Date"
  });

  // getDate
  addFragment({
    name: "getDate",
    api: "ppo.getDate(d1?, d2?)",
    introduce:
      "Return to the current time, year - month - day - seconds - minutes.",
    code: ["ppo.getDate(); \n", "ppo.getDate('-', '-'); \n"],
    example: '<span class="gdate"></span>',
    script: function() {
      setInterval(function() {
        $(".gdate").text(ppo.getDate());
      }, 1000 / 30);
    }
  });

  // ------------------ Other -----------------
  addChapter({
    name: "Other"
  });

  // uuid
  addFragment({
    name: "uuid",
    api: "ppo.uuid()",
    introduce: "Generates a Universally Unique Identifier",
    code: ["ppo.uuid() \n"],
    example:
      '<div class="button">generate uuid</div> uuid :: <span class="uuid"> </span>',
    script: function(ele) {
      ele
        .find(".button")
        .click(function() {
          $(".uuid").text(ppo.uuid());
        })
        .trigger("click");
    }
  });

  // hash
  addFragment({
    name: "hash",
    api: "ppo.hash(string)",
    introduce: "Generates a unique hasn code based on the input string",
    code: ["ppo.hash('sdf%$sdfMnjjskds23'); \n"],
    example:
      '<input placeholder="please input!"></input><div class="button">get hash code</div> <span>hash :: </span>',
    script: function(ele) {
      let preText = ele
        .find(".button")
        .next()
        .text();
      ele.find("input").val("sdf%$sdfMnjjskds23");

      ele
        .find(".button")
        .click(function() {
          let val = ele.find("input").val();
          let hash = preText + ppo.hash(val);
          $(this)
            .next()
            .text(hash);
        })
        .trigger("click");
    }
  });

  // isTypeof
  addFragment({
    name: "isTypeof",
    api: "ppo.isTypeof(a, type)",
    introduce: "Determine the type of a variable",
    code: ["if(ppo.isTypeof(arr, 'array')){ console.log(arr); } \n"]
  });

  // judge
  addFragment({
    name: "judge",
    api: "ppo.judge(v, vals, strict?)",
    introduce:
      "A number of conditions to determine, like x == a || x == b || x == c ..., strict is ===.",
    code: [
      "if(ppo.judge(fileSuffix, ['.js','.jsx','.css','.less'], 'strict'){  \n",
      "   console.log('This file is legal!');  \n",
      "}"
    ]
  });

  // trash
  addFragment({
    name: "trash",
    api: "ppo.trash",
    introduce:
      "A trash cache object, used to store the development of the need to use a variety of temporary variables",
    code: [
      "ppo.trash['name'] = 'xxxx'; \n",
      "ppo.trash['end'] = (new Date()).getTime(); \n",
      "ppo.trash['cache'] = {}; \n\n",
      "ppo.trash.clear();  // All stored data will be cleared \n",
      "ppo.trash.log();    // All stored data will be printed \n"
    ]
  });

  // args
  addFragment({
    name: "args",
    api: "ppo.args(arguments, first?)",
    introduce:
      "Converts the arguments object to an array object and slice it. first defalult is 0.",
    code: [
      "var args = ppo.args(arguments); \n",
      "var args = ppo.args(arguments, 3); \n"
    ]
  });

  // noop
  addFragment({
    name: "noop",
    api: "ppo.noop",
    introduce: "A noop function",
    code: ["var func = ppo.noop; \n"]
  });
});

// dom method --------------------
// add chapter
function addChapter(data) {
  let chapter = [
    '<h2 id="' + data.name.replace(/\s/gi, "") + '">' + data.name + "</h2>",
    "<hr>"
  ].join("");

  let sideCon = $('<div class="side_con"></div>');
  let side = [
    '<a class="toc_title" href="#' + data.name.replace(/\s/gi, "") + '">',
    "   <span>" + data.name + "</span>",
    "</a>",
    '<ul class="toc_section">',
    "</ul>"
  ].join("");

  sideCon.append(side);
  $("#sidebar").append(sideCon);
  $("#doc").append(chapter);
}

// add fragment
function addFragment(data) {
  let id = data.name.replace(/\s/gi, "");
  let fragment = [
    '<p id="' + id + '">',
    '   <b class="header"><span>✿</span> ' + data.name + "</b>",
    "   <code>" + data.api + "</code>",
    "   <br/>",
    "   <span>" + data.introduce + "</span>",
    "</p>",
    "<pre>" +
      (typeof data.code === "string" ? data.code : data.code.join("")) +
      "</pre>"
  ].join("");

  if (data.example) {
    fragment +=
      '<b>example : </b><span style="color:#777;" class="' +
      id +
      '-example">' +
      (typeof data.example === "string" ? data.example : data.example.join("")) +
      "</span>";
  }

  if (data.script) {
    setTimeout(
      function(pid) {
        data.script($("." + (pid || id) + "-example"));
      },
      50,
      id
    );
  }

  let side = [
    '<li>- <a href="#' +
      data.name.replace(/\s/gi, "") +
      '">' +
      data.name +
      "</a></li>"
  ].join("");

  $(".toc_section:last").append(side);
  $("#doc").append(fragment);
}
