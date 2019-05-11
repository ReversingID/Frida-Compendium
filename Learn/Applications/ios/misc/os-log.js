/*
Archive of Reversing.ID
Frida Compendium - iOS Application

*/
'use strict';

if (ObjC.available)
{
    console.log("[*] Starting script");

    var libname = "libsystem_trace.dylib";

    var isEnabledFunc = Module.findExportByName(libname, "os_log_type_enabled");
    var logFunc       = Module.findExportByName(libname, "_os_log_impl");

    // Enable all logs
    Interceptor.attach(isEnabledFunc, {
        onLeave: function(retval) {
            retval.replace(0x1);
        }
    });

    // Display the log
    Interceptor.attach(logFunc, {
        onEnter: function(args) {
            var type = args[2];
            var format = args[3];

            if (type !== 0x2) {
                console.log(JSON.stringify({
                    type: type,
                    format: format.readCString(),
                }, null, 2));
            }
        }
    });
}