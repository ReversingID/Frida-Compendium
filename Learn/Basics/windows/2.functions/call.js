/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Call a function with user-defined argument.

Target: count.exe
*/
'use strict';

var addr = ptr("%s");
                            /* address */           /* list of arguments */
var f = new NativeFunction  (addr,      'void',     ['int']);
                                        /* return value */

// Call function directly
f(1992);
f(1993);
f(1994);