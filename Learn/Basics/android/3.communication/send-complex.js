/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Send a structured javascript object. 

Target: count.exe
*/
'use strict';


setTimeout(function() {
    Java.perform(function() {
        var OperationClass = Java.use("id.reversing.classop.Operation");
        OperationClass.ProcessOne.implementation = function(s) {
            
            send({
                user: {
                    name: "Xathrya.ReversingID",
                    key: 1234
                },
                arg: s
            });
                
            return this.ProcessOne(s);
        };
    });
});