# Archive of Reversing.ID
# Frida Compendium - Windows Basic
#
# Processing threads
#
# Run: python threads.py
#
import frida
import sys

TARGET_APP = "dllfunc32.exe"
LIB_NAME   = "library32.dll"
FUNC_NAME  = "calculate"

def on_message(message, data):
    print(message)
        

def read_script(script_name):
    with open(script_name) as f:
        script = f.read() 
    return script 
        

def main():
    # Attach on running process
    session = frida.attach(TARGET_APP)

    # Instrumentation script 
    # Using Interceptor to attach to a function
    # Here we are inside a function
    jscode = read_script("threads.js"); 
    script = session.create_script(jscode % (LIB_NAME,FUNC_NAME))

    # Set a callback, when frida is sending a string, we print it out
    script.on('message', on_message)

    # Load the script
    script.load()

    # Delay
    # Execution is happened on other process so we need to make our script 
    # running all the way to the end
    input("[!] Press <Enter> at any time to detach from instrumented program.\n\n")
    session.detach()

if __name__ == '__main__':
    main()