var libc = Module.findBaseAddress('libc.so');
var buf  = Memory.readByteArray(libc, 64);
console.log(hexdump(buf, {
    offset: 0,
    length: 64,
    header: true,
    ansi: true
}));