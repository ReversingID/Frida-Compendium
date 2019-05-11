/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Find Java class/object, use, and instantiate it.

Target: id.reversing.app
*/

'use strict';

setImmediate(function() {

    Java.perform(function() {

        // --- Search class and instantiate it
        // Declare classes that are going to be used
        var DummyClass = Java.use("id.reversing.app.DummyClass");

        // Instantiate object from the class 
        var foo = DummyClass.$new();        // Constructor with no arguments
        var bar = DummyClass.$new(0);       // Constructor with arguments

        
        // --- Search existing class instance (on heap)
        Java.choose("id.reversing.app.DummyClass", {
            onMatch: function(instance) {
                console.log("[!] Found DummyClass instance! " + instance);
            },
            onComplete: function() { }
        })

    });
});
