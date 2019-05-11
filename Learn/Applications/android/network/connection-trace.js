/*
Archive of Reversing.ID 
Frida Compendium - Android Application

Hook to some network connection related class and trace the URL
*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var UrlClass                = Java.use("java.net.URL");
        var UrlConnectionClass      = Java.use("java.net.URLConnection");


        // --- URL class
        // Initiate URL class (constructor)
		UrlClass.$init.overload('java.lang.String').implementation = function (url) {
			console.log("[*] Created new URL with value: " + url +"\n");
			return this.$init(url);
		};

        // Open connection and return URLConnection
		UrlClass.openConnection.overload().implementation = function () {
			console.log("[*] Created new URL connection\n");
			return this.openConnection();
		};

		UrlClass.openConnection.overload('java.net.Proxy').implementation = function (proxy) {
			console.log("[*] Created new URL connection with proxy value: " + proxy +"\n");
			return this.openConnection(proxy);
		};
    });
}, 0);