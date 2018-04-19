# Various way to attach to a process.
#
# Run: python call.py
import frida
import sys


def waitinterrupt():
    try:
        while True:
            sys.stdin.read()
    except KeyboardInterrupt:
        session.close()
	

def attach_local(processname):
    # Attach to process on local machine
    session = frida.attach(processname)
    waitinterrupt()
		
def attach_remote_default(processname):
    # Attach to process on remote machine (with frida server)
    device  = frida.get_remote_device()
    session = device.attach(processname)
    waitinterrupt()

def attach_remote(processname):
    # Attach to process on remote machine (with frida server) on IP 192.168.44.2
    # If not defined
    manager = frida.get_device_manager()
    device  = manager.add_remote_device("192.168.44.2")
    # If has been defined
    device  = frida.get_device("tcp@192.168.44.2")

    session = device.attach(processname)
    waitinterrupt()
	
def spawn_local(appname):
    # spawn a process on local machine
    # Attach to process on local machine
    pid     = frida.spawn([appname])
    session = frida.attach(pid)
    frida.resume(pid)
    waitinterrupt()
	
def spawn_remote_default(appname):
    # Attach to process on remote machine (with frida server)
    device  = frida.get_remote_device()
    pid     = device.spawn([appname])
    session = device.attach(pid)
    device.resume(pid)
    waitinterrupt()

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
    waitinterrupt()
	
def main():
    #### Attach to existing process
	attach_local("processname")
    attach_remote("processname")
    
    #### Spawn process and attach to it
	spawn_local("app")
    spawn_remote("app")

if __name__ == '__main__':
    main()