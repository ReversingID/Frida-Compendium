/*
Archive of Reversing.ID
Frida Compendium - Windows Application

Trace the allocation process on Windows application based on API call.

Target: alloc.exe
Run:
	$ frida -f alloc.exe -l trace-allocation.js
*/
'use strict';

/* Get the address of API */
var RtlAllocateHeapAddr   = Module.findExportByName('ntdll.dll', 'RtlAllocateHeap');
var RtlFreeHeapAddr       = Module.findExportByName('ntdll.dll', 'RtlFreeHeap');
var RtlReAllocateHeapAddr = Module.findExportByName('ntdll.dll', 'RtlReAllocateHeap');

console.log('RtlAllocateHeap   address: ' + RtlAllocateHeapAddr.toString());
console.log('RtlFreeHeap       address: ' + RtlFreeHeapAddr.toString());
console.log('RtlReAllocateHeap address: ' + RtlReAllocateHeapAddr.toString());


/* Attach to each of API and sniff the arguments and return value */
Interceptor.attach(RtlAllocateHeapAddr, {
	onEnter: function(args) {
		console.log('RtlAllocateHeap called from ' + this.returnAddress.sub(6).toString());
		console.log('HeapHandle: ' + args[0].toString());
		console.log('Flags: ' + args[1].toString());
		console.log('Size: ' + args[2].toString());
	}, 
	onLeave: function(retval) {
		console.log('[+] Returned address: ' + retval.toString());
		console.log('---------------------');
	}
});

Interceptor.attach(RtlFreeHeapAddr, {
	onEnter: function(args) {
		console.log('RtlFreeHeap called from ' + this.returnAddress.sub(6).toString());
		console.log('HeapHandle: ' + args[0].toString());
		console.log('Flags: ' + args[1].toString());
		console.log('HeapBase: ' + args[2].toString());
	}, 
	onLeave: function(retval) {
		console.log('---------------------');
	}
});

Interceptor.attach(RtlReAllocateHeapAddr, {
	onEnter: function(args) {
		console.log('RtlReAllocateHeap called from ' + this.returnAddress.sub(6).toString());
		console.log('HeapHandle: ' + args[0].toString());
		console.log('Flags: ' + args[1].toString());
		console.log('Pointer: ' + args[2].toString());
		console.log('Size: ' + args[3].toString());
	}, 
	onLeave: function(retval) {
		console.log('[+] Returned address: ' + retval.toString());
		console.log('---------------------');
	}
});