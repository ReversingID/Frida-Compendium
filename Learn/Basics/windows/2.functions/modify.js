/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Hooking a function using Interceptor.
Call a function with a user-defined argument.
The argument is a string that is allocated manually before passing.

Target: count.exe
*/
'use strict';

var addr = ptr("%s");
Interceptor.attach(addr, {
    // Modify the argument
    onEnter: function(args) {
        args[0] = ptr("1337");
    },

    // Modify the return value
    onLeave: function(retval) {
        retval = ptr("7331");
    }
});