/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Send and receive data to and from instrumented process.

Target: count.exe
*/
'use strict';

var addr = ptr("%s");
Interceptor.attach(addr, {
    onEnter: function(args) {
        send(args[0].toInt32());

        /* 
        Dispatching receive and will use a callback as handle.
        The callback will change the argument.
        See that the process is synchronous that the value change is synchronized
        with the message received from host.
        */ 
        var op = recv("input", function(value) {
            args[0] = ptr(value.payload);
        });

        // Wait until the message is received (blocking)
        op.wait();
    }
});