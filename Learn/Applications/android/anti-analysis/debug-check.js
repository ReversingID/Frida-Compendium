/*
Archive of Reversing.ID 
Frida Compendium - Application

Bypass the Debugger checking.
Make android.os.Debug.isDebuggerConnected() always return false.

*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var OSDebugClass = Java.use("android.os.Debug");
        OSDebugClass.isDebuggerConnected.implementation = function () {
            send("[+] isDebuggerConnected() is called");
            return false;
        };
    });
},0);