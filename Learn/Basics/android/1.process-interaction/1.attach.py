# Archive of Reversing.ID
# Frida Compendium - Android Basic
#
# Various way to attach to a process (on Android).
#
# Run: python attach.py
#
import frida
import sys

# Variations of running Frida server
#   1. Listen on 127.0.0.1:27042 (default)
#       $ frida-server
#   2. Listen on all address
#       $ frida-server -l 0.0.0.0
#   3. Listen on a specific address
#       $ frida-server -l 192.168.142.101
#   4. Listen on specific address and port
#       $ frida-server -l 192.168.142.101:1337
#
# Make sure frida server is listening to correct address before do remote attach.

IP_ADDR = "192.168.142.101"
APP_PACKAGE = "id.reversing.app"

def waitinterrupt(session):
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()


def attach_remote_default(processname):
    print("[*] Attach to process on remote machine (with frida-server up)")
    
    device  = frida.get_remote_device()
    session = device.attach(processname)
    waitinterrupt(session)


def attach_remote(processname):
    print("[*] Attach to process on remote machine on IP {}".format(IP_ADDR))

    # If not defined
    manager = frida.get_device_manager()
    device  = manager.add_remote_device(IP_ADDR)
    # If has been defined
    device  = frida.get_device("tcp@{}".format(IP_ADDR))

    session = device.attach(processname)
    waitinterrupt(session)


def attach_device(processname):
    print("[*] Attach to device (with frida-server)")

    # Attach to device (with frida server)
    device  = frida.get_usb_device()
    session = device.attach(processname)
    waitinterrupt(session)


def attach_frontapp():
    print("[*] Attach to front app application ")

    device  = frida.get_usb_device()
    session = device.get_frontmost_application()
    waitinterrupt(session)


def attach_lastdevice(processname):
    print("[*] Enumerate devices and attach the app on the last device")

    manager = frida.get_device_manager()
    device  = manager.enumerate_devices()[-1]
    session = device.attach(processname)
    waitinterrupt(session)


def spawn_remote_default(appname):
    print("[*] Spawn process on remote machine (with frida-server)")
    device  = frida.get_remote_device()
    pid     = device.spawn([appname])
    session = device.attach(pid)

    device.resume(pid)
    waitinterrupt(session)


def spawn_remote(appname):
    print("[*] Spawn process on remote machine (with frida server) on IP {}".format(IP_ADDR))

    # If not defined
    manager = frida.get_device_manager()
    device  = manager.add_remote_device(IP_ADDR)
    # If has been defined
    device  = frida.get_device("tcp@{}".format(IP_ADDR))
    pid     = device.spawn([appname])
    session = device.attach(pid)

    device.resume(pid)
    waitinterrupt(session)


def spawn_device(appname):
    print("[*] Spawn application on device (with frida server)")

    device  = frida.get_usb_device()
    pid     = device.spawn([appname])
    session = device.attach(pid)
    
    device.resume(pid)
    waitinterrupt(session)


def spawn_lastdevice(appname):
    print("[*] Enumerate devices and spawn the application on the last device")

    manager = frida.get_device_manager()
    device  = manager.enumerate_devices()[-1]
    pid     = device.spawn([appname])
    session = device.attach(pid)
    
    device.resume(pid)
    waitinterrupt(session)


def main():
    #### Spawn process and attach to it
    spawn_remote(APP_PACKAGE)
    spawn_device(APP_PACKAGE)
    spawn_lastdevice(APP_PACKAGE)

    #### Attach to existing process
    attach_remote(APP_PACKAGE)
    attach_device(APP_PACKAGE)
    attach_frontapp()
    attach_lastdevice(APP_PACKAGE)

if __name__ == '__main__':
    main()