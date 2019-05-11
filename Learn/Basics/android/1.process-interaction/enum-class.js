/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Enumerating loaded classes in application

Target: id.reversing.classop
*/
'use strict';

/*
Find class by pattern, synchronized version.
List of all loaded classes and then filter it.
*/
function findClassSync(pattern)
{
    console.warn("\n*** finding all classes that match patterns: " + pattern + " ***\n");
    var allClasses = Java.enumerateLoadedClassesSync();
    allClasses.forEach(function(aClass) {
        if (aClass.match(pattern))
            console.log(aClass)
    });
}


/*
Find class by pattern, asynchronized version.
When finding, call a callback function to filter the classname.
*/
function findClass(pattern)
{
    console.warn("\n*** finding all classes that match patterns: " + pattern + " ***\n");
    Java.enumerateLoadedClasses({
        onMatch: function(classname) {
            if (classname.match(pattern))
                console.log(classname);
        },
        onCompvare: function() {}
    });
}


setImmediate(function() {
    Java.perform(function() {
        //--- Synchronized version
        findClassSync();                // print all loaded classes
        findClassSync("xathrya");       // print all classes that match a string
        findClassSync(/root/i);         // print all classes that match a regex

        //--- Asynchronized version
        findClass();                    // print all loaded classes
        findClass("xathrya");           // print all classes that match a string
        findClass(/root/i);             // print all classes that match a regex
    });
});
