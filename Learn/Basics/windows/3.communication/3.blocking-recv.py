# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Send and receive data to and from instrumented process.
# Blocking operation.
#
# Run: python blocking-recv.py <address>
#s
import frida
import sys

# Use this script to inject following JS file to target

# Target: count.exe
#   - blocking-recv.js

TARGET_APP = "count32.exe"
script = None


def on_message(message, data):
    print(message)
    val = int(message['payload'])
    script.post( { 'type':'input', 'payload':str(val * 2) } )


def load_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def main():
    # Refuse to run if argument is not 3
    if len(sys.argv) < 2:
        print("Usage: python script.py <address>")
        sys.exit(0)

    # Parse the arguments
    addr = int(sys.argv[1], 16)      # Address is in hex form

    # Attach on running process
    session = frida.attach(TARGET_APP)

    # Instrumentation script 
    # Using Interceptor to attach to a function
    # Here we are inside a function
    global script
    jscode = load_script("blocking-recv.js")
    script = session.create_script(jscode % (addr))

    # Set a callback, when frida is sending a string, we print it out
    script.on('message', on_message)

    # Load the script
    script.load()

    script.post( { 'magic' : 135 } )
    script.post( { 'magic' : 135 } )

    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()


if __name__ == '__main__':
    main()

    