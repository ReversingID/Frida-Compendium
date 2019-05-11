/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Read content of memory at certain address

Target: memfield.exe
*/

'use strict';

var addr = ptr("%s");
var length = %d;

console.log("addr: " + addr + " | length: " + length);

// Read from memory address, return ArrayBuffer object containing the data
var buff = Memory.readByteArray(addr, length);

// Create integer array to access data directly
var data = new Uint8Array(buff);

// display in hexadecimal formats (hexdump)
console.log(hexdump(buff, {
    offset: 0,
    length: length,
    header: true,
    ansi: false
}));