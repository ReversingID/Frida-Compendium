# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Various way to attach to a process.
#
# Run: python call.py
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

IP_ADDRESSS = "127.0.0.1"

def waitinterrupt():
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()
	

def attach_local(processname):
    print("[*] Attach to process on local machine")

    session = frida.attach(processname)
    waitinterrupt()
		
def attach_remote_default(processname):
    print("[*] Attach to process on remote machine (with frida-server up)")

    device  = frida.get_remote_device()
    session = device.attach(processname)
    waitinterrupt()

def attach_remote(processname):
    print("[*] Attach to process on remote machine on IP {}".format(IP_ADDR))

    # If not defined
    manager = frida.get_device_manager()
    device  = manager.add_remote_device(IP_ADDR)
    # If has been defined
    device  = frida.get_device("tcp@{}".format(IP_ADDR))

    session = device.attach(processname)
    waitinterrupt()
	
def spawn_local(appname):
    print("[*] spawn a process on local machine")

    # Attach to process on local machine
    pid     = frida.spawn([appname])
    session = frida.attach(pid)
    frida.resume(pid)
    waitinterrupt()
	
def spawn_remote_default(appname):
    print("[*] Spawn process on remote machine (with frida-server)")

    device  = frida.get_remote_device()
    pid     = device.spawn([appname])
    session = device.attach(pid)
    device.resume(pid)
    waitinterrupt()

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
    waitinterrupt()
	
def main():
    #### Spawn process and attach to it
	spawn_local("count.exe")
    spawn_remote("count.exe")

    #### Attach to existing process
	attach_local("count.exe")
    attach_remote("count.exe")

if __name__ == '__main__':
    main()