'use strict';

function findClassSync(pattern)
{
    console.warn("\n*** finding all classes that match patterns: " + pattern + " ***\n");
    var allClasses = Java.enumerateLoadedClassesSync();
    allClasses.forEach(function(aClass) {
        if (aClass.match(pattern))
            console.log(aClass)
    });
}

function findClass(pattern)
{
    console.warn("\n*** finding all classes that match patterns: " + pattern + " ***\n");
    Java.enumerateLoadedClasses({
        onMatch: function(classname) {
            if (classname.match(pattern))
                console.log(classname);
        },
        onComplete: function() {}
    });
}

setTimeout(function() {
    Java.perform(function() {
        // Synchronized version
        findClassSync();              // print all loaded classes
        //findClassSync("xathrya");   // print all classes that match a string
        //findClassSync(/root/i);     // print all classes that match a regex

        // Unsynchronized version
        //findClass();                // print all loaded classes
        //findClass("xathrya");       // print all classes that match a string
        //findClass(/root/i);         // print all classes that match a regex
    });
});
