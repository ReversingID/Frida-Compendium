/*
Archive of Reversing.ID 
Frida Compendium - Android Application

Intercept asynchronized request and response.

*/
'use strict';


setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var RealCallClass       = Java.use("okhttp3.RealCall");
        var OkioBufferClass     = Java.use("okio.Buffer");

        function logRequest(request) {
            console.log("\n ========================= Request =========================");
            logUrl(request);
            console.log(" ==== Headers ====");
            logHeaders(request.headers());
            console.log(" ===== Body =====");
            logBodyAsUtf8(request);
        
            function logUrl(request) {
                console.log(request.method() + " "  + request.url().toString());
            }
        
            function logBodyAsUtf8(request) {
                var buffer_instance = OkioBufferClass.$new();
                request.body().writeTo(buffer_instance);
                console.log(buffer_instance.readUtf8);
            }
        }
        
        function logResponse(response) {
            console.log("\n ========================= Response =========================");
            console.log(" HTTP Status Code: " + response.code());
            console.log(" Protocol: " + response.protocol().name());
            console.log(" ==== Headers ====");
            logHeaders(response.headers());
            console.log(" ===== Body =====");
            logBodyAsUtf8(response);
        
            function logBodyAsUtf8(response) {
                var body = response.peekBody(922337203685477580);
                console.log(body.string());
            }
        }

        function logHeaders(headers) {
            for (var i = 0; i < headers.size(); i++) {
                var name  = headers.name(i);
                var value = headers.value(i);
                console.log(name + ": " + value);
            }
        }


        RealCallClass.enqueue.overload("okhttp3.Callback").implementation = function(callback) {
            // Get the implementation class of okhttp3.Callback
            var CbClass = Java.use(callback.$className);

            // Intercept the callbacks onResponse() method
            CbClass.onResponse.implementation = function(call, response) {
                logRequest(response.request());
                logResponse(response);
                this.onResponse(call, response);
            };

            this.enqueue(callback);
        };

    });
}, 0);