/*
Archive of Reversing.ID 
Frida Compendium - Android Application

Using Android Log to print stack trace.

*/
'use strict';


setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var LogClass = Java.use("android.util.Log");
        var ExceptionClass = Java.use("java.lang.Exception");

        console.log(LogClass.getStackTraceString(ExceptionClass.$new()));
    });
}, 0);