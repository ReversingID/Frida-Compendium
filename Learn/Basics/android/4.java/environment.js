/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Java Environment

Target: id.reversing.classop
*/

'use strict';

Java.perform(function() {

    // Getting Java environment
    var env = Java.vm.getEnv();

    // Get list of methods
    var members = env.__proto__;
    var properties = Object.getOwnPropertyNames(members);

    for (var i in properties) {
        console.log("   > " + i + " | " + properties[i]);
    }


});