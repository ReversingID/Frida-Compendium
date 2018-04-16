Interceptor.attach(ptr("{ADDR}"), {
    onEnter: function(args) {
        console.log(args[0]);
    }
});