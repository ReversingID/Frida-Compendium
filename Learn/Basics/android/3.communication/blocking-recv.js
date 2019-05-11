/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Send and receive data to and from instrumented process.

Target: id.reversing.classop
*/
'use strict';

setTimeout(function() {
    Java.perform(function() {
        var OperationClass = Java.use("id.reversing.classop.Operation");
        OperationClass.ProcessOne.implementation = function(s) {
            send(s);

            /* 
            Dispatching receive and will use a callback as handle.
            The callback will change the argument.
            See that the process is synchronous that the value change is synchronized
            with the message received from host.
            */ 
            var op = recv("input", function(value) {
                s = value.payload;
            });

            // Wait until the message is received (blocking)
            op.wait();
            
            return this.ProcessOne(s);
        };
    });
});