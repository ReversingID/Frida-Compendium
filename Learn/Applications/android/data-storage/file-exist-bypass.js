/*
Archive of Reversing.ID 
Frida Compendium - Application

Changes the behavior of FIle.exists()
return false when it ask for certain file.
Or can be otherwise.

*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
        var IOFileClass = Java.use("java.io.File");

        IOFileClass.exists.implementation = function () {
            console.log("[*] exists() called: ");

            var file_path = this.path.value;
            console.log("   >> " + file_path);
            var root_locations = ['/bin/su','/xbin/su','Superuser.apk','busybox','/sdcard/test'];
            
            console.log("[*] Comparing path to predefined list");
            if (root_locations.indexOf(file_path) >= 0)
            {
                console.log("[+] Match! " + file_path);
                return false;
            }
            return this.exists(file_path);
        };
    });
},0);