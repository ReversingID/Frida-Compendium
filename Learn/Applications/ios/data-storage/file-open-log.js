/*
Archive of Reversing.ID
Frida Compendium - iOS Application

Log each file open access
*/
'use strict';

if (ObjC.available)
{
    console.log("[*] Starting script");

    Interceptor.attach(ObjC.classes.NSFileManager['- fileExistsAtPath:'].implementation, {
        onEnter: function(args) {
            console.log("open ", ObjC.Object(args[2]).toString());
        },
        onLeave: function(retval) { }
    });
}