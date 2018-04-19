Java.perform(function() {
    var OvLoad = Java.use("id.reversing.app.OverLoad");
    OvLoad.func.overloads.forEach(m => {
        m.implementation = function() {
            send("called ");
            m.apply(this, arguments);
        }
    });
});