# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Write to arbitrary memory
#
# Run: python mem-write.py
#
import frida

TARGET_APP = "memfield32.exe"

ADDRESSES = {
    "GLOBAL" : 0x403004,
    "STATIC" : 0x40301C,
    "LOCAL"  : 0x61FE98,
}


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
    
    for addr in ADDRESSES:
        print("[*] === Writing " + addr + " ===" )
        jscode = read_script("mem-write.js")
        script = session.create_script(jscode % (str(ADDRESSES[addr]),make_bytearray(addr)))
        script.on("message", on_message)
        script.load()
        print("")


if __name__ == '__main__':
    main()