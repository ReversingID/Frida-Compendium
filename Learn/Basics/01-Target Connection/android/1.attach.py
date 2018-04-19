# Various way to attach to a process (on Android).
#
# Run: python call.py
import frida
import sys


def waitinterrupt(session):
    try:
        while True:
            sys.stdin.read()
    except KeyboardInterrupt:
        print("Closing!")
        session.close()
	
def attach_remote_default(processname):
    # Attach to process on remote machine (with frida server)
    device  = frida.get_remote_device()
    session = device.attach(processname)
    waitinterrupr(session)

def attach_remote(processname):
    # Attach to process on remote machine (with frida server) on IP 192.168.44.2
    # If not defined
    manager = frida.get_device_manager()
    device  = manager.add_remote_device("192.168.44.2")
    # If has been defined
    device  = frida.get_device("tcp@192.168.44.2")

    session = device.attach(processname)
    waitinterrupr(session)
	
def attach_device(processname):
    # Attach to device (with frida server)
    device  = frida.get_usb_device()
    session = device.attach(processname)
    waitinterrupr(session)

def attach_frontapp():
    # Attach to the front app (of mobile application)
    device  = frida.get_usb_device()
    session = device.get_frontmost_application()
    waitinterrupr(session)

def attach_lastdevice(processname):
    # Enumerate devices and attach the app on the last device
    manager = frida.get_device_manager()
    device  = manager.enumerate_devices()[-1]
    session = device.attach(processname)
    waitinterrupr(session)
	
def spawn_remote_default(appname):
    # Attach to process on remote machine (with frida server)
    device  = frida.get_remote_device()
    pid     = device.spawn([appname])
    session = device.attach(pid)
    device.resume(pid)
    waitinterrupr(session)

def spawn_remote(appname):
    # Attach to process on remote machine (with frida server) on IP 192.168.44.2
    # If not defined
    manager = frida.get_device_manager()
    device  = manager.add_remote_device("192.168.44.2")
    # If has been defined
    device  = frida.get_device("tcp@192.168.44.2")
    pid     = device.spawn([appname])
    session = device.attach(pid)
    device.resume(pid)
    waitinterrupr(session)
	
def spawn_device(appname):
    # Attach to device (with frida server)
    device  = frida.get_usb_device()
    pid     = device.spawn([appname])
    session = device.attach(pid)
    device.resume(pid)
    waitinterrupr(session)
	
def spawn_lastdevice(appname):
    # Enumerate devices and attach the app on the last device
    manager = frida.get_device_manager()
    device  = manager.enumerate_devices()[-1]
    pid     = frida.spawn([appname])
    session = device.attach(pid)
    device.resume(pid)
    waitinterrupr(session)
	
def main():
    #### Attach to existing process
    attach_remote("processname")
    attach_device("processname")
    attach_frontapp()
    attach_lastdevice("processname")
    
    #### Spawn process and attach to it
    spawn_remote("app")
    spawn_device("app")
    spawn_lastdevice("app")

if __name__ == '__main__':
    main()