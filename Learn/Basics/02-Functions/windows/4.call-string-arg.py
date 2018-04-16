# Attach on running process and call a function with user-defined argument.
# The argument is a string that is allocated manually before passing.
# Script is embedded here
#
# Run: python call-string-arg.py
import frida
import sys


def on_message(message, data):
    print(message)


def wait_interrupt(script): 
    try:
        while True:
            sys.stdin.read()
    except KeyboardInterrupt:
        script.unload()


def main():
    # Attach on running process
    session = frida.attach("hi.exe")

    # Address is in hex form
    addr = 0
    if len(sys.argv) > 1:
        addr = int(sys.argv[1], 16)
    else:
        addr = int(input("Address: "), 16)

    # Instrumentation script 
    # Hook to native function on certain address ex: ptr("0x123456")
    # returning int
    # with list of arguments ['pointer']
    script = session.create_script("""
var st = Memory.allocUtf8String("XATHRYA invoking!");
var f  = new NativeFunction(ptr("{ARG}"), 'int', ['pointer']);
f(st);
    """ % addr)
    script.on('message', on_message)
    script.load()
    wait_interrupt(script)

    # Create a new script.
    # Hook a function and change the string
    # Hook to native function on certain address ex: ptr("0x123456")
    # returning int
    # with list of arguments ['pointer']
    script = session.create_script("""
var st = Memory.allocUtf8String("XATHRYA remove this!");

Interceptor.attach(ptr("{ARG}"), {
    onEnter: function(args) {
        args[0] = st;
    }
});
    """ % addr)
    script.on('message', on_message)
    script.load()
    wait_interrupt(script)  

    # Create a new script.
    # Rewrite the argument without consent of the caller
    # Hook to native function on certain address ex: ptr("0x123456")
    # returning int
    # with list of arguments ['pointer']
    script = session.create_script("""
Interceptor.attach(ptr("{ARG}"), {
    onEnter: function(args) {
        Memory.writeUtf8String(args[0], "Rewrite!");
    }
});
    """ % addr)
    script.on('message', on_message)
    script.load()
    wait_interrupt(script)  

    session.detach()
    sys.exit(0)


if __name__ == '__main__':
    main()