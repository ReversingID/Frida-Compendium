/*
Archive of Reversing.ID
Frida Compendium - Android Application

Hook Reflection methods to sniff information.

*/

'use strict';

setTimeout(function() {
    Java.perform(function() {

        // Reflections 
        var MethodClass = Java.use("java.lang.reflect.Method");

        // Monitoring method invocation
        MethodClass.invoke.overload("java.lang.Object", "[Ljava.lang.Object;", "boolean").implementation = function(a, b, c) {
            console.log("Method invocation!", a, b, c);
            return this.invoke(a, b, c);
        };
    });
});