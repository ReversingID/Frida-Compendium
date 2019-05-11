# Archive of Reversing.ID
# Frida Compendium - Android Basic
#
# Find Java class, use, and instantiate it.
#
# Run: python object-operation.py
#
import frida
import sys

APP_PACKAGE = "id.reversing.app"

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


def load_script(script_name):
    with open(script_name) as f:
        script = f.read()
    return script
      

def main():
    # Get device (see also attach.py)
    device  = frida.get_usb_device()    # get the first device
    session = device.attach(APP_PACKAGE) 
    
    # Instrumentation script 
    jscode = load_script("objects.js")
    script = session.create_script(jscode)

    # Load the script
    script.on('message', on_message)
    script.load()
    
    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()


if __name__ == '__main__':
    main()