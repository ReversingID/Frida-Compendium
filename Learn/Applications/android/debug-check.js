setTimeout(function(){
    Java.perform(function () {
        var OSDebug = Java.use("android.os.Debug");
        OSDebug.isDebuggerConnected.implementation = function () {
            send("[+] isDebuggerConnected() is called");
            return false;
        };
    });
},0);