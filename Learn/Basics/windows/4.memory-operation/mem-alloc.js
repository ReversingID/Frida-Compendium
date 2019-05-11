/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Memory allocation and fill

Target: memfield.exe
*/
'use strict';

// Allocate memory
var dst = Memory.alloc(64);

// Allocate and fill it with UTF-8 string
var src = Memory.allocUtf8String("XATHRYA");

// Copy and duplicate
Memory.copy(dst, src, 7);