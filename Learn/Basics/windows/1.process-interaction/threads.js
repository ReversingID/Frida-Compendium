/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Thread processing
    - Enumerate

Target: dllfunc.exe
*/
'use strict';

var module_name = "%s";
var func_name   = "%s";

// ================ Enumerate threads ============================================
/*
The synchronized version will return a list of modules which we will then iterate with forEach()
*/
console.log("[*] ==== Enumerate threads ====");
Process.enumerateThreads().forEach(function(thr) {
    console.log("[" + thr.id + "] " + thr.state);
});


// ================ Backtrace ====================================================
/*
Trace the execution, path that call this funciton
*/
console.log("Hook and then trace " + func_name);
var f = Module.getExportByName(module_name, func_name);
Interceptor.attach(f, {
    onEnter: function(args) {
        console.log(func_name + " called from: ");
        console.log(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n"));
    }
});