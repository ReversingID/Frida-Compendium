Java.perform(function()
{
    var currentApp = Java.use("android.app.ActivityThread").currentApplication();
    var context    = currentApplication.getApplicationContext();
    var pkgname    = context.getPackageName();
    var dexPath    = "{DEX_PATH}";
    var entryClass = "{ENTRY_CLASS}";

    Java.openClassFile(dexPath).load();
    console.log("inject " + dexPath + " to " + pkgName + " successfully!");
    Java.use(entryClass).{ENTRY_FUNC}("{ARGS}");
    console.log("Call entry successfully!");
});