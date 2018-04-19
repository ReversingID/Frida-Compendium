# Enumerate:
#   - classes
#   - methods
#
# Run: python enum-process.py
import frida

APP_PACKAGE = "XathryaApp"

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
    jscode = load_script("enumerate.js")
    script = session.create_script(jscode)

    # Load the script
    script.load()

    # Use exported RPC
    api    = script.exports
    api.allclasses()
    
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