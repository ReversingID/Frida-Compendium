Interceptor.attach(ptr("%s"), {
    onEnter: function(args) {
        send(args[0].toInt32());
        var op = recv('input', function(value) {
            args[0] = ptr(value.payload);
        });
        op.wait();
    }
});