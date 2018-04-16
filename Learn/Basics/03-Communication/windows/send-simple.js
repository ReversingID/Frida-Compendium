Interceptor.attach(ptr("%s"), {
    onEnter: function(args) {
        send(args[0].toInt32());
    }
});