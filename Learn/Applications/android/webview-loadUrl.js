setTimeout(function(){
    Java.perform(function () {
        var WebViewClass = Java.use("android.webkit.WebView");
        WebViewClass.loadUrl.overload("java.lang.String").implementation = function (s) {
            send("open - " + s.toString());
            this.loadUrl.overload("java.lang.String").call(this, s);
        };
    });
}, 0);