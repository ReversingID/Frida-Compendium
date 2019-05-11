/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Hooking a function using Interceptor.
Inspect the argument of invoked function.

Target: count.exe
*/
'use strict';

var addr = ptr("%s");
Interceptor.attach(addr, {
    // Sniff arguments
    onEnter: function(args) {
        console.log("Args[0]: " + args[0]);
    },

    // Sniff return value
    onLeave: function(retval) {
        console.log("RetVal: " + retval);
    }
});