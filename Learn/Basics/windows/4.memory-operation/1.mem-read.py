# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Read from arbitrary memory address.
#
# Run: python mem-read.py
#
import frida

TARGET_APP = "memfield32.exe"

ADDRESSES = {
    "GLOBAL" : 0x403004,
    "STATIC" : 0x40301C,
    "LOCAL"  : 0x61FE98,
}

LENGTH = 24


def on_message(message, data):
    print(message)


def read_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 


def main():
    # Attach on running process
    session = frida.attach(TARGET_APP)

    # Iterate each address and read the data
    for i in ADDRESSES:
        print("[*] === Reading " + i + " ===")
        jscode = read_script("mem-read.js")
        script = session.create_script(jscode % (str(ADDRESSES[i]),LENGTH))
        script.on("message", on_message)
        script.load()
        print("=========================\n")


if __name__ == '__main__':
    main()