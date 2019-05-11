/*
Archive of Reversing.ID 
Frida Compendium - Android Application

Disable Conscrypt certificate pinning.

*/
'use strict';


setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var OSSLSocketImplClass = Java.use("com.android.org.conscrypt.OpenSSLSocketImpl");
        
        OSSLSocketImplClass.verifyCertificateChain.implementation = function(certs, auth_method) {
            console.log("[verifyCertificateChain() hooked");

            // do nothing
        };
    });
}, 0);