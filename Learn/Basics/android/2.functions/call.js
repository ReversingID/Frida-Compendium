/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Call a function with user-defined argument.

Target: id.reversing.classop
*/
'use strict';

setTimeout(function() {
    console.log("[*] Starting script");

    Java.perform(function() {

        var OperationClass = Java.use("id.reversing.classop.Operation");
        var JString = Java.use("java.lang.String");

        var revid = JString.$new("Reversing.ID");

        // Call static function with no argument
        console.log("magic: " + OperationClass.magic());


        // Call static function with 2 arguments
        console.log("multiArgs: " + OperationClass.multiArgs(135,182));


        // Call static function with String argument
        console.log("ProcessOne: " + OperationClass.ProcessOne(revid));


        // Call function with instance
        // Alternative 1: Instantiate object and then call the function
        var operation = OperationClass.$new();
        console.log("ProcessTwo (1): " + operation.ProcessTwo(revid));

        // Alternative 2: Search for existing instance and then call the function
        Java.choose("id.reversing.classop.Operation", {
            onMatch: function(instance) {
                console.log("ProcessTwo (2): " + instance.ProcessTwo.call(instance, revid));
            },
            onComplete: function() { }
        });
    });
}, 1);
