/*
Archive of Reversing.ID
Frida Compendium - Android Application

Hook to various logger function and trace the call to logging

*/
'use strict';


setTimeout(function() {
    Java.perform(function() {
        var LogClass = Java.use("android.util.Log");

		// --- Debug
		LogClass.d.overload('java.lang.String', 'java.lang.String').implementation = function (tag, value) {
			console.log("[*] Debug log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.d.overload('java.lang.String', 'java.lang.String').call(tag, value);
		};

		LogClass.d.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, value, arg2) {
			console.log("[*] Debug log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.d.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').call(tag, value, arg2);
		};


		// --- Error
		LogClass.e.overload('java.lang.String', 'java.lang.String').implementation = function (tag, value) {
			console.log("[*] Error log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.e.overload('java.lang.String', 'java.lang.String').call(tag, value);
		};

		LogClass.e.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, value, arg2) {
			console.log("[*] Error log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.e.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').call(tag, value, arg2);
		};		


		// --- Information
		LogClass.i.overload('java.lang.String', 'java.lang.String').implementation = function (tag, value) {
			console.log("[*] Information log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.i.overload('java.lang.String', 'java.lang.String').call(tag, value);
		};

		LogClass.i.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, value, arg2) {
			console.log("[*] Information log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.i.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').call(tag, value, arg2);
		};


		// --- Verbose
		LogClass.v.overload('java.lang.String', 'java.lang.String').implementation = function (tag, value) {
			console.log("[*] Verbose log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.v.overload('java.lang.String', 'java.lang.String').call(tag, value);
		};

		LogClass.v.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, value, arg2) {
			console.log("[*] Verbose log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.v.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').call(tag, value, arg2);
		};		


		// --- Warning
		LogClass.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag, value) {
			console.log("[*] Warning log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.w.overload('java.lang.String', 'java.lang.String').call(tag, value);
		};

		LogClass.w.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, value, arg2) {
			console.log("[*] Warning log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.w.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').call(tag, value, arg2);
		};	


		// --- What a Terrible Failure
		LogClass.wtf.overload('java.lang.String', 'java.lang.String').implementation = function (tag, value) {
			console.log("[*] What a Terrible Failure log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.wtf.overload('java.lang.String', 'java.lang.String').call(tag, value);
		};

		LogClass.wtf.overload('java.lang.String', 'java.lang.String', 'java.lang.Throwable').implementation = function (tag, value, arg2) {
			console.log("[*] What a Terrible Failure log displayed with TAG: " + tag + " and VALUE: " + value + "\n");
			this.wtf.overload('java.lang.String', 'java.lang.String', ).call(tag, value, arg2);
		};
    });
});
