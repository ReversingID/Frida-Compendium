/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Hooking methods.
Inspect the argument of invoked function.

Target: id.reversing.classop
*/

'use strict';

setImmediate(function() {
    console.log("[*] Starting script");

    Java.perform(function() {

        // --- Hooking function definition and then sniff the arguments / return value
        var OperationClass = Java.use("id.reversing.classop.Operation");
        
        // Hooking static function
        OperationClass.ProcessOne.implementation = function(s) {
            // Sniff arguments
            console.log(">> The input is: " + s);

            // Sniff return value
            var retval = this.ProcessOne(s);
            console.log(">> The output is: " + retval);
            return retval;
        };
    
        // Hooking non static function
        OperationClass.ProcessTwo.implementation = function(s) {
            // Sniff arguments
            console.log(">> The input is: " + s);

            // Sniff the value of class' field / variable
            console.log("Hidden is: " + this.hidden.value);

            // Sniff return value
            var retval = this.ProcessTwo(s);
            console.log(">> The output is: " + retval);
            return retval;
        }


        // --- Search for existing object and hook before able to sniff the arguments / return value

    });
});
