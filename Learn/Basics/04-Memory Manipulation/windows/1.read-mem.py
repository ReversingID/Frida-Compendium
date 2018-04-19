# Read from arbitrary memory
#
# Run: python read-mem.py
import frida
import sys 
import IPython

ADDRESS = 0x123456
LENGTH  = 10


def on_message(message, data):
    print(message)


def main():
    # Attach on running process
    session = frida.attach("target.exe")

    # Read some bytes at address
    bytes_buffer = session.read_bytes(ADDRESS, LENGTH)

    # Read some UTF-8 bytes at address
    utf8_buffer  = session.read_utf8(ADDRESS, LENGTH)

    IPython.embed()
    session.detach()
    sys.exit(0)


if __name__ == '__main__':
    main()