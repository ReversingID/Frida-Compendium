# Inject an application, load dex and execute a function
#
# Run: python android-open.py
import frida
import sys

# Arbitrary package where injection happen
PROCESS_NAME = "id.xathrya.app"
DEX_PATH = "/data/local/tmp/id.xathrya.app.apk"
# Complete with package name
ENTRY_CLASS = "id.xathrya.app.AndroMain"
ENTRY_FUNC = "main"
ARGS = "Hello World!"


def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


def load_script(script_name):
    with open(script_name) as f:
        script = f.read()
    return script


def attach_to_application(appname, spawn_new=False):
    device = frida.get_usb_device()

    if spawn_new:
        pid = device.spawn([appname])
        device.resume(pid)
        time.sleep(1)
        appname = pid

    return device.attach(appname)


def main():
    # Attach on running process, not spawning new
    session = attach_to_application(PROCESS_NAME, False)

    # Instrumentation script 
    # Use external class file.
    # Here we are inside a function
    jscode = load_script("android-open.js")
    script = session.create_script(jscode.format % (DEX_PATH, ENTRY_CLASS, ENTRY_FUNC, ARGS))

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
