/*
Archive of Reversing.ID 
Frida Compendium - Android Application

Check the URL loaded by WebView
*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var WebViewClass = Java.use("android.webkit.WebView");

        WebViewClass.loadUrl.overload("java.lang.String").implementation = function (s) {
            console.log("open - " + s.toString());
            this.loadUrl.overload("java.lang.String").call(this, s);
        };
    });
}, 0);