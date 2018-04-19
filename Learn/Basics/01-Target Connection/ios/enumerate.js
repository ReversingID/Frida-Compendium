console.log("[*] Started: Enumeration");

if (ObjC.available)
{
    var classes = [];

    console.log("*** Start: Class name ***")
    for (var className in ObjC.classes)
    {
        if (ObjC.classes.hasOwnProperty(className))
        {
            classes.push(className);
            console.log(className);
        }
    }
    console.log("*** End: Class name\n");
    
    console.log("*** Start: Method name ***")
    for (var className in classes)
    {
        console.log("[+] Class: " + className);
        var methods = eval('ObjC.classes.' + className + '.$methods');
        for (var i = 0; i < methods.length; i++)
        {
            console.log("\t[-] Method: " + methods[i]);
        }
    }
    console.log("*** End: Method name\n");
} 
else 
{
    console.log("Objective-C Runtime is not available!");
}
console.log("[*] Completed: Enumeration")