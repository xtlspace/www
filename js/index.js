$(function () {
    $(".downloadbtns").hover(function () {
        downloadhover(this, 1);
    }, function () {
        downloadhover(this, 2);
    });
    $(".android").hover(function () {
        $(".qrcode,.arrow").show();
    }, function () {
        $(".qrcode,.arrow").hide();
    });
    share();
});

function share() {
    var account = getQueryVariable("share");
    if (!account) {
        return;
    }
    var protocolStr = document.location.protocol
    $.ajax({
        type: "POST",
        url: protocolStr + "//api.urlgocenter.xyz/share/add_share",
        data: {"str": account},
        dataType: "json"
    });

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

function downloadhover(that, type) {
    var img = $(that).find(".container4img img");
    var android = $(that).find(".android");
    if (type == 1) {
        var src = img.attr("hoversrc");
        img.attr("src", src);
        $(that).css("background-color", "#3E7BFA");
        if (android != undefined && android.length != 0) {
            $(that).find(".container4img").addClass("androidcontainer4img");
        }
        $(that).find(".container4line1,.container4line2").hide();
        $(that).find(".container4line3").show();
        return;
    }
    if (android != undefined && android.length != 0) {
        $(that).find(".container4img").removeClass("androidcontainer4img");
    }
    var src = img.attr("defultsrc");
    img.attr("src", src);
    $(that).css("background-color", "#fff");
    $(that).find(".container4line1,.container4line2").show();
    $(that).find(".container4line3").hide();
}

var device = "all"
$(function () {
    if (isAndroid()) {
        device = "android";

    }
    if (isIos()) {
        device = "ios";
    }
    //DownloadAjax();
});

function DownloadBotton(that) {
    /*
    var url = $(that).attr("href");
    if (url == "" || url == undefined) {
        var url = location.href;
        if (url.indexOf("#")) {
            url = url.split("#")[0];
        }
        location.href = url + "#dbtns";
        return;
    }
    */
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        $(".backgroundblack").show();
        return false;
    } else {
        
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //console.log('isIOS');
          location.href = "ios.html";
            return;
        } else if (/(Android)/i.test(navigator.userAgent)) {
            
            var url = "/download/Tube3.2.1_wc.apk";
            var account = getQueryVariable("share");
            if (account) {
                url = "/download/Tube3.2.1_sc.apk";
            }
                    
            
            //var form = document.createElement('form');
            //document.getElementsByTagName('body')[0].appendChild(form);
            //form.submit();
            location.href = url;
            return;
        } else {
            var url = $(that).attr("href");
            if (url == "" || url == undefined) {
                var url = location.href;
                if (url.indexOf("#")) {
                    url = url.split("#")[0];
                }
                location.href = url + "#dbtns";
                return;
            }
        }
                
        
        //gtag_report_conversion(url);
        //window.open(url);
        //location.href = url;   
        
    }
}

function DownloadAjax() {
    if (device != "all") {
        $(".downbtn button").attr("id", device);
    }
    var protocolStr = document.location.protocol
    $.ajax({
        type: "POST",
        url: protocolStr + "//apia.tubevpn666.com/version/findVersionAll",
        data: {"platform": device},
        dataType: "json",
        success: function (result) {
            data = result.data;
            var value = "版下载";
            var o = data[0];
            if (result.code != 200 || data == null || data[0] == null) {
                value = "版 即将出炉"
                o = {};
                o["downloadlink"] = "#";
            }
            if (device != "all") {
                switch (device) {
                    case "android":
                        value = "Android" + value;
                        break;
                    case "ios":
                        value = "IOS" + value;
                        break;
                    case "windows":
                        value = "Windows" + value;
                        break;
                }
                var id = $("#" + device);
                id.attr("href", o.downloadlink);
                id.html(value);
                
               // $("#" + device).click(function(){
               //     gtag_report_conversion(o.downloadlink);
              //  });
                
                return;
            }
            $.each(data, function (i, o) {
                var id = $("#" + o.platform);
                id.attr("href", o.downloadlink);
                
               // $("#" + o.platform).click(function(){
                //    gtag_report_conversion(o.downloadlink);
                //});
                
            });
        }
    });
}

function isAndroid() {
    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        return true;
    }
    return false;
}

// 判断设备为 ios
function isIos() {
    var u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
    }
    return false;
}