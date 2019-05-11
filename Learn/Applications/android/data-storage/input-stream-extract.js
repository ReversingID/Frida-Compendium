/*
Archive of Reversing.ID 
Frida Compendium - Application

Hook InputStream and print limited buffer as ascii & exclude list.

*/
'use strict';


function binToHexToAscii(array, limit) {
    var result = [];

    // read 100 bytes at most
    limit = limit || 100;
    for (var i = 0; i < limit; ++i) {
        result.push(String.fromCharCode(
            parseInt(
                ('0' + (array[i] & 0xFF).toString(16)).slice(-2), 16)
            )
        );
    }
    return result.joint('');
}

function hookInputStream() {
    var IStreamClass = Java.use("java.io.InputStream");

    IStreamClass.read.overload("[B").implementation = function(b) {
        // Execute original and save return value
        var retval = this.read(b);
        var resp = binToHexToAscii(b);

        // Exclude some garbage packets
        var reExcludeList = new RegExp(['Mmm', 'Yo'].join("|"));
        if (! reExcludeList.test(resp)) {
            console.log(resp);
        }
        
        var reIncludeList = new RegExp(['AAA', 'BBB', 'CCC'].join("|"));
        if (reIncludeList.test(resp)) {
            send(binToHexToAscii(b, 1200));
        }

        return retval;
    }
}

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(hookInputStream);
},0);