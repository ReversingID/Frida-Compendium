/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Hooking methods.
Call a function with a user-defined argument.
The argument is a string that is allocated manually before passing.

Target: id.reversing.classop
*/

'use strict';

setTimeout(function() {
    console.log("[*] Starting script");

    Java.perform(function() {
        var Operation = Java.use("id.reversing.classop.Operation");
        var StrClass  = Java.use("java.lang.String");
        
        // Modify String (argument)
        Operation.ProcessOne.implementation = function(s) {
            console.log(">> The input is: " + s);

            // Create string instance
            var arg0    = StrClass.$new("Reversing.ID");

            // Pass the instance
            return this.ProcessOne(arg0);
        };

        // Modify String (return value)
        Operation.ProcessTwo.implementation = function(s) {
            var result = this.ProcessTwo(s);
            console.log(">> The output is: " + result);
            
            // Return a new instance of String
            return StrClass.$new("Reversing.ID");
        }
    });
}, 1);
