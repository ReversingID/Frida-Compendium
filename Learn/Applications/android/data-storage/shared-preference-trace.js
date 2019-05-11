/*
Archive of Reversing.ID 
Frida Compendium - Application

Trace the data flow in shared preferences.

*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var CtxWrapperClass = Java.use("android.content.ContextWrapper");
        var SPEClass        = Java.use("android.app.SharedPreferencesImpl$EditorImpl");     // Editor
        var SPClass         = Java.use("android.content.SharedPreferences");

        var OverloadFunc;

        // Get SharedPreferences from ContextWrapper
        OverloadFunc = CtxWrapperClass.getSharedPreferences.overload("java.lang.String", "int");
        OverloadFunc.implementation = function(name, mode) {
            console.log("[instantiate] name: " + name + " and mode: " + mode);
            return this.getSharedPreferences(name, mode);
        };
        
        // --------- Write to SharedPreference (using editor) ---------
        // Hooking .putString()
        OverloadFunc = SPEClass.putString.overload("java.lang.String", "java.lang.String");
        OverloadFunc.implementation = function(key, value) {
            console.log("write(string) key: " + key + " value: " + value);
            return this.putString(key, value);
        };
        
        // Hooking .putBoolean()
        OverloadFunc = SPEClass.putBoolean.overload("java.lang.String", "boolean");
        OverloadFunc.implementation = function(key, value) {
            console.log("write(bool) key: " + key + " value: " + value);
            return this.putBoolean(key, value);
        };
        
        // Hooking .putFloat()
        OverloadFunc = SPEClass.putFloat.overload("java.lang.String", "float");
        OverloadFunc.implementation = function(key, value) {
            console.log("write(float) key: " + key + " value: " + value);
            return this.putFloat(key, value);
        };
        
        // Hooking .putInt()
        OverloadFunc = SPEClass.putInt.overload("java.lang.String", "int");
        OverloadFunc.implementation = function(key, value) {
            console.log("write(int) key: " + key + " value: " + value);
            return this.putInt(key, value);
        };


        // --------- Read from SharedPreference ---------
        // Hooking .getString()
        OverloadFunc = SPClass.getString.overload("java.lang.String", "java.lang.String");
        OverloadFunc.implementation = function(key, defvalue) {
            var retval = this.getString(key, defvalue);
            console.log("read(string) key: " + key + " value: " + retval);
            return retval;
        };
        
        // Hooking .getBoolean()
        OverloadFunc = SPClass.getBoolean.overload("java.lang.String", "boolean");
        OverloadFunc.implementation = function(key, defvalue) {
            var retval = this.getBoolean(key, defvalue);
            console.log("read(bool) key: " + key + " value: " + retval);
            return retval;
        };

        // Hooking .getFloat()
        OverloadFunc = SPClass.getFloat.overload("java.lang.String", "float");
        OverloadFunc.implementation = function(key, defvalue) {
            var retval = this.getFloat(key, defvalue);
            console.log("read(float) key: " + key + " value: " + retval);
            return retval;
        };
        
        // Hooking .getInt()
        OverloadFunc = SPClass.getInt.overload("java.lang.String", "int");
        OverloadFunc.implementation = function(key, defvalue) {
            var retval = this.getInt(key, defvalue);
            console.log("read(int) key: " + key + " value: " + retval);
            return retval;
        };
    });
},0);