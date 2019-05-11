/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Call a function with user-defined argument.
The argument is a string that is allocated manually before passing.

Target: hi.exe
*/
'use strict';

var addr = ptr("%s");

//-- Invoking function directly
var strbuff = Memory.allocUtf8String("XATHRYA invoking!");
var f  = new NativeFunction(addr, 'int', ['pointer']);
f(strbuff);

//-- Modify string argument
var strbuff2 = Memory.allocUtf8String("Reversing.ID");
Interceptor.attach(addr, {
    onEnter: function(args) {
        // argument is a pointer (char*) so we just point it to elsewhere
        args[0] = strbuff2;
    }
});