/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Read content of memory at certain address

Target: memfield.exe
*/
'use strict';

var addr = ptr("%s");
var data = %s;

console.log("addr: " + addr + " | length: " + data.length);

// Write to memory address, data can be ArrayBuffer or simple array
Memory.writeByteArray(addr, data);