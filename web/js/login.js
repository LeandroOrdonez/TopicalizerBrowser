var options = {};
options.login = true;
LoginRadius_SocialLogin.util.ready(function() {
    $ui = LoginRadius_SocialLogin.lr_login_settings;
    $ui.interfacesize = "";
    $ui.apikey = "fbbb5623-ab4c-4fc2-9d18-dee0204b151c";
    $ui.callback = "";
    $ui.lrinterfacecontainer = "interfacecontainerdiv";
    LoginRadius_SocialLogin.init(options);
});

var userID;
LoginRadiusSDK.onlogin = Successfullylogin;
function Successfullylogin() {
    console.log("Successfullylogin...");
    LoginRadiusSDK.getUserprofile(function(data) {
        console.log(data);
        console.log("Data provider: " + data.Provider);
        console.log("Data First Name: " + data.FirstName);
        console.log("Data ID: " + data.ID);
        userID = data.ID;
        
        
        var userProfile = JSON.stringify(data);
        sessionStorage.setItem("userProfile", userProfile);
        
        var jqxhr = $.post("user", {"userID": data.ID, "userProfile": userProfile}, function() {
            console.log("success");
            window.location.href = "/TopicalizerBrowser/browser.xhtml";
        })
                .done(function() {
            console.log("second success");
        })
                .fail(function() {
            console.log("error");
        })
                .always(function() {
            console.log("finished");
        });
//        alert("Welcome " + data.FirstName + "!");

//        document.getElementById('user-profile').value = JSON.stringify(data);
//        document.getElementById('provider').value = (data.Provider);
//        document.getElementById('buttonId').click();
//
//        document.getElementById("userID").innerHTML = data.ID;
//        $("#userID").slideDown("slow");
    });

    return false;
};
