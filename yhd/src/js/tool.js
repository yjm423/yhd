function Tool() {
    return {
        //获取元素对象
        $: function (selector, all) {
            if (all === 'all') {
                return document.querySelectorAll(selector);
            } else {
                return document.querySelector(selector);
            }
        },
        // ajax --promise
        $ajax:function(option) { //对象做参数
            let promise = new Promise(function (resolve, reject) {
                let ajax = new XMLHttpRequest();
                //1.type设置默认值,默认get
                option.type = option.type || 'get';
        
                //2.设置option.url.必填参数
                if (!option.url) {
                    throw new Error('接口地址必须添加'); //创建错误对象，抛出错误，显示在控制台
                }
        
                //3.数据传输。
                //判断数据是否存在。
                //3.1判断数据的格式。
                function objToString(obj) {
                    let objarr = [];
                    for (var attr in obj) {
                        objarr.push(attr + '=' + obj[attr]);
                    }
                    return objarr.join('&'); //name=zhangsna&age=100&sex=男
                }
        
                if (option.data) {
                    if (typeof option.data === 'object' && !Array.isArray(option.data)) { //数据格式：对象
                        option.data = objToString(option.data);
                    } else {
                        option.data = option.data;
                    }
                }
                //3.2判断传输的方式--get
                if (option.data && option.type === 'get') {
                    option.url += '?' + option.data;
                }
        
                //4.判断是否异步
                if (option.async === 'false' || option.async === false) {
                    option.async = false;
                } else {
                    option.async = true;
                }
        
        
                ajax.open(option.type, option.url, option.async);
        
                //3.3判断传输的方式--post
                if (option.data && option.type === 'post') {
                    ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    ajax.send(option.data);
                } else {
                    ajax.send();
                }
                //5.判断是否异步
                if (option.async) {
                    ajax.onreadystatechange = function () {
                        var objdata;
                        if (ajax.readyState === 4) { //ajax.send发送解析完成
                            if (ajax.status === 200) { //接口地址请求成功
                                //8.判断是否设置数据类型
                                if (option.dataType === 'json') {
                                    objdata = JSON.parse(ajax.responseText);
                                } else {
                                    objdata = ajax.responseText;
                                }
                                //6.设置请求成功状态
                                resolve(objdata); //objdata传给then里面函数。
                            } else {
                                //7.设置请求失败状态
                                reject('接口地址请求失败' + ajax.status);
                            }
                        }
                    }
                } else {
                    if (ajax.status === 200) { //接口地址请求成功
                        resolve(objdata); //objdata传给then里面函数。
                    } else { //请求失败
                        reject('接口地址请求失败' + ajax.status);
                    }
                }
            });
            return promise;
        },
        //cookie 的存、取、删
        getcookie: function (key) {
            if (document.cookie) { //判断是否有cookie
                let arr = document.cookie.split('; '); //拆分cookie
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i].split('='); //拆分cookie，获得key和value
                    // 遍历寻找key 返回值
                    if (item[0] === key) return item[1];
                }
                return ''; //如果遍历结束 都没有找到  返回空字符串
            }
        },
        setcookie: function (key, value, day) {
            if (day) {
                var d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = `${key}=${value};expires=${d};path=/`;
            } else {
                document.cookie = `${key}=${value};path=/`;
            }
        },
        removecookie: function (key) {
            this.set(key, '', -1);
        },

        //缓冲运动
        bufferMove: function (obj, json, fn) {//obj:运动的元素对象  json:属性和属性值组成一个对象  fn:可选的回调函数(前一次运动结束，开启后一次的运动)
            var speed = 0;
            //获取任意的css属性值。
            function getstyle(obj, attr) {
                if (window.getComputedStyle) {
                    return getComputedStyle(obj)[attr];
                } else {
                    return obj.currentStyle[attr];
                }
            }
            clearInterval(obj.timer);//放置定时器叠加
            obj.timer = setInterval(function () {//给每一个元素对象绑定一个定时器
                var bstop = true;

                for (var attr in json) {
                    //1.获取当前盒子的属性值
                    var currentvalue = null;
                    //处理透明度和其他带有px属性值的关系
                    if (attr === 'opacity') {
                        currentvalue = Math.round(getstyle(obj, attr) * 100);//透明度(扩展100倍)
                    } else {
                        currentvalue = parseInt(getstyle(obj, attr));//px
                    }
                    //2.求速度
                    //如果速度>0 向上取整，否则向下取整
                    speed = (json[attr] - currentvalue) / 10;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    //3.判断运动是否停止。
                    if (currentvalue !== json[attr]) {//当前值没到到目标点，继续运动。
                        //属性运动的过程
                        if (attr === 'opacity') {//透明度
                            obj.style.opacity = (currentvalue + speed) / 100;
                            obj.style.filter = 'alpha(opacity=' + (currentvalue + speed) + ')';
                        } else { //px为单位
                            obj.style[attr] = currentvalue + speed + 'px';
                        }
                        bstop = false;
                    }
                }


                //如果bstop走到这里还是为true，代表中间没有改变bstop。所有的属性都运动完成。
                if (bstop) {
                    clearInterval(obj.timer);
                    //利用fn实现运动结束之后需要做的事情。
                    //判断fn是否存在,判断fn是否是函数,执行这个函数。
                    fn && typeof fn === 'function' && fn();
                }

            }, 1000 / 60);
        },

        // 添加类 addClass removeClass

        addClass:function (ele, classname) { //ele:元素对象   
            //判断ele是一个元素还是多个元素。
            //Node:一个元素
            //NodeList：多个元素
            if (ele instanceof NodeList) {
                for (let i = 0; i < ele.length; i++) {
                    ele[i].nodeType === 1 && (ele[i].className += (ele[i].className ? " " : "") + classname);
                }
            }else if(ele instanceof Node){
                ele.nodeType === 1 && (ele.className += (ele.className ? " " : "") + classname);
            }
        },

        removeClass:function(elem, name) {
            var set = " " + elem.className + " ";
  
            // Class name may appear multiple times
            while (set.indexOf(" " + name + " ") >= 0) {
                set = set.replace(" " + name + " ", " ");
            }
  
            // Trim for prettiness
            elem.className = typeof set.trim === "function" ? set.trim() : set.replace(/^\s+|\s+$/g, "");
        },

        // 倒计时
        // timer:function(){
        //         var currenttime = new Date();
        //         var futuretime = new Date('2019-12-31 18:00:00');//未来的时间
        //         var time = parseInt((futuretime - currenttime) / 1000);//剩下的时间--s
        //         //天  时   分   秒
        //         var day = parseInt(time / 86400);//天
        //         var hour = parseInt(time % 86400 / 3600);//小时
        //         var min = parseInt(time % 3600 / 60);//分
        //         var sec = time % 60//秒
        //         return {
        //             Day:day,
        //             Hour:hour,
        //             Min:min,
        //             Sec:sec
        //         }
        //     }
    
        // }




    }
}

export { Tool }