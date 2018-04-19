// Find base address of current imported jvm.dll by main process fledge.exe
var baseAddr = Module.findBaseAddress('Jvm.dll');
console.log('Jvm.dll baseAddr: ' + baseAddr);

var SetAesDeCrypt0 = resolveAddress('0x1FF44870');  // Here we use the function address as seen in our disassembler

Interceptor.attach(SetAesDeCrypt0, {                // Intercept calls to our SetAesDecrypt function
    // When function is called, print out its parameters
    onEnter: function (args) {
        console.log('');
        console.log('[+] Called SetAesDeCrypt0' + SetAesDeCrypt0);
        console.log('[+] Ctx: ' + args[0]);
        console.log('[+] Input: ' + args[1]); // Plaintext
        console.log('[+] Output: ' + args[2]); // This pointer will store the de/encrypted data
        console.log('[+] Len: ' + args[3]); // Length of data to en/decrypt
        dumpAddr('Input', args[1], args[3].toInt32());
        this.outptr = args[2]; // Store arg2 and arg3 in order to see when we leave the function
        this.outsize = args[3].toInt32();
    },

    // When function is finished
    onLeave: function (retval) {
        dumpAddr('Output', this.outptr, this.outsize); // Print out data array, which will contain de/encrypted data as output
        console.log('[+] Returned from SetAesDeCrypt0: ' + retval);
    }
});

function dumpAddr(info, addr, size) {
    if (addr.isNull())
        return;

    console.log('Data dump ' + info + ' :');
    var buf = Memory.readByteArray(addr, size);

    // If you want color magic, set ansi to true
    console.log(hexdump(buf, { offset: 0, length: size, header: true, ansi: false }));
}

function resolveAddress(addr) {
    var idaBase = ptr('0x1FEE0000');        // Enter the base address of jvm.dll as seen in your favorite disassembler (here IDA)
    var offset = ptr(addr).sub(idaBase);    // Calculate offset in memory from base address in IDA database
    var result = baseAddr.add(offset);      // Add current memory base address to offset of function to monitor
    console.log('[+] New addr=' + result);  // Write location of function in memory to console
    return result;
}