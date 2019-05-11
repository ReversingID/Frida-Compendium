/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Hooking class constructor

Target: id.reversing.classop
*/
'use strict';

var target = "id.reversing.classop.Operation";

setTimeout(function() {
    Java.perform(function() {

        var TargetClass = Java.use(target);

        // If the constructor is overloaded, then adjust it.
        TargetClass.$init.implementation = function() {
            console.log(target, "::Constructor() load");
            return this.$init();
        }
    });
});