# Enumerate the modules and exported functions of a process
#
# Run: python enum-modules.py
import frida

APP_PACKAGE = "XathryaApp"

def on_message(message, data):
    print(message)


def enum_modules(session, name_filter=None):
    modules = session.enumerate_modules()
    
    if name_filter is not None:
        modules = list(filter(lambda m: re.search("(?i){}".format(name_filter),  m.name), modules))
    
    for module in modules:
        print("Module name={}".format(module.name))
    
    return modules


def enum_exports(module, name_filter=None):
    exports = module.enumerate_exports()
    
    if name_filter is not None:
        exports = list(filter(lambda e: re.search("(?i){}".format(name_filter),  e.name), exports))
    
    for export in exports:
        print("RVA={} \tName={}".format(hex(export.relative_address), export.name))
    
    return exports
    

def main():
    # Attach on running process
    device  = frida.get_usb_device()    # get the first device
    session = device.attach(APP_PACKAGE)

    # Modules can be enumerated from the session, or from javascript
    modules = enum_modules(session)
    for module in modules:
        print('Module: %s' % (module.name))
        exports = enum_exports(module)


if __name__ == '__main__':
    main()