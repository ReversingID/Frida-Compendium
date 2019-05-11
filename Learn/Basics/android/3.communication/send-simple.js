/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Send simple data from instrumented process.

Target: id.reversing.classop
*/
'use strict';

/*
send() can be called in any scope, global or inside function.
*/

send(0);

setTimeout(function() {
    Java.perform(function() {
        var OperationClass = Java.use("id.reversing.classop.Operation");
        OperationClass.ProcessOne.implementation = function(s) {
            send(s);
            
            return this.ProcessOne(s);
        };
    });
});