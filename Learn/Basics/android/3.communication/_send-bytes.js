/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Send simple data from instrumented process.

Target: id.reversing.classop
*/
'use strict';

/*
send() can be called in any scope, global or inside function.
*/

send(0);

setTimeout(function() {
    Java.perform(function() {
        
    });
});