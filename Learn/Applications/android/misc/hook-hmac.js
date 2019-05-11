/*
Archive of Reversing.ID
Frida Compendium - Android

Hook HMAC function and print out the params

Target: <any>
*/
'use strict';

Interceptor.attach(Module.findExportByName("liba.so", "HMAC"), {
    onEnter: function(args) {
        var key_size = args[2].toInt32();
        var key_dump = Memory.readByteArray(args[1], key_size);

        // Print the param
        console.log("HMAC key found at: " + args[1]);
        console.log("HMAC key size: " + key_size);
        console.log(hexdump(key_dump, {
            offset: 0,
            length: key_size,
            header: false,
            ansi: false
        }));
    },
    onLeave: function(retval) { }
});