# Archive of Reversing.ID
# Frida Compendium - Android Basic
#
# Loader for script (inject to target).
#
# Run: python load.py <target> <scriptname>.js
#
import frida
import sys 

# Use this script to inject following JS file to target

# Target: id.reversing.classop
#   - sniff.js
#   - modify.js
#   - call.js


def on_message(message, data):
    print(message)


def read_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def main():
    # Refuse to run if argument is not 3
    if len(sys.argv) < 3:
        print("Usage: python load.py <target> <scriptname>.js")
        sys.exit(0)

    # Parse the arguments
    target_app  = sys.argv[1]               # Target application
    script_name = sys.argv[2]               # Script name

    # Attach on running process
    session = frida.get_usb_device().attach(target_app)

    # Instrumentation script
    jscode = read_script(script_name)
    script = session.create_script(jscode)

    # Set a callback, when frida is sending a string, we print it out
    script.on("message", on_message)

    # Load the script
    script.load()

    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()

if __name__ == '__main__':
    main()