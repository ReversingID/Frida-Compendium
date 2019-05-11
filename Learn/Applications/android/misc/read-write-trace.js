/*
Archive of Reversing.ID 
Frida Compendium - Android Application


*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var BuffReaderClass = Java.use("java.io.BufferedReader");
		var WriterClass     = Java.use("java.io.Writer");

		BuffReaderClass.readLine.overload().implementation = function () {
			var line = this.readLine();
			console.log("[*] BufferedReader.readLine called: " + line +"\n");
			return line;
		};

		BuffReaderClass.read.overload().implementation = function () {
			var ch = this.read();
			console.log("[*] BufferedReader.read called: " + ch +"\n");
			return ch;
		};

		WriterClass.write.overload('java.lang.String').implementation = function (data) {
			console.log("[*] Writer.write called: " + data +"\n");
			this.write(data);
		};
    });
}, 0);