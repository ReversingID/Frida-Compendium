# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Write to arbitrary memory
#
# Run: python mem-write.py
#
import frida
import binascii

TARGET_APP = "memfield32.exe"

def on_message(message, data):
    print(message)


def read_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def make_bytearray(strdata):
    return "[{}]".format(",".join([hex(d) for d in strdata[::-1].encode()]))


def main():
    # Attach on running process
    session = frida.attach(TARGET_APP)
    
    for addr in ["GLOBAL","STATIC","LOCAL"]:
        pattern = " ".join(["{:02x}".format(x) for x in addr.encode()])
        print("[*] === Scanning for '" + pattern + "' ===" )
        jscode = read_script("mem-scan.js")
        script = session.create_script(jscode % pattern)
        script.on("message", on_message)
        script.load()
        print("")


if __name__ == '__main__':
    main()