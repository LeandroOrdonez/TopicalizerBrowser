//var cdndomain = 'hub.loginradius.com';
var cdndomain = '';

var LoginRadius_Social;

if (window.LoginRadius_Social !== true) {
    LoginRadius_Social = true;
    //document.write("<script src='//" + cdndomain + "/cdn/include/js/LoginRadius.1.0.js' type='text/javascript'></script>");
	document.write("<script src='js/login-radius/" + cdndomain + "LoginRadius.1.0.js' type='text/javascript'></script>");
}