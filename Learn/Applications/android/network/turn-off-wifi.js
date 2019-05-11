/*
Archive of Reversing.ID 
Frida Compendium - Application

Turn WiFi off by invoking setWifiEnabled()
*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var WifiManagerClass = Java.use("android.net.wifi.WifiManager");
        var wifi_manager     = Java.cast(this.getSystemService("wifi"), WifiManagerClass);

        console.log("Wifi is " + wifi_manager.isWifiEnabled() ? "enabled" : "disabled");

        wifi_manager.setWifiEnabled(false);
    });
},0);