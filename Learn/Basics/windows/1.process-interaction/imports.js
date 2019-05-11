/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Processing list of imports symbol in modules
  - enumerate

Target: dllfunc.exe
*/

'use strict';

/*
    Module = { name, base, size, path }
*/

var module_name = "%s";
var func_name   = "%s";

// ================ Enumerate imports symbol ============================================
/*
The synchronized version will return a list of modules which we will then iterate with forEach()
*/
console.log("[*] ==== Synchronized function .enumerateImportsSync() ====");
Module.enumerateImportsSync(module_name).forEach(function(imp) {
    console.log(imp.type + "[" + imp.address + "](" + imp.module + ") " + imp.name);
});

/*
The asynchronized version will execute a callback when a matched module is found 
*/
console.log("[*] ==== Asynchronized function .enumerateImports() ====");
Module.enumerateImports(module_name, {
    onMatch: function(imp) {
        console.log(imp.type + "[" + imp.address + "](" + imp.module + ") " + imp.name);
    },
    onComplete: function(){ }
});