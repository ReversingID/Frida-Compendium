/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Send simple data from instrumented process.

Target: count.exe
*/
'use strict';

var addr = ptr("%s");

/*
send() can be called in any scope, global or inside function.
*/

send(0);

Interceptor.attach(addr, {
    onEnter: function(args) {
        // Send first argument, which is an integer. Need to cast it.
        send(args[0].toInt32());
    }
});