// Change the behavior of File.exists() to return false when it ask for certain file 
setTimeout(function(){
    Java.perform(function () {
        var IOFile = Java.use.use("java.io.File");

        IOFile.exists.implementation = function () {
            send("[*] exists() called");

            console.log(this.path['value']);
            var file_path = this.path['value'];
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