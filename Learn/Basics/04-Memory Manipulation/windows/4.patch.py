# Read arbitrary memory
#
# Run: python read-mem.py
import frida
import sys 
import IPython


def on_message(message, data):
    print(message)


def load_script(script_name):
    with open(script_name) as f:
        script = f.read()
    return script 


def main():
    # Attach on running process
    session = frida.attach("target.exe")

    # Read some bytes at address P
    bytes_buffer = session.read_bytes(0x123456, 10)

    # Read some UTF-8 bytes at address P
    utf8_buffer  = session.read_utf8(0x123456, 10)

    IPython.embed()
    session.detach()
    sys.exit(0)


if __name__ == '__main__':
    main()