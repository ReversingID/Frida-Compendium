/*
Archive of Reversing.ID
Frida Compendium - Android

Hook Activity and trace android life cycle

Target: <any>
*/

'use strict';

Java.perform(function() {
    console.log(">> Starting script ...");

    var ActivityClass = Java.use("android.app.Activity");

    // Hooking .onCreate()
    ActivityClass.onCreate.overload("android.os.Bundle").implementation = function(savedInstanceState) {
        console.log("[*] Creating Activity ...");
        console.log("   >> name: " + this.getComponentName().getClassName());
        console.log("   >> action: " + this.getIntent().getAction());

        return this.onCreate(savedInstanceState);
    }

    // Hooking .onStart()
    ActivityClass.onStart.implementation = function() {
        console.log("[*] Starting Activity ...");
        console.log("   >> name: " + this.getComponentName().getClassName());

        return this.onStart();
    }

    // Hooking .onPause()
    ActivityClass.onPause.implementation = function(savedInstanceState) {
        console.log("[*] Pausing Activity ...");
        console.log("   >> name: " + this.getComponentName().getClassName());

        return this.onPause();
    }

    // Hooking .onResume()
    ActivityClass.onResume.implementation = function(savedInstanceState) {
        console.log("[*] Resuming Activity ...");
        console.log("   >> name: " + this.getComponentName().getClassName());

        return this.onResume();
    }

    // Hooking .onStop()
    ActivityClass.onStop.implementation = function(savedInstanceState) {
        console.log("[*] Stopping Activity ...");
        console.log("   >> name: " + this.getComponentName().getClassName());

        return this.onStop();
    }

    // Hooking .onDestroy()
    ActivityClass.onDestroy.implementation = function(savedInstanceState) {
        console.log("[*] Destroying Activity ...");
        console.log("   >> name: " + this.getComponentName().getClassName());

        return this.onDestroy();
    }
});