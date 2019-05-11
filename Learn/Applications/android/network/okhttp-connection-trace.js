/*
Archive of Reversing.ID 
Frida Compendium - Android Application

Hook to some network connection related class and trace the URL
*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var HttpUrlConnectionClass  = Java.use("com.android.okhttp.internal.huc.HttpURLConnectionImpl");
        var HttpsUrlConnectionClass = Java.use("com.android.okhttp.internal.huc.HttpsURLConnectionImpl");
        
        // --- HTTP URL Connection class
        HttpUrlConnectionClass.setRequestMethod.overload('java.lang.String').implementation = function (var0) {
            console.log("[*] Set request method called: " + var0 + "\n");
            this.setRequestMethod(var0);
        };

        HttpUrlConnectionClass.setRequestMethod.overload('java.lang.String').implementation = function (var0) {
            console.log("[*] Set request method called: " + var0 + "\n");
            this.setRequestMethod(var0);
        };    

        HttpUrlConnectionClass.connect.implementation = function () {
            console.log("[*] Connect called.\n");
            this.connect();
        };

        HttpUrlConnectionClass.disconnect.implementation = function () {
            console.log("[*] Disconnect called.\n");
            this.disconnect();
        };

        HttpUrlConnectionClass.getResponseCode.implementation = function () {
            var responseCode  = this.getResponseCode();
            console.log("[*] Get response code called: " + responseCode + "\n");
            return responseCode;
        };


        // --- HTTPS URL Connection class
        HttpsUrlConnectionClass.setRequestMethod.overload('java.lang.String').implementation = function (var0) {
            console.log("[*] Set request method called: " + var0 + "\n");
            this.setRequestMethod(var0);
        };

        HttpsUrlConnectionClass.connect.implementation = function () {
            console.log("[*] Connect called.\n");
            this.connect();
        };

        HttpsUrlConnectionClass.disconnect.implementation = function () {
            console.log("[*] Disconnect called.\n");
            this.disconnect();
        };

        HttpsUrlConnectionClass.getResponseCode.implementation = function () {
            var responseCode  = this.getResponseCode();
            console.log("[*] Get response code called: " + responseCode + "\n");
            return responseCode;
        };

        HttpsUrlConnectionClass.setRequestProperty.overload('java.lang.String', 'java.lang.String').implementation = function (var0, var1) {
            console.log("[*] URLConnection.setRequestProperty called with key: " + var0 + " and value: " + var1 + ".\n");
            this.setRequestProperty(var0, var1);
        };

    });
}, 0);