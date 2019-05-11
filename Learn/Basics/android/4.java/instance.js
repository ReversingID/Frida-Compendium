/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Some instances of android classes

Target: <any>
*/

'use strict';

Java.perform(function() {

    // Java String
    var JString  = Java.use("java.lang.String");
    var instance = JString.$new("Reversing.ID: Hello World!");


    // Android Activity (parent of all)
    var ActivityClass  = Java.use("android.app.Activity");
    var ActivityThreadClass = Java.use("android.app.ActivityThread");

    // Android context
    // context the view is currently running in (usually current active Actiity)
    var context1 = ViewObj.getContext();    
    // context for the entire application
    var context2 = ActivityObj.getApplicationContext();

    var application = ActivityThreadClass.currentApplication();
    var context3    = application.getApplicationContext();


    // Android Intent
    var IntentClass = Java.use("android.content.Intent");


    // Toast
    var ToastClass = Java.use("android.widget.Toast");


    // Android Telephony manager
    var TelManagerClass = Java.use("android.telephony.TelephonyManager");


    // Wifi Manager
    var WifiManagerClass = Java.use("android.net.wifi.WifiManager");

    // Java I/O
    var InputStreamClass  = Java.use("java.io.InputStream");
    var OutputStreamClass = Java.use("java.io.OutputStream");
    
});
