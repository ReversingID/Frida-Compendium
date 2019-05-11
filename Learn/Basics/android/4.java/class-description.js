/*
Archive of Reversing.ID 
Frida Compendium - Android Basic

Get the class methods and members.

*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var classname   = "id.reversing.classop.Operation";
        var TargetClass = Java.use(classname);


        console.log("********   Using JS Prototype and Property   ********");
        var members = TargetClass.__proto__;
        var properties = Object.getOwnPropertyNames(members);

        console.log("Class: " + classname);
        console.log("Methods and Fields: ");
        for (var i  in properties)
        {
            console.log("   > " + properties[i]);
        }

        console.log("\n\n");


        console.log("********   Using Java Class Declaration   ********");
        var methods = TargetClass.class.getDeclaredMethods();
        
        console.log("Class: " + classname);
        console.log("Methods: ");
        for (var i in methods)
        {
            console.log("   > " + methods[i]);
        }
        console.log("\n");

        var fields = TargetClass.class.getDeclaredField();
        console.log("Field: ");
        for (var i in fields)
        {
            console.log("   > " + fields[i]);
        }
    });
},0);