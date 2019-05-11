/*
Archive of Reversing.ID 
Frida Compendium - Application

Get and then change IMEI for application scope.

*/

setImmediate(function() {
    console.log("[*] Starting script");

    Java.perform(function() {
        var TelephonyClass = Java.use("android.telephony.TelephonyManager");

        // Get the IMEI
        var imei = TelephonyClass.getDeviceId();
        console.log("IMEI is: " + imei);

        // Change the IMEI
        TelephonyClass.getDeviceId.overload().implementation = function() {
            return "NEW IMEI HERE";
        };
    });
});