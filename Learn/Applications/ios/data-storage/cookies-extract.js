/*
Archive of Reversing.ID
Frida Compendium - iOS Application

Extract cookies from NSHTTPCookieStorage
*/
'use strict';

if (ObjC.available)
{
    console.log("[*] Started: script");

    var jar = {};
    var cookies = ObjC.classes.NSHTTPCookieStorage.sharedHTTPCookieStorage().cookies();

    for (var i = 0, j = cookies.count(); i < j; i++) {
        var cookie = cookies['- objectAtIndex:'](i);
        jar[cookie.Name()] = cookie.Value().toString();
    }

    console.log(JSON.stringify(jar, null, 2));
}