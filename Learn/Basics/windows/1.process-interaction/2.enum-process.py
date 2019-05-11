# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Enumerate running process on the device
#
# Run: python enum-process.py
#
import frida

def on_message(message, data):
    print(message)


# Get list of process using python API
def enum_process(device, name_filter=None):
    processes = device.enumerate_processes()
    
    if name_filter is not None:
        processes = list(filter(lambda p: re.search("(?i){}".format(name_filter), p.name), processes))
    
    for process in processes:
        print("PID={} \tName={}".format(process.pid, process.name))
    
    return processes
        

def main():
    # Get device (see also attach.py)
    # device = frida.get_remote_device()
    device = frida.enumerate_devices()[0]    # get the first device

    # Get list of processes (all without filter)
    processes = enum_process(device)


if __name__ == '__main__':
    main()