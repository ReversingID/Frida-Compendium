Java.perform(function() {
    var OvLoad = Java.use("id.reversing.app.OverLoad");
    OvLoad.func.overload("java.lang.String").implementation = function(a) {
        send("called with argument " + a.toString());
        this.func.overload("java.lang.String").call(this, "ReversingID");
    }
});