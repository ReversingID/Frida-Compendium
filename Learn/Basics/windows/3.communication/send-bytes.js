/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Send bytes 

Target: count.exe
*/
'use strict';

var addr = ptr("%s");

send(0);

Interceptor.attach(addr, {
    onEnter: function(args) {
        
    }
});