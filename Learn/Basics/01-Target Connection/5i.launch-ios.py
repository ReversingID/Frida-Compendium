#### INCOMPLETE !!!!! ####
#### Work in Progress ####

# Launch and spy on iOS app
#
# Run: python launch-ios.py 
# or use "frida-trace -U -f com.android.vending -I libcommonCrypto.dylib"
import frida
import sys

device = None
pid    = None

def on_message(message):
    if message.type == 'send' and message.payload['event'] == 'ready':
        device.resume(pid)
    else:
        print(message)


def load_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def attach_to_application(appname, spawn_new=False):
    global device
    global pid
    device = frida.get_usb_device()

    if spawn_new:
        pid = device.spawn([appname])
        device.resume(pid)
        time.sleep(1)
        appname = pid 

    return device.attach(appname)


def main():
    session = attach_to_application("ios.application, True)

    # Instrumentation script 
    # Use interceptor to attach to every exported function on a library
    jscode = load_script("launch-ios.js")
    script = session.create_script(jscode)
    
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

    