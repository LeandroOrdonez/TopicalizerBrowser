//var cdndomain = 'hub.loginradius.com';
var cdndomain = '';

var LoginRadius_Social;

if (window.LoginRadius_Social !== true) {
    LoginRadius_Social = true;
    //document.write("<script src='//" + cdndomain + "/cdn/include/js/LoginRadius.1.0.js' type='text/javascript'></script>");
//    var lr_script = "<script src='js/login-radius/" + cdndomain + "LoginRadius.1.0.js' type='text/javascript'></script>";
//    var parser = new DOMParser();
//    var documentFragment = parser.parseFromString(lr_script, "text/xml");
//    var $head= document.getElementsByTagName('head')[0];
//    $head.appendChild(documentFragment); // assuming 'body' is the body element
//    document.write("");

    var lr_script = document.createElement('script');
    lr_script.src = "js/login-radius/" + cdndomain + "LoginRadius.1.0.js";
    lr_script.type = "text/javascript";
    document.head.appendChild(lr_script);
}