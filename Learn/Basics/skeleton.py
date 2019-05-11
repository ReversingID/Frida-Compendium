# Archive of Reversing.ID
# Frida Compendium
#
# Skeleton
#

import frida 
import sys 


SCRIPT_NAME = "file.js"
TARGET      = "id.reversing.target"

# Callback function that process incoming message from frida-server
def msg_callback(message, data):
    if "payload" in message:
        print(str(message["payload"]))
    else:
        print(message)


# Helper function to attach a running process
def attach_to_process(target, spawn=False):
    device = frida.get_usb_device()
    if spawn:
        pid     = device.spawn([target])
        session = device.attach(pid)
        device.resume(pid)
    else:
        session = device.attach(target)
    
    return session 


def read_script(script_name):
    with open(script_name) as f:
        jscode = f.read()
    
    return jscode


if __name__ == '__main__':
    # Load user specific script filename
    if len(sys.argv) > 1:
        SCRIPT_NAME = sys.argv[1]
    
    if len(sys.argv) > 2:
        TARGET = sys.argv[2]

    # Attach to running process
    session = attach_to_process(TARGET)

    # Load the instrumentation script
    jscode = read_script(SCRIPT_NAME)
    if jscode:
        script = session.create_script(f.read())
    
        # Set a callback, when frida is sending a string then we print it out
        script.on("message", msg_callback)

        # Load the script
        script.load()

        # Delay
        # Execution is happened on other process so we need to make our script
        # running all the way to the end
        input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
        session.detach()

