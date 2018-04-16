# Launch and spy on Android app
#
# Run: python launch-android.py 
# equivalent to "frida-trace -U -f com.android.vending"
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
    session = attach_to_application("com.android.vending", True)

    # Instrumentation script 
    # Use interceptor to attach to every exported function on a library
    jscode = load_script("launch-android.js")
    script = session.create_script(jscode)

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

    