/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Creating and manipulating Java array
*/

'use strict';

setTimeout(function() {
    Java.perform(function() {

        // Instantiate / creating java (byte) array
        var buffer = Java.array("byte", [ 13, 37, 42 ]);

        // Accessing individual element (read, write)
        buffer[0] = 15;
        var elem = buffer[1];

    });
});