$(function () {
    var form = layui.form
    var layer = layui.layer
    var id
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1 ~ 6个字符之间! '
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        //请求用户个人信息
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo', res.data)
                id = res.data.id
            }
        })
    }

    //重置基本资料
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //提交用户基本资料
    $('.layui-form').on('submit', function (e) {
        var data = {id: id,nickname:  $('.layui-form [name=nickname]').val(),email:  $('.layui-form [name=email]').val()}
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })

})


