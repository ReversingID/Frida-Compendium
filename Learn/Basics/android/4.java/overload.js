/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Hooking overloaded methods and call them.

Target: id.reversing.classop
*/

'use strict';

Java.perform(function() {

    var OperationClass = Java.use("id.reversing.classop.Operation");

    /*
    Instead of hooking each of overloaded methods, we can iterate over them
    and create general hooking routine that can sniff the arguments.
    */
    console.log("Hooking: " + OperationClass.overloadFunc.overloads.length + " methods");
    OperationClass.overloadFunc.overloads.forEach(function(m) {
        m.implementation = function() {
            console.log("Called with arguments: ");

            // `arguments` store all of the argument passed to the function
            // Iterate all arguments and check the value.
            for (var i in arguments) {
                console.log("   > " + arguments[i].toString());
            }

            return m.apply(this, arguments);
        }
    });

});