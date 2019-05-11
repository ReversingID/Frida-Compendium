/*
Archive of Reversing.ID 
Frida Compendium - Application

Reveal manually register native methods

JNI has a function RegisterNative() which can map a symbol as a native handler to 
Java method without following the naming rule.
This behavior, can be used as anti-reversing techniques for hiding the symbols as
much as possible.

*/
'use strict';

function revealNativeMethod()
{
    var pointer_size = Process.pointerSize;
    var env = Java.vm.getEnv();

    // Getting something like syscall number for JNI
    // see: https://docs.oracle.com/javase/8/docs/technotes/guides/jni/spec/functions.html
    var RegisterNatives = 215, FindClassIndex = 6;
    var jclassAddress2NameMap = {};

    function getNativeAddress(idx) {
        return env.handle.readPointer().add(idx * pointer_size).readPointer();
    }

    // Intercepting findClass to populate Map<address, jclass>
    Interceptor.attach(getNativeAddress(FindClassIndex), {
        onEnter: function(args) {
            jclassAddress2NameMap[args[0]] = args[1].readCString();
        },
        onLeave: function(retval) { }
    });

    // Intercepting RegisterNative(jClass*, ..., JNINativeMethod *methods[nMethods], uint nMethods)
    /*
        typedef struct {
            const char * name;
            const char * signature;
            void       * fnPtr;
        } JNINativeMethod;
    */
    Interceptor.attach(getNativeAddress(RegisterNatives), {
        onEnter: function(args) {
            for (var i = 0, nMethods = parseInt(args[3]); i < nMethods; i++) {
                var struct_size = pointer_size * 3; // sizeof(JNINativeMethod)
                var method_ptr  = ptr(args[2]);

                var signature   = method_ptr.add(i * struct_size + pointer_size).readPointer();
                var fn_ptr      = method_ptr.add(i * struct_size + pointer_size * 2).readPointer();
                var jclass      = jclassAddress2NameMap[args[0]].split('/');

                console.log(JSON.stringify({
                    module:     DebugSymbol.fromAddress(fn_ptr)['moduleName'],
                    package:    jclass.slice(0, -1).join('.'),
                    class:      jclass[jclass.length -1],
                    method:     method_ptr.readPointer().readCString(),
                    signature:  signature.readCString(),
                    address:    fn_ptr
                }));
                console.log("--------------------------\n");
            }
        },
        onLeave: function(retval) { }
    });
}

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(revealNativeMethod);
},0);