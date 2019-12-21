import { Tool } from './tool.js';

var tool = new Tool();
class Registry {

    constructor() {
        this.user = tool.$('#username');
        this.pass = tool.$('#password');
        this.phone = tool.$('#phone');  //手机号
        this.user_info = tool.$('.user_info'); //用户名提示
        this.submit = tool.$('#rgt_btn'); //提交按钮

        this.uselock = true;
        this.yzmlock = true;
        this.tellock = true;
        this.confirmlock = true;
        this.passlock = true;
    }
    init() {

        let _this = this;

        //1.用户名验证
        this.user.onblur = function () {
            if (this.value !== '') {
                var user = this.value;
                let regStr = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/;
                if (!(regStr.test(user))) {
                    _this.user_info.innerHTML = '16位以内的字母、数字、下划线组成';
                    _this.uselock = false;
                    return false;
                } else {
                    tool.$ajax({
                        type: 'post',
                        url: 'http://localhost/project/yhd/yhd/lib/registry.php',
                        data: {
                            xingming: user,
                        },
                    }).then(function (res) {
                        if (!res) {  //不存在
                            _this.user_info.innerHTML = '√';
                            _this.uselock = true;

                        } else {
                            _this.user_info.innerHTML = '用户已存在';
                            _this.uselock = false;
                        }
                    });
                }
            } else {
                _this.user_info.innerHTML = '用户名不能为空';
                _this.uselock = false;
            }

        };


        // 手机号验证
        this.phone.onblur=function () {
            _this.checkPhone();
        };


        //验证码
        tool.$('.get_yzm').onclick = function () {
            _this.code_Obj({
                codeLength: 6
            });

        };

        //验证码信息提示
        tool.$('#yzm').onblur = function () {
            if (this.value !== '') {
                if (this.value == tool.$('.get_yzm').innerHTML) {
                    tool.$('.yzm_info').innerHTML = '√';
                    _this.yzmlock = true;
                } else {
                    tool.$('.yzm_info').innerHTML = '验证码输入错误';
                    _this.yzmlock = false;
                }
            } else {
                tool.$('.yzm_info').innerHTML = '验证码不能为空';
                _this.yzmlock = false;
            }
        };

        // 密码强度
        var passReg = [
            /^.{6,16}$/,
            /[A-Z]+/,
            /[a-z]+/,
            /\d+/,
            /\W+/
        ];
        this.pass.onkeyup = function () {
            var check = passReg.map(reg => reg.test(tool.$('#password').value));
            var strength = check.reduce((a, b) => {
                if (b) a.count++;
                return a;
            }, {
                count: 0
            });

            var res = tool.$('.pass_info');
            switch (strength.count) {
                case 1:
                case 2:
                    res.innerHTML = '太弱';
                    _this.passlock = false
                    break;
                case 3:
                    if (check[0]) res.innerHTML = '弱';
                    _this.passlock = true;
                    break;
                case 4:
                    if (check[0]) res.innerHTML = '中';
                    _this.passlock = true;
                    break;
                case 5:
                    res.innerHTML = '强';
                    _this.passlock = true;
                    break;
            }

        };

        this.pass.onblur = function () {

            if (this.value !== '') {
                if (this.value.length >= 6 && this.value.length <= 12) {
                    tool.$('.pass_info').innerHTML = '√';
                    _this.passlock = true;
                } else {
                    tool.$('.pass_info').innerHTML = '密码由6到12位字符组成';
                    _this.passlock = false;
                }

            } else {
                tool.$('.pass_info').innerHTML = '密码不能为空';
                _this.passlock = false;
            }
        }

        // 密码确认
        tool.$('#againpass').onblur=function () {
            if (this.value !== '') {
                if (tool.$('#password').value !== tool.$('#againpass').value) {
                    tool.$('.againpass_info').innerHTML='密码输入错误';
                    _this.confirmlock = false;
                } else {
                    tool.$('.againpass_info').innerHTML='√';
                    _this.confirmlock = true;
                }
            } else {
                tool.$('.againpass_info').innerHTML='密码不能为空';
                _this.confirmlock = false;

            }

        };


        //提交信息
       
        this.submit.onclick = function () {
            var result=_this.verify();
            if (result) {
                tool.$ajax({
                    type: 'post',
                    url: 'http://localhost/project/yhd/yhd/lib/registry.php',
                    data: {
                        username: _this.user.value,
                        password: hex_sha1(_this.pass.value)
                    },

                }).then(function () {
                    location.href = 'http://localhost/project/yhd/yhd/src/html/login.html';
                });
            }

        };

    }


    /**
     * 手机号验证
     */
    checkPhone() {

        if (this.phone.value !== '') {
            var phone=this.phone.value;
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
                tool.$('.phone_info').innerHTML = "手机号码有误，请重填";
                this.tellock = false;
                return false;
            } else {
                tool.$('.phone_info').innerHTML = '√';
                this.tellock = true;
            }
        } else {
            tool.$('.phone_info').innerHTML = '手机号不能为空';
            this.tellock = false;
        }
    }


    // 随机数
    code_Obj(o) {
        var _this = this;
        var options = {
            code_l: o.codeLength,//验证码长度
            codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ],
            code_Init: function () {
                var code = "";
                var codeColor = "";
                for (var i = 0; i < this.code_l; i++) {
                    var charNum = Math.floor(Math.random() * 62);
                    code += this.codeChars[charNum];
                }
                console.log(code);
                tool.$('.get_yzm').innerHTML = code;
            }
        };

        options.code_Init();//初始化验证码

    }


    verify() {
        if (tool.$('#username').value === '') {
            tool.$('.user_info').innerHTML='用户名不能为空';
            this.uselock = false;
        }
        if (tool.$('#phone').value === '') {
            tool.$('.phone_info').innerHTML='手机号不能为空';
            this.tellock = false;
        }
        if (tool.$('#yzm').value === '') {
            tool.$('.yzm_info').innerHTML='验证码不能为空';
            this.yzmlock = false;
        }
        if (tool.$('#password').value === '') {
            tool.$('.pass_info').innerHTML='密码不能为空';
            this.passlock = false;
        }
        if (tool.$('#againpass').value === '') {
            tool.$('.againpass_info').innerHTML='密码不能为空';
            this.confirmlock = false;
        }
        if (!this.uselock || !this.tellock || !this.yzmlock || !this.passlock || !this.confirmlock) {//阻止跳转
            return false;
        } else {
            return true;
        }

    }























    

    // // 信息提交



}
new Registry().init();