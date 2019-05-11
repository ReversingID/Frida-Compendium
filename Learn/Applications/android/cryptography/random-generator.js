/*
Archive of Reversing.ID
Frida Compendium - Android Application

Trace the generation of random number.

*/
'use strict';

console.log("[*] Starting script");

setImmediate(function() {
	Java.perform(function() {
        var RandomClass = Java.use("java.util.Random");

		// int nextInt()
		RandomClass.nextInt.overload().implementation = function () {
			var intVal = this.nextInt();
			console.log("[*] Random.nextInt called: " + intVal + "\n");
			return intVal;
		};

		// int nextInt(int bound)
		RandomClass.nextInt.overload('int').implementation = function (limit) {
			var intVal = this.nextInt(limit);
			console.log("[*] Random.nextInt with bound: " + limit + " called: " + intVal + "\n");
			return intVal;
		};

		// double nextDouble()
		RandomClass.nextDouble.implementation = function () {
			var doubleVal = this.nextDouble();
			console.log("[*] Random.nextDouble called: " + doubleVal + "\n");
			return doubleVal;
		};

		// double nextGaussian()
		RandomClass.nextGaussian.implementation = function () {
			var doubleVal = this.nextGaussian();
			console.log("[*] Random.nextGaussian called: " + doubleVal + "\n");
			return doubleVal;
		};

		// boolean nextBoolean()
		RandomClass.nextBoolean.implementation = function () {
			var booleanVal = this.nextBoolean();
			console.log("[*] Random.nextBoolean called: " + booleanVal + "\n");
			return booleanVal;
		};

		// float nextFloat()
		RandomClass.nextFloat.implementation = function () {
			var floatVal = this.nextFloat();
			console.log("[*] Random.nextFloat called: " + floatVal + "\n");
			return floatVal;
		};

		// long nextLong()
		RandomClass.nextLong.implementation = function () {
			var longVal = this.nextLong();
			console.log("[*] Random.nextLong called: " + longVal + "\n");
			return longVal;
		};

	});
});
