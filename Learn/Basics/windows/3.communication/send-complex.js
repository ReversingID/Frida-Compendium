/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Send a structured javascript object. 

Target: count.exe
*/
'use strict';

var addr = ptr("%s");

// send() can be called without any scope, but this time we call it inside
// intercepted function call.
Interceptor.attach(addr, {
    onEnter: function(args) {
        send({
            user: {
                name: "Xathrya.ReversingID",
                key: 1234
            },
            arg: args[0].toInt32()
        });
    }
});