# Archive of Reversing.ID
# Frida Compendium - Android Basic
#
# Send and receive data to and from instrumented process.
#
# Run: python recv.py 
#
import frida
import sys

# Use this script to inject following JS file to target

# Target: id.reversing.classop
#   - recv.js


TARGET_APP = "id.reversing.classop"

def on_message(message, data):
    print(message)


def read_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def main():
    # Attach on running process
    session = frida.get_usb_device().attach(TARGET_APP)

    # Instrumentation script 
    # Receive message from host and handle it on handleMessage
    jscode = read_script("recv.js")
    script = session.create_script(jscode)

    # Set a callback, when frida is sending a string, we print it out
    script.on('message', on_message)

    # Load the script
    script.load()

    # Object which sent-received is an object.
    # In python term, it should be a dictionary.
    print("[!] Sending message to instrumentation script")
    script.post( { 'magic' : 135 } )
    script.post( { 'magic' : 135 } )

    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()


if __name__ == '__main__':
    main()