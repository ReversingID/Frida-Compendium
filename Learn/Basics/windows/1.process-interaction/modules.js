/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Process the modules

Target: dllfunc.exe
*/
'use strict';


var module_name = "%s";

// Enumerate modules
console.log("[*] === Enumerate Modules ===");
Process.enumerateModules().forEach(function(m) {
    console.log("[" + m.base + "](" + m.size + ") " + m.name);
});


// Find the module inside process and print it's base address
console.log("[*] === Find module " +  module_name + " ===");
const module = Process.findModuleByName(module_name);
console.log("    Module found at base address: " + module.base);


// Find module's base address (using Module)
console.log("[*] === Find module base addresss");
const addr_module = Module.findBaseAddress(module_name);
console.log("    Module found at base address: "  + addr_module);