Interceptor.attach(ptr("{ARG}"), {
    onEnter: function(args) {
        args[0] = ptr("1337");
    }
});