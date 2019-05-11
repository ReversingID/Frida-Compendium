/*
Archive of Reversing.ID
Frida Compendium - Android Basic

Create and RPC endpoint which can be used in host and executed by the frida

Target: id.reversing.app
*/

'use strict';

rpc.exports = {
    /*
    Simple function that require 2 arguments and print them.
    */
    hello: function(sender, recipient) {
        console.log("Hello from " + sender + " to " + recipient);
    }
};