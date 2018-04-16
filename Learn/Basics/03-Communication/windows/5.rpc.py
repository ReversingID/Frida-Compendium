# Create and RPC endpoint which can be used in host and executed by the frida
#
# Run: python rpc.py 
import frida
import sys


def load_script(script_name):
    with open(script_name) as f:
        script = f.read()
    return script 


def main():
    # Attach on running process
    session = frida.attach("target.exe")

    # Instrumentation script 
    jscode = load_script("rpc.js")
    script = session.create_script(jscode)

    # Load the script
    script.load()

    # Use exported RPC
    api    = script.exports
    result = api.disassemble("0x4015B0")
    print(result)

    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    try:
        while True:
            sys.stdin.read()
    except KeyboardInterrupt:
        session.detach()
        sys.exit(0)


if __name__ == '__main__':
    main()

    