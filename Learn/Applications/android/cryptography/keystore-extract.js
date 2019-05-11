/*
Archive of Reversing.ID 
Frida Compendium - Application

Keystore extract.
Once the keystore exported, it must be converted to PKCS12 using keytool.

*/
'use strict';

setImmediate(function() {
    Java.perform(function () {
        var KeyStoreClass = Java.use("java.security.KeyStore");

        // Hooking Keystore.load(InputStream stream, char[] password)
        KeyStoreClass.load.overload("java.io.InputStream", "[C").implementation = function(stream, password) {
            if (stream != null) {
                // Read all the data from stream and clone 
                var data = [];
                var br = stream.read();
                while (br != -1)
                {
                    data.push(br);
                    br = stream.read();
                }

                // Send the keystore password and the keystore dump
                send({
                    type: this.getType(),   // Type of KeyStore: JKS/PKCS#12
                    pass: password          // Password to open
                }, data);                   // the keystore dump, must be handled
            }

            this.load(stream, password);
        }
    });
});