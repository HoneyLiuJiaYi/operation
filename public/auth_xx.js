
function logout() {
    localStorage.clear();
    window.location.href = "./login.html";
}
$(function () {

    if(localStorage.length == 0){
        alert('请登录！');
        window.location.href = "./login.html";
    }
    var m_id = localStorage.m_id;
    var m_nick = localStorage.nick
    var mail = localStorage.mail;
    var mobile = localStorage.mobile;
    var rename =  localStorage.rename;
    var license = localStorage.license;
    var comment =  localStorage.comment;
    var logo =  localStorage.logo;
    var card =   localStorage.card;
    var sex =   localStorage.sex;
    if (sex == 'female') {
        sex = '女';
    }else {
        sex = '男';
    }
    $('.user_local').text(m_nick);
    $('#mail').text(mail);
    $('#mobile').text(mobile);
    $('#rename').text(rename);
    $('#sex').text(sex);
    $('#comment').text(comment);
//    alert(license);
//    alert($('#license').attr('src'));
    $('#license').attr('src', license);
    $('.logo').attr('src', logo);
    $('#card').attr('src', card);
    $('#logo1').attr('src', logo);
});