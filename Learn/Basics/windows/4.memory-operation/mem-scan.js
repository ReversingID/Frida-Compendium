/*
Archive of Reversing.ID
Frida Compendium - Windows Basic

Scan memory and search for content

Target: memfield.exe
*/
'use strict';

// Get all the pages in the form of range
var ranges = Process.enumerateRangesSync({
    protection: "r--",
    coalesce: true
});
var range;

function processNext() {
    range = ranges.pop();
    if (!range) {
        return;
    }

    // Search byte array inside the range. Pattern matching is supported
    Memory.scan(range.base, range.size, "%s", {
        onMatch: function(address, size) {
            console.log("[+] Pattern found at: " + address.toString());
        },
        onError: function(reason) {
            console.log("[!] There was an error scanning memory");
        },
        onComplete: function() {
            processNext();
        }
    });
}
processNext();