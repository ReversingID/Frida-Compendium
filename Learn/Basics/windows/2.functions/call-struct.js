/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Call a function with user-defined argument.
The argument is a structure that is allocated manually before passing.

Target: struct-hi.exe
*/
'use strict';

var addr = ptr("%s");

// Allocating structure and fill it
var st = Memory.alloc(264);

var buffer = "XATHRYA is invoking!";
st.writeU32(buffer.length);                 // memory_block.length
st.add(0x4).writeUtf8String(buffer);        // memory_block.buffer
st.add(0x104).writeU32(0);                  // memory_block.count


// Invoking function directly
var f  = new NativeFunction(addr, 'int', ['pointer']);
f(st);

// Modify string argument
st.writeU32("Reversing.ID".length);
st.add(0x4).writeUtf8String("Reversing.ID");
st.add(0x104).writeU32(0);

Interceptor.attach(addr, {
    onEnter: function(args) {
        args[0] = st;
    }
});