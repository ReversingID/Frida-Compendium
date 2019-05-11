/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Patching a 

Target: memfield.exe
*/
'use strict';

var addr = ptr("%s");
var data = %s;

Memory.writeByteArray(addr, data);