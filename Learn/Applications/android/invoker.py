# Invoke script in following directory
#
# Run: python invoker.py script.js
import frida
import sys

SCRIPT_NAME = "script.js"          # or argv[1]
APP_PACKAGE = "id.reversing.app"   # or argv[2]

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
    if len(sys.argv) > 1:
        global SCRIPT_NAME
        SCRIPT_NAME = sys.argv[1]
    if len(sys.argv) > 2:
        global APP_PACKAGE
        APP_PACKAGE = sys.argv[2]

    # Get device (see also attach.py)
    device  = frida.get_usb_device()    # get the first device
    session = device.attach(APP_PACKAGE) 
    
    # Instrumentation script 
    jscode = load_script(SCRIPT_NAME)
    script = session.create_script(jscode)

    # Set a callback, when frida is sending a string, we print it out
    script.on('message', on_message)

    # Load the script
    script.load()
    
    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    try:
        while True:
            sys.stdin.read()
    except KeyboardInterrupt:
        session.detach()
        sys.exit(0)


if __name__ == '__main__':
    main()