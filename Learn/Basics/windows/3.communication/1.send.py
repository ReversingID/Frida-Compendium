# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Send data form instrumentation script to host
#
# Run: python send.py <target>.exe <scriptname>.js <address>
#
import frida
import sys 

# Use this script to inject following JS file to target

# Target: count.exe
#   - send-simple.js
#   - send-complex.js


def on_message(message, data):
    # Every message has type which can has value "send" and "error"
    print("Type: {}".format(message["type"]))
    # and also payload
    if "payload" in message:
        print("Payload: {}".format(message["payload"]))
    else:
        print(message)


def read_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def main():
    # Refuse to run if argument is not 3
    if len(sys.argv) < 4:
        print("Usage: python script.py <target>.exe <scriptname>.js <address>")
        sys.exit(0)

    # Parse the arguments
    target_app  = sys.argv[1]               # Target application
    script_name = sys.argv[2]               # Script name
    addr        = int(sys.argv[3], 16)      # Address is in hex form

    # Attach on running process
    session = frida.attach(target_app)

    # Instrumentation script 
    # Using Interceptor to attach to a function
    # Here we are inside a function
    jscode = read_script(script_name)
    script = session.create_script(jscode % (addr))

    # Set a callback, when frida is sending a string, we print it out
    script.on('message', on_message)

    # Load the script
    script.load()

    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()

if __name__ == '__main__':
    main()