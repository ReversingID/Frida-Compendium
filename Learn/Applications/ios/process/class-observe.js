/*
Archive of Reversing.ID
Frida Compendium - iOS Application

Observe class, trace the function call inside.
*/
'use strict';

if (ObjC.available)
{
    console.log("[*] Starting script");

    function observe(name) {
        // Get reference to class by the classname 
        var k = ObjC.classes[name];

        // Enumerate all method and then hook each of them.
        k.$ownMethods.forEach(function(m) {
            var impl = k[m].implementation;

            console.log("Observing: " + name + " " + m);
            Interceptor.attach(impl, {
                onEnter: function(args) {
                    this.log = [];
                    this.log.push("(" + args[0] + "," + Memory.readUtf8String(args[1]) + ") " + name + " "  + m);
                    if (m.indexOf(":") !== -1) {
                        var params = m.split(":");
                        params[0] = params[0].split(" ")[1];
                        for (var i = 0; i < params.length -1; i++) {
                            try {
                                this.log.push(params[i] + ": " + new ObjC.Object(args[2 + i]).toString());
                            } catch (e) {
                                this.log.push(params[i] + ": " + args[2 + i].toString());
                            }
                        }
                    }

                    this.log.push(Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n"));
                },
                onLeave: function(retval) {

                }
            })
        });
    }

    // observe(classname);

}