/*
Archive of Reversing.ID
Frida Compendium - Android

Starting Activity

Target: id.reversing.multiactivity
*/

'use strict';

var invoker = "id.reversing.multiactivity.LoginActivity";
var target  = "id.reversing.multiactivity.MainActivity";

Java.perform(function() {
    
    var TargetClass = Java.use(target);
    
    Java.choose(invoker, {
        onMatch: function(instance) {
            var context     = instance.getApplicationContext();
            var IntentClass = Java.use("android.content.Intent");
            var intent      = IntentClass.$new(context, TargetClass.class);

            // Set Action if necessary
            // intent.setAction("Reversing.ID");

            // Set some Extra
            intent.putExtra("email", "me@xathrya.id");

            // Start Activity
            instance.startActivity(intent);
        },
        onComplete: function() { }
    });
});
