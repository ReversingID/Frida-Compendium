/*
Archive of Reversing.ID
Frida Compendium - Android Application

ANDROID_ID is unique to each combination of app-signing key, user, and device.
*/

'use strict';

setImmediate(function() {
    console.log("[*] Starting script");

    Java.perform(function() {
        var ATClass     = Java.use("android.app.ActivityThread");    
        var SettingClass= Java.use("android.provider.Settings$Secure"); 

        var application = ATClass.currentApplication();
        var resolver    = application.getContentResolver();

        // Invoking static function makeTest() of class Toast
        console.log("Application ID: " + SettingClass.getString(resolver, "android_id"));
    });
});
