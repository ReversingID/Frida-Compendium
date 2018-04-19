# Write to arbitrary memory
#
# Run: python write-mem.py
import frida
import sys 
import IPython

ADDRESS = 0x123456


def on_message(message, data):
    print(message)


def main():
    # Attach on running process
    session = frida.attach("target.exe")

    # Write some bytes at address
    # It should not violate memory access protection
    session.write_bytes(ADDRESS, b'12345')

    # Write some UTF-8 bytes at address
    # It should not violate memory access protection
    session.read_utf8(ADDRESS, "12345")

    IPython.embed()
    session.detach()
    sys.exit(0)


if __name__ == '__main__':
    main()