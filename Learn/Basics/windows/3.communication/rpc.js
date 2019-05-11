/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Create and RPC endpoint which can be used in host and executed by the frida

Target: count.exe
*/

'use strict';

rpc.exports = {
    /*
    Exporting function disassemble() with 1 argument
    Later, host can call from API exports
    */
    disassemble: function(address) {
        return Instruction.parse(ptr(address)).toString();
    },
    /*
    Simple function that require 2 arguments and print them.
    */
    hello: function(sender, recipient) {
        console.log("Hello from " + sender + " to " + recipient);
    }
};