/*
Archive of Reversing.ID
Frida Compendium - iOS Application

Displaying alert
*/
'use strict';

if (ObjC.available)
{
    console.log("[*] Starting script");
    
    var UIAlertController   = ObjC.classes.UIAlertController;
    var UIAlertAction       = ObjC.classes.UIAlertAction;
    var UIApplication       = ObjC.classes.UIApplication;

    // Create new block of code which will handle the button click
    var handler = new ObjC.Block({
        retType: 'void',
        argTypes: ['object'],
        implementation: function () {}
    });

    ObjC.schedule(ObjC.mainQueue, function() {
        var alert = UIAlertController.alertControllerWithTitle_message_preferredStyle_("Frida", "Reversing.ID alert", 1);
        var default_action = UIAlertAction.actionWithTitle_style_handler_('OK', 0, handler);
        alert.addAction_(default_action);

        UIApplication.sharedApplication().keyWindow().rootViewController().presentViewController_animated_completion_(alert, true, NULL);
    });
}