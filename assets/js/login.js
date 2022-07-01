$(function () {

    $('#link_reg').on('click',function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer;

    form.verify({
        'pwd': [ /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格' ],
        'repwd': function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    $('#form_reg').on('submit', function (e) {
        //获取登录密码和用户名
        // var data = {username: $('.reg-box [name=username]').val(),password:  $('.reg-box [name=password]').val()}
        e.preventDefault()
        $.post('/api/reguser', $(this).serialize() ,function (res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method: 'POST',
            //获取登录密码和用户名简便用法
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)

                location.href = './index.html'
            }
        })
    })
})
