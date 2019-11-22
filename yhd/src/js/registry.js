(function () {

    var uselock = true;
    var tellock = true;
    var yzmlock = true;
    var confirmlock = true;
    var passlock = true;
    $('#username').on('blur', function () {
        if ($(this).val() !== '') {
            var user = $('#username').val();
            regStr = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/;
            if (!(regStr.test(user))) {
                $('.user_info').html('16位以内的字母、数字、下划线组成');
                uselock = false;
                return false;

            } else {

                $.ajax({
                    type: 'post',
                    url: 'http://localhost/project/yhd/yhd/lib/registry.php',
                    data: {
                        xingming: $(this).val(),
                    },
                    success: function (res) {
                        if (!res) {  //不存在
                            $('.user_info').html('√');
                            uselock = true;

                        } else {
                            $('.user_info').html('用户已存在');
                            uselock = false;
                        }
                    }
                });
            }
        } else {
            $('.user_info').html('用户名不能为空');
            uselock = false;
        }

    });





    // 手机号验证
    $('#phone').on('blur', function () {
        checkPhone();
    });

    // 密码输入
    var passReg = [
        /^.{6,16}$/,
        /[A-Z]+/,
        /[a-z]+/,
        /\d+/,
        /\W+/
    ];
    $('#password').on('keyup', function () {
        var check = passReg.map(reg => reg.test($('#password').val()));
        var strength = check.reduce((a, b) => {
            if (b) a.count++;
            return a;
        }, {
            count: 0
        });

        var res = $('.pass_info');
        switch (strength.count) {
            case 1:
            case 2:
                res.html('太弱');
                passlock = false
                break;
            case 3:
                if (check[0]) res.html('弱');
                passlock = true;
                break;
            case 4:
                if (check[0]) res.html('中');
                passlock = true;
                break;
            case 5:
                res.html('强');
                passlock = true;
                break;
        }

    });

    $('#password').on('blur', function () {

        if ($(this).val() !== '') {
            if ($(this).val().length >= 6 && $(this).val().length <= 12) {
                $('.pass_info').html('√');
                passlock = true;
            } else {
                $('.pass_info').html('密码由6到12位字符组成');
                passlock = false;
            }

        } else {
            $('.pass_info').html('密码不能为空');
            passlock = false;
        }
    })

    // 密码确认
    $('#againpass').on('blur', function () {
        if ($(this).val() !== '') {
            if ($('#password').val() !== $('#againpass').val()) {
                $('.againpass_info').html('密码输入错误');
                confirmlock = false;
            } else {
                $('.againpass_info').html('√');
                confirmlock = true;
            }
        } else {
            $('.againpass_info').html('密码不能为空');
            confirmlock = false;

        }

    });

    // 随机验证码确认
    $('#yzm').on('blur', function () {
        if ($(this).val() !== '') {
            if ($(this).val() == $('.get_yzm').html()) {
                $('.yzm_info').html('√');
                yzmlock = true;
            } else {
                $('.yzm_info').html('验证码输入错误');
                yzmlock = false;
            }
        } else {
            $('.yzm_info').html('验证码不能为空');
            yzmlock = false;
        }
    });

    // 验证手机号
    function checkPhone() {
        var phone = $('#phone').val();
        if (phone !== '') {

            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))) {
                $('.phone_info').html("手机号码有误，请重填");
                tellock = false;
                return false;
            } else {
                $('.phone_info').html('√');
                tellock = true;
            }
        } else {
            $('.phone_info').html('手机号不能为空');
            tellock = false;
        }
    }

    // 随机数
    $.fn.code_Obj = function (o) {
        var _this = $(this);
        var options = {
            code_l: o.codeLength,//验证码长度
            codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
            ],
            codeColors: ['#f44336', '#009688', '#cddc39', '#03a9f4', '#9c27b0', '#5e4444', '#9ebf9f', '#ffc8c4', '#2b4754', '#b4ced9', '#835f53', '#aa677e'],
            code_Init: function () {
                var code = "";
                var codeColor = "";
                var checkCode = _this.find("#data_code");
                for (var i = 0; i < this.code_l; i++) {
                    var charNum = Math.floor(Math.random() * 52);
                    code += this.codeChars[charNum];
                }
                for (var i = 0; i < this.codeColors.length; i++) {
                    var charNum = Math.floor(Math.random() * 12);
                    codeColor = this.codeColors[charNum];
                }

                $('.get_yzm').html(code);
                if (checkCode) {
                    checkCode.css('color', codeColor);
                    checkCode.className = "code";
                    checkCode.text(code);
                    checkCode.attr('data-value', code);
                }
            }
        };

        options.code_Init();//初始化验证码
        _this.find("#data_code").bind('click', function () {
            options.code_Init();
        });
    };

    $('.get_yzm').on('click', function () {
        $('#check-code').code_Obj({
            codeLength: 6
        });

    });

    function submit() {
        if ($('#username').val() === '') {
            $('.user_info').html('用户名不能为空');
            uselock = false;
        }
        if ($('#phone').val() === '') {
            $('.phone_info').html('手机号不能为空');
            tellock = false;
        }
        if ($('#yzm').val() === '') {
            $('.yzm_info').html('验证码不能为空');
            yzmlock = false;
        }
        if ($('#password').val() === '') {
            $('.pass_info').html('密码不能为空');
            passlock = false;
        }
        if ($('#againpass').val() === '') {
            $('.againpass_info').html('密码不能为空');
            confirmlock = false;
        }
        if (!uselock || !tellock || !yzmlock || !passlock || !confirmlock) {//阻止跳转
            return false;
        }else{
            return true;
        }

    }

    // 信息提交
    $('#rgt_btn').on('click', function () {
        var result=submit() ;
        console.log(result);
        if(result){
            console.log(result);
            $.ajax({
                type: 'post',
                url: 'http://localhost/project/yhd/yhd/lib/registry.php',
                data: {
                    username: $('#username').val(),
                    password: $.md5($('#password').val())
                },
                success: function (res) {
                    location.href='http://localhost/project/yhd/yhd/src/html/login.html';
                }
            });
        }
       
    });
})();