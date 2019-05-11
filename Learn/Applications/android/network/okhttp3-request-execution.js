/*
Archive of Reversing.ID 
Frida Compendium - Android Application

OkHttp3 support both synchronized and asynchronized API.
Hook the implementation of both to find out which one our app use.

*/
'use strict';


setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var RealCallClass = Java.use("okhttp3.RealCall");
        
        RealCallClass.execute.implementation = function() {
            console.log("okhttp3.RealCall.execute called");
            return this.execute();
        };
        
        RealCallClass.enqueue.overload("okhttp3.Callback").implementation = function(callback) {
            console.log("okhttp3.RealCall.enqueue called");
            return this.enqueue(callback);
        };

    });
}, 0);