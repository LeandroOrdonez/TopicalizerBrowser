var LoginRadius_SocialLogin = {}, $SL = LoginRadius_SocialLogin;
LoginRadius_SocialLogin.lr_login_settings = {};
LoginRadius_SocialLogin.lr_login_settings = {apikey: "", callback: "", lrinterfacebackground: "", lrsocialloginheading: "", protocol: "http:", samewindow: "", noofcolumns: "", lrinterfacecontainer: "", interfacesize: ""};
LoginRadius_SocialLogin.console = {};
LoginRadius_SocialLogin.util = {};
LoginRadius_SocialLogin.console.log = function() {
    0 < arguments.length && "undefined" !== typeof console && console.log("[LoginRadius - Initializing login interface.] ", arguments)
};
(function(b) {
    function j(b, a, c, d, e) {
        var k = Math.ceil(b.length / d) - 1;
        1 == d ? 1 >= b.length && (a.style.display = "none", c.style.display = "none") : 1 >= b.length - 1 && (a.style.display = "none", c.style.display = "none");
        var f = parseInt(a.href.substring(a.href.indexOf("#") + 1)) + e;
        f <= k && 0 <= f ? (e = f * d, d = e + d - 1, a.href = "#" + f, c.href = "#" + f) : -1 == f ? (e = k * d, d = e + d - 1, a.href = "#" + k, c.href = "#" + k) : (e = 0, d -= 1, a.href = "#0", c.href = "#0");
        for (a = 0; a < b.length; a++)
            b[a].style.display = a >= e && a <= d ? "block" : "none"
    }
    b.elementById = function(b) {
        return document.getElementById(b)
    };
    b.elementsByClass = function(b, a) {
        a = a || document.body;
        for (var c = [], d = RegExp("(^| )" + b + "( |$)"), e = a.getElementsByTagName("*"), k = 0, f = e.length; k < f; k++)
            d.test(e[k].className) && c.push(e[k]);
        return c
    };
    b.addEvent = function(b, a, c) {
        var d = [];
        a instanceof Array ? d = a : d.push(a);
        for (a = 0; a < d.length; a++)
            d[a]["on" + b] = c
    };
    var f = {};
    b.tmpl = function a(c, d) {
        var e = !/\W/.test(c) ? f[c] = f[c] || a(b.elementById(c).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + c.replace(/[\r\t\n]/g,
                " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return d ? e(d) : e
    };
    b.openWindow = function(a) {
        a = a || this.href;
        window.open(a, "lrpopupchildwindow", "menubar=1,resizable=1,width=450,height=500");
        return!1
    };
    b.getinterfacewidth = function(a, c, d, e) {
        return parseInt(a * c) + parseInt(c * d) + parseInt(e)
    };
    b.getPageSize = function() {
        var a, c;
        window.innerHeight && window.scrollMaxY ?
                (a = document.body.scrollWidth, c = window.innerHeight + window.scrollMaxY) : document.body.scrollHeight > document.body.offsetHeight ? (a = document.body.scrollWidth, c = document.body.scrollHeight) : (a = document.body.offsetWidth, c = document.body.offsetHeight);
        var d, e;
        self.innerHeight ? (d = self.innerWidth, e = self.innerHeight) : document.documentElement && document.documentElement.clientHeight ? (d = document.documentElement.clientWidth, e = document.documentElement.clientHeight) : document.body && (d = document.body.clientWidth, e = document.body.clientHeight);
        pageHeight = c < e ? e : c;
        pageWidth = a < d ? d : a;
        -1 != navigator.userAgent.indexOf("Firefox") && (pageWidth -= 17);
        return{pageWidth: pageWidth, pageHeight: pageHeight, windowWidth: d, windowHeight: e}
    };
    b.setOverlay = function(a) {
        var c = b.getPageSize();
        document.getElementById(a).style.width = c.pageWidth + "px";
        document.getElementById(a).style.height = c.pageHeight + "px"
    };
    b.showpopupinterface = function(a, c) {
        b.setOverlay(c);
        document.getElementById(a).style.display = "block";
        document.getElementById(c).style.display = "block"
    };
    b.closepopupinterface =
            function(a, c) {
                document.getElementById(a).style.display = "none";
                document.getElementById(c).style.display = "none"
            };
    b.addCss = function(a, c) {
        for (var d in c)
            a.style[d] = c[d]
    };
    b.getPos = function(a) {
        for (var c = 0, d = 0; null != a; c += a.offsetLeft, d += a.offsetTop, a = a.offsetParent)
            ;
        return{x: c, y: d}
    };
    b.containsStringArray = function(a, c) {
        for (var d = 0; d < a.length; d++)
            if (-1 !== a[d].indexOf(c))
                return!0;
        return!1
    };
    b.addExternalCss = function(a, c) {
        c = c || document;
        var d = c.getElementsByTagName("head")[0], e = c.createElement("link");
        e.rel = "stylesheet";
        e.type = "text/css";
        e.media = "all";
        e.href = a;
        d.appendChild(e)
    };
    b.addEmbedCss = function(a, c) {
        c = c || document;
        var d = c.createElement("style");
        d.type = "text/css";
        d.styleSheet ? d.styleSheet.cssText = a : d.appendChild(document.createTextNode(a));
        c.getElementsByTagName("head")[0].appendChild(d)
    };
    b.addJs = function(a, c) {
        c = c || document;
        var d = c.getElementsByTagName("head")[0], e = c.createElement("script");
        e.src = a;
        e.type = "text/javascript";
        d.appendChild(e);
        return e
    };
    b.jsonpCall = function(a, c) {
        var d = "Loginradius" + Math.floor(1E18 *
                Math.random() + 1);
        window[d] = function(a) {
            c(a);
            window[d] = void 0;
            try {
                delete window[d]
            } catch (e) {
            }
            document.body.removeChild(k)
        };
        var e = -1 != a.indexOf("?") ? a + "&callback=" + d : a + "?callback=" + d, k = b.addJs(e)
    };
    b.getCornerCss = function(a, c, d, e) {
        var b = {};
        c ? b.right = c : b.left = a;
        e ? b.bottom = e : b.top = d;
        return b
    };
    b.arrayIndexOf = function(a, c, d) {
        d = d || 0;
        for (var b = a.length; d < b; ) {
            if (a[d] === c)
                return d;
            ++d
        }
        return-1
    };
    b.arrayRemove = function(a) {
        for (var c, d = arguments, e = d.length, f; e && a.length; )
            for (c = d[--e]; - 1 != (f = b.arrayIndexOf(a, c)); )
                a.splice(f,
                        1);
        return this
    };
    b.arrayContains = function(a, c, d) {
        for (var b = a.length; b--; )
            if (d) {
                if (a[b].toUpperCase() === c.toUpperCase())
                    return!0
            } else if (a[b] === c)
                return!0;
        return!1
    };
    b.objectToArray = function(a) {
        var c = [], d;
        for (d in a)
            a.hasOwnProperty(d) && c.push(a[d]);
        return c
    };
    b.hasClass = function(a, c) {
        return a.className.match(RegExp("(\\s|^)" + c + "(\\s|$)"))
    };
    b.addclass = function(a, c) {
        b.hasClass(a, c) || (a.className += " " + c)
    };
    b.removeclass = function(a, c) {
        b.hasClass(a, c) && (a.className = a.className.replace(RegExp("(\\s|^)" + c + "(\\s|$)"),
                " "))
    };
    b.contentiframe = function(a, c, d, e, f) {
        var g = document.createElement("iframe");
        g.id = "Loginradius" + Math.floor(1E18 * Math.random() + 1);
        g.frameBorder = "0";
        g.scrolling = "no";
        g.marginWidth = "0";
        g.marginHeight = "0";
        g.hspace = "0";
        g.vspace = "0";
        g.allowTransparency = "true";
        a.innerHTML = "";
        a.appendChild(g);
        window.setTimeout(function() {
            var a = g.contentDocument || g.contentWindow.document;
            "complete" == a.readyState && (a.body.innerHTML = c, b.addExternalCss(d, a), b.addEmbedCss("body {margin:0px; padding:0px;background:transparent;}",
                    a), b.addJs(e, a), f(g))
        }, 100);
        return g
    };
    b.crossdomainiframe = function(a) {
        var c = document.createElement("iframe");
        c.src = a;
        c.height = "0px";
        c.width = "0px";
        c.style.margin = "0px";
        c.style.padding = "0px";
        c.style.border = "0px";
        document.body.appendChild(c)
    };
    b.Slider = function(a, c, d, e, f) {
        var g = b.elementsByClass(c, a), l = b.elementsByClass(d, a)[0], m = b.elementsByClass(e, a)[0];
        j(g, l, m, f, 1);
        b.addEvent("click", l, function() {
            j(g, l, m, f, 1);
            return!1
        });
        b.addEvent("click", m, function() {
            j(g, l, m, f, -1);
            return!1
        })
    };
    b.isInt = function(a) {
        return"number" ===
                typeof a && parseFloat(a) == parseInt(a, 10) && !isNaN(a)
    }
})(LoginRadius_SocialLogin.util);
(function(b) {
    function j() {
        if (!d && (d = !0, e)) {
            for (var a = 0; a < e.length; a++)
                e[a].call(window, []);
            e = []
        }
    }
    function f() {
        if (!c) {
            c = !0;
            document.addEventListener && !a.opera && document.addEventListener("DOMContentLoaded", j, !1);
            a.msie && window == top && function() {
                if (!d) {
                    try {
                        document.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    j()
                }
            }();
            a.opera && document.addEventListener("DOMContentLoaded", function() {
                if (!d) {
                    for (var a = 0; a < document.styleSheets.length; a++)
                        if (document.styleSheets[a].disabled) {
                            setTimeout(arguments.callee,
                                    0);
                            return
                        }
                    j()
                }
            }, !1);
            if (a.safari) {
                var b;
                (function() {
                    if (!d)
                        if ("loaded" != document.readyState && "complete" != document.readyState)
                            setTimeout(arguments.callee, 0);
                        else {
                            if (void 0 === b) {
                                for (var a = document.getElementsByTagName("link"), c = 0; c < a.length; c++)
                                    "stylesheet" == a[c].getAttribute("rel") && b++;
                                a = document.getElementsByTagName("style");
                                b += a.length
                            }
                            document.styleSheets.length != b ? setTimeout(arguments.callee, 0) : j()
                        }
                })()
            }
            var e = j, f = window.onload;
            window.onload = "function" != typeof window.onload ? e : function() {
                f && f();
                e()
            }
        }
    }
    var h = navigator.userAgent.toLowerCase(), a = {version: (h.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], safari: /webkit/.test(h), opera: /opera/.test(h), msie: /msie/.test(h) && !/opera/.test(h), mozilla: /mozilla/.test(h) && !/(compatible|webkit)/.test(h)};
    b.browser = a;
    var c = !1, d = !1, e = [];
    b.ready = function(a) {
        f();
        d ? a.call(window, []) : e.push(function() {
            return a.call(window, [])
        })
    };
    f()
})(LoginRadius_SocialLogin.util);
LoginRadius_SocialLogin.coomontemplate = function(b, j, f, h, a) {
    return['<% if(Interface[i].Name.toLowerCase() == "persona") { %>', '<div><iframe src="' + ('<%= "//"+ $SL.appname +"."+$SL.domain+"/Control/PersonaInterface.aspx?apikey="+$SL.lr_login_settings.apikey+"&theme=' + b + '" %>&callback=<%=$SL.lr_login_settings.callback.toLowerCase()%><%=$SL.same_window%>') + '" height="' + j + '", width="' + f + '" scrolling="no" frameborder="0"></iframe></div>', "<% $SL.ispersona = true; } else {%>", '<div style="width:' + f + ";height:" +
                j + '"><span class="lr_providericons lr_<%=Interface[i].Name.toLowerCase() %>"  onclick="return $SL.util.openWindow(\'<%=Interface[i].Endpoint.toLowerCase()%>&callback=<%=$SL.lr_login_settings.callback.toLowerCase()%><%=$SL.same_window%>\')" rel="nofollow" title="Login with <%=Interface[i].Name %>" alt="Login with <%=Interface[i].Name %>" style="display:block;background-color: transparent;width:' + f + ";height:" + j + '">&nbsp;</span></div>', "<%}%>", '<% $SL.iconheight = "' + (+j.replace("px", "") + (h || 0)) + '"; %>',
        '<% $SL.iconwidth = "' + (+f.replace("px", "") + (a || 0)) + '"; %>'].join("\n")
};
//LoginRadius_SocialLogin.poweredby = '<p class="lr_powered_text"><iframe src="//<%=$SL.domain%>/poweredby.htm" frameborder="0" scrolling="no" allowtransparency="true" height="13" width="130" ></iframe></p>';
LoginRadius_SocialLogin.templates = {loginradius_social_single_glider_150: ['<div class="lr_singleglider_150 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(38,$SL.lr_login_settings.noofcolumns || 3,6,32) %>px"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="95%" border="0" cellspacing="0" cellpadding="0">\n<tr><td><div style="padding:0 2px 0 0px"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td style="padding-left:2px;">\n<% $SL.rows =1;  $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 3); %>\n<% var count=0;var index=1;%>\n<%for(var i=0;i<Interface.length;i++) { %>\n<% if(i % $SL.lr_login_settings.noofcolumns  == 0) {%></div> <div class="lr_icons_box slide"><%}%>', LoginRadius_SocialLogin.coomontemplate("loginradius-social-single-glider-150",
                "38px", "38px"), '<%}%>\n</td>\n<td><div style="padding:0 14px 0 0;"><a class="lr_providericons lr_arrow_next" ></a></div></td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>', "<%}%>\n</div>"].join("\n"), loginradius_social_single_glider_200: ['<div class="lr_singleglider_200 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(38,$SL.lr_login_settings.noofcolumns || 4,6,35) %>px"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="96%" border="0" cellspacing="0" cellpadding="0">\n<tr><td><div style="padding:0 6px 0 0;"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td>\n<% $SL.rows =1;  $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 4); %>\n<% var count=0;var index=1;%>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%  if(i % $SL.lr_login_settings.noofcolumns == 0) {%></div> <div class="lr_icons_box slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-single-glider-200", "38px", "38px", 0, 2), '<%}%>\n</td>\n<td><div style="padding:0 8px 0 0;"><a class="lr_providericons lr_arrow_next" ></a></div></td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>', "<%}%>\n</div>"].join("\n"), loginradius_social_embed_type_150: ['<div class="lr_embed_150 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(38,$SL.lr_login_settings.noofcolumns || 3,4,10) %>px"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="100%" border="0" cellspacing="0" cellpadding="0">\n<tr>\n<td>\n<% $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 3); %>\n<div class="lr_icons_box">\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % $SL.lr_login_settings.noofcolumns == 0 && i > 0) {%></div> <div class="lr_icons_box"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-embed-type-150", "38px", "38px"), "<%}%>\n</td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>", "<%}%>\n</div>"].join("\n"), loginradius_social_embed_type_200: ['<div class="lr_embed_200 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(38,$SL.lr_login_settings.noofcolumns || 4,4,10) %>px;"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="100%" border="0" cellspacing="0" cellpadding="0">\n<tr>\n<td>\n<% $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 4); %>\n<div class="lr_icons_box">\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % $SL.lr_login_settings.noofcolumns == 0 && i > 0) {%></div> <div class="lr_icons_box"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-embed-type-200", "38px", "38px"), "<%}%></div>\n</td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>", "<%}%>\n</div>"].join("\n"), loginraidus_social_double_glider_150: ['<div class="lr_doubleglider_150 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(38,$SL.lr_login_settings.noofcolumns || 3,4,32) %>px;"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="97%" border="0" cellspacing="0" cellpadding="0">\n<tr><td><div style="padding:0 4px 0 0px"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td>\n<%  $SL.rows =2; $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 3); %>\n<% var count=0;var index=1;%>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % ($SL.lr_login_settings.noofcolumns * 2) == 0 ) {%></div> <div class="lr_icons_box slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginraidus-social-double-glider-150", "38px", "38px"), '<%}%>\n</td>\n<td><div style="padding:0 14px 3px 0;"><a class="lr_providericons lr_arrow_next" ></a></div></td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>', "<%}%>\n</div>"].join("\n"), loginraidus_social_double_glider_200: ['<div class="lr_doubleglider_200 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(38,$SL.lr_login_settings.noofcolumns || 4,4,32) %>px;"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="100%" border="0" cellspacing="0" cellpadding="0">\n<tr><td><div style="padding:0 6px 0 3px;"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td>\n<% $SL.rows =2; $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 4); %>\n<% var count=0;var index=1;%>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % ($SL.lr_login_settings.noofcolumns * 2) == 0 ) {%></div> <div class="lr_icons_box slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginraidus-social-double-glider-200", "38px", "38px", 0, 1), '<%}%>\n</td>\n<td><div style="padding:0 10px 3px 0;"><a class="lr_providericons lr_arrow_next" ></a></div></td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>', "<%}%>\n</div>"].join("\n"), loginradius_social_login_theme_150: ['<div class="lr_social_login_basic_150 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(60,$SL.lr_login_settings.noofcolumns || 2,6,31) %>px;"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="95%" border="0" cellspacing="0" cellpadding="0">\n<tr><td><div style="padding: 0 4px 0 0px;"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td>\n<% $SL.rows =2;  $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 2); %>\n<% var count=0;var index=1;%>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % ($SL.lr_login_settings.noofcolumns * 2) == 0) {%></div> <div class="lr_icons_box slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-login-theme-150", "26px", "60px"), '<%}%>\n</td>\n<td><div style="padding: 0 11px 0 0;"><a class="lr_providericons lr_arrow_next" ></a></div></td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>', "<%}%>\n</div>"].join("\n"), loginradius_social_login_theme_200: ['<div class="lr_social_login_basic_200 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(80,$SL.lr_login_settings.noofcolumns || 2,6,32) %>px;"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="100%" border="0" cellspacing="0" cellpadding="0">\n<tr><td><div class="lr_arrow_prev_div"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td style="padding-left:3px;">\n<%  $SL.rows =2; $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 2); %>\n<% var count=0;var index=1;%>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % ($SL.lr_login_settings.noofcolumns * 2) == 0) {%></div> <div class="lr_icons_box slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-login-theme-200", "34px", "80px", 0, 4), '<%}%>\n</td>\n<td><div class="lr_arrow_next_div" ><a class="lr_providericons lr_arrow_next" ></a></div></td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>', "<%}%>\n</div>"].join("\n"), loginradius_social_popup_type_150: ['<div class="lr_social_popup_type_150 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(165,$SL.lr_login_settings.noofcolumns || 2,6,45) %>px;"><div class="lr_social_interface_box" id="lr_social_interface_continer">\n<a href="#" rel="popuprel" class="popup lr_providericons mainimg" onclick=$SL.util.showpopupinterface("popuprel","fade")></a></div>\n<div class="lr_social_interface_popupbox" id="popuprel">\n<div id="lr_provider_intabdiv"><h4><%=$SL.lr_login_settings.lrsocialloginheading %><a onclick=$SL.util.closepopupinterface("popuprel","fade") ><span class="lr_popup_close">X</span></a></h4>\n<table border="0" cellspacing="0" cellpadding="0" class="lr_maintable">\n<tr><td class="valign"><div class="lr_arrow_prev_div"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td>\n<% $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 2); %>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % ($SL.lr_login_settings.noofcolumns * 2)  == 0) {%></div> <div class="lr_interface_providers slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-popup-type-150", "50px", "165px"), '<%}%>\n</td>\n<td class="valign"><div class="arrow_next_div">\n<a class="lr_providericons lr_arrow_next" ></a> </div></td>\n</tr>\n</table>\n<%if(!$SL.WhiteLabel){%>', '<%}%>\n</div>\n</div></div><div id="fade" class="black_overlay" onclick=$SL.util.closepopupinterface("popuprel","fade");></div>'].join("\n"), loginradius_social_popup_type_200: ['<div class="lr_social_popup_type_200 lr_logininterface_container" style="background:<%=$SL.background %>;px;"><div class="lr_social_interface_box" id="lr_social_interface_continer">\n<a href="#" rel="popuprel" class="popup lr_providericons mainimg" onclick=$SL.util.showpopupinterface("popuprel","fade")></a></div>\n<div class="lr_social_interface_popupbox" id="popuprel" style="width:<%=$SL.util.getinterfacewidth(165,$SL.lr_login_settings.noofcolumns || 2,6,45) %>px;left:<%=($SL.util.getinterfacewidth(165,$SL.lr_login_settings.noofcolumns || 2,6,10))/2 %>px">\n<div id="lr_provider_intabdiv"><h4><%=$SL.lr_login_settings.lrsocialloginheading %><a onclick=$SL.util.closepopupinterface("popuprel","fade") ><span class="lr_popup_close">X</span></a></h4>\n<table border="0" cellspacing="0" cellpadding="0" class="lr_maintable">\n<tr><td class="valign"><div class="lr_arrow_prev_div"><a class="lr_providericons lr_arrow_prev" ></a></div></td>\n<td>\n<% $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 2); %>\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % ($SL.lr_login_settings.noofcolumns * 2) == 0) {%></div> <div class="lr_interface_providers slide"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-popup-type-200", "50px", "165px"), '\n<%}%>\n</td>\n<td class="valign"><div class="lr_arrow_next_div">\n<a class="lr_providericons lr_arrow_next" ></a> </div></td>\n</tr>\n</table>\n<%if(!$SL.WhiteLabel){%>', '<%}%>\n</div>\n</div></div><div id="fade" class="black_overlay" onclick=$SL.util.closepopupinterface("popuprel","fade");></div>'].join("\n"), loginradius_social_embed_bricks_150: ['<div class="lr_embed_bricks_150 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(135,$SL.lr_login_settings.noofcolumns || 1,4,10) %>px"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="100%" border="0" cellspacing="0" cellpadding="0">\n<tr>\n<td>\n<% $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 1); %>\n<div class="lr_icons_box">\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % $SL.lr_login_settings.noofcolumns  == 0 && i > 0) {%></div> <div class="lr_icons_box"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-embed-bricks-150", "30px", "135px"), "<%}%>\n</td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>", "<%}%>\n</div>"].join("\n"), loginradius_social_embed_bricks_200: ['<div class="lr_embed_bricks_200 lr_logininterface_container" style="background:<%=$SL.background %>;width:<%=$SL.util.getinterfacewidth(165,$SL.lr_login_settings.noofcolumns || 1,4,10) %>px;"><%=$SL.lr_login_settings.lrsocialloginheading %>\n<table id="lr_providers" width="100%" border="0" cellspacing="0" cellpadding="0">\n<tr>\n<td>\n<% $SL.lr_login_settings.noofcolumns = ($SL.lr_login_settings.noofcolumns || 1); %>\n<div class="lr_icons_box">\n<%for(var i=0;i<Interface.length;i++) { %>\n<%if(i % $SL.lr_login_settings.noofcolumns == 0 && i > 0) {%></div> <div class="lr_icons_box"><%}%>',
        LoginRadius_SocialLogin.coomontemplate("loginradius-social-embed-bricks-200", "30px", "165px", 0, 1), "<%}%></div>\n</td>\n</tr></table>\n<%if(!$SL.WhiteLabel){%>", "<%}%>\n</div>"].join("\n")};
LoginRadius_SocialLogin.init = function(b) {
    if (b.login) {
        LoginRadius_SocialLogin.console.log("LoginRadius - Initializing login interface.");
        LoginRadius_SocialLogin.console.log("LoginRadius - Loading API settings.");
        $SL.domain = "hub.loginradius.com";
        $SL.cdndomain = "hub.loginradius.com";
        $SL.Providers = [];
        $SL.iconsize = "";
        $SL.interfacetheme = "";
        $SL.userinterface = "";
        $SL.noofrow = "";
        $SL.noofcolumes = "";
        $SL.IsPaid = !1;
        $SL.WhiteLabel = !1;
        $SL.Isslide = !1;
        $SL.same_window = 0;
        $SL.appname = "";
        $SL.background = "";
        $SL.ispersona =
                !1;
        $SL.isiframe = !1;
        $SL.csspath = $SL.cdndomain.split(".", 2)[0];
        var j = function(b, h, a, c, d, e, k) {
            "" != $SL.lr_login_settings.lrsocialloginheading && (a += 28);
            var g = {};
            g.height = (b + 4) * Math.ceil(d) + a + (k ? 0 : 15);
            g.width = (h + 3) * c + e;
            return g
        };
        $SL.util.jsonpCall("//" + $SL.domain + "/getappsettings/" + $SL.lr_login_settings.apikey, function(b) {
            if (b.errorcode)
                for (var h = $SL.util.elementsByClass($SL.lr_login_settings.lrinterfacecontainer), a = 0; a < h.length; a++)
                    h[a].innerHTML = "<b style='color:red;'>" + b.errormessage + ".</b>";
            else {
                if (!$SL.util.isInt($SL.lr_login_settings.noofcolumns) ||
                        2 > $SL.lr_login_settings.noofcolumns)
                    $SL.lr_login_settings.noofcolumns = "";
                $SL.Providers = b.Providers;
                $SL.size = b.IconSize;
                $SL.iconsize = b.IconSize;
                $SL.userinterface = "small" == $ui.interfacesize ? b.Interface + "-150" : b.Interface + "-200";
                $SL.WhiteLabel = b.WhiteLabel;
                $SL.IsPaid = b.IsPaid;
                $SL.IsHttps = b.IsHttps;
                $SL.appname = b.SubDomain;
                $SL.Isslide = b.IsSlide;
                $SL.isiframe = b.IsIframe;
                "" != $SL.lr_login_settings.lrsocialloginheading && ($SL.lr_login_settings.lrsocialloginheading = "<h3>" + $SL.lr_login_settings.lrsocialloginheading +
                        "</h3>");
                $SL.lr_login_settings.lrsocialloginheading = $SL.lr_login_settings.lrsocialloginheading;
                $SL.background = $SL.lr_login_settings.lrinterfacebackground || "transparent";
                $SL.same_window = 1 === $SL.lr_login_settings.samewindow ? "&same_window=1" : "";
                $SL.noofrow = 1;
                LoginRadius_SocialLogin.console.log("LoginRadius - API settings success.");
                if (b.IsPaid) {
                    $SL.interfacetheme = $SL.interfacetheme || "loginraidus-social-double-glider-200";
                    h = "//" + $SL.domain + "/cdn/Include/logintheme_" + $SL.csspath + "/" + $SL.userinterface +
                            "/css/style.css";
                    a = "//" + $SL.domain + "/cdn/Include/js/LoginRadius.comm.js";
                    $SL.console.log("LoginRadius - Initializing CSS.");
                    $SL.console.log("LoginRadius - CSS load successful.");
                    $SL.Interface = {};
                    b = $SL.util.elementsByClass($SL.lr_login_settings.lrinterfacecontainer);
                    $SL.console.log("LoginRadius - Initializing login interface template.");
                    var c = $SL.util.tmpl($SL.templates[$SL.userinterface.replace(/\-/g, "_")], {Interface: $SL.Providers});
                    $SL.console.log("LoginRadius - Interface template load successful.");
                    if ($SL.isiframe)
                        for (var d = 0; d < b.length; d++)
                            $SL.util.contentiframe(b[d], c, h, a, function(a) {
                                var b = a.contentDocument || a.contentWindow.document;
                                $SL.Isslide ? ($SL.util.Slider(b.body, "slide", "lr_arrow_next", "lr_arrow_prev", $SL.noofrow), b = j(+$SL.iconheight, +$SL.iconwidth.replace("px", ""), 0, $SL.lr_login_settings.noofcolumns, $SL.rows, 22, $SL.WhiteLabel)) : b = j(+$SL.iconheight, +$SL.iconwidth.replace("px", ""), 0, $SL.lr_login_settings.noofcolumns, $SL.Providers.length / $SL.lr_login_settings.noofcolumns, 0, $SL.WhiteLabel);
                                a.height = b.height;
                                a.width = b.width;
                                $SL.util.addCss(a, {"max-width": b.width + "px"})
                            });
                    else {
                        $SL.util.addExternalCss(h);
                        for (d = 0; d < b.length; d++)
                            b[d].innerHTML = c, $SL.Isslide && $SL.util.Slider(b[d], "slide", "lr_arrow_next", "lr_arrow_prev", $SL.noofrow)
                    }
                } else {
                    h = $SL.util.elementsByClass($SL.lr_login_settings.lrinterfacecontainer);
                    b = [];
                    for (a = 0; a < $SL.Providers.length; a++)
                        b.push($SL.Providers[a].Name);
                    for (a = 0; a < h.length; a++)
                        h[a].innerHTML = "small" == $ui.interfacesize ? '<iframe frameborder="0" scrolling="no" allowtransparency="true" width="150" height="80" src="http://' +
                                $SL.appname + "." + $SL.domain + "/Control/basicinterface.htm?providers=" + b.join(",") + "&apikey=" + $SL.lr_login_settings.apikey + "&callback=" + $SL.lr_login_settings.callback + "&" + $SL.same_window + '&size=150">' : '<iframe frameborder="0" scrolling="no" allowtransparency="true" width="200" height="100"  src="http://' + $SL.appname + "." + $SL.domain + "/Control/basicinterface.htm?providers=" + b.join(",") + "&apikey=" + $SL.lr_login_settings.apikey + "&callback=" + $SL.lr_login_settings.callback + "&" + $SL.same_window + '&size=200">'
                }
            }
        })
    }
};