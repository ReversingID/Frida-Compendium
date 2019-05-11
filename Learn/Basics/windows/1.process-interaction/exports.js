/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Processing list of exports symbol in modules
  - enumerate
  - find export by name

Target: dllfunc.exe
*/

'use strict';

/*
    Module = { name, base, size, path }
*/

var module_name = "%s";
var func_name   = "%s";

// ================ Enumerate exports symbol ============================================
/*
The synchronized version will return a list of modules which we will then iterate with forEach()
*/
console.log("[*] ==== Synchronized enumeration ====");
Module.enumerateExportsSync(module_name).forEach(function(exp) {
    console.log("[" + exp.type + "](" + exp.address + ") " + exp.name);
});

/*
The asynchronized version will execute a callback when a matched module is found 
*/
console.log("[*] ==== Asynchronized enumeration ====");
Module.enumerateExports(module_name, {
    onMatch: function(exp) {
        console.log("[" + exp.type + "](" + exp.address + ") " + exp.name);
    },
    onComplete: function(){ }
});


// ================ Find exports by name ================================================
console.log("[*] ==== Finding " + func_name + " at module " + module_name + " ====");
const addr_export_func = Module.findExportByName(module_name, func_name);
console.log("[*] Function found at: " + addr_export_func);