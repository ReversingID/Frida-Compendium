/*
Archive of Reversing.ID
Frida Compendium - Android Application

Trace the invocation of cryptography related functions.

*/
'use strict';

console.log("[*] Starting script");

setImmediate(function() {
	Java.perform(function() {
		var KeyGeneratorClass       = Java.use("javax.crypto.KeyGenerator");
        var KeyPairGeneratorClass   = Java.use("java.security.KeyPairGenerator");
		var MessageDigestClass      = Java.use("java.security.MessageDigest");
        var SecretKeyFactoryClass   = Java.use("javax.crypto.SecretKeyFactory");
        var SignatureClass          = Java.use("java.security.Signature");
		var CipherClass             = Java.use("javax.crypto.Cipher");
		var MacClass                = Java.use("javax.crypto.Mac");

        // ------ KeyGenerator
		KeyGeneratorClass.generateKey.implementation = function () {
			console.log("[*] Generate symmetric key called. ");
			return this.generateKey();
		};

		KeyGeneratorClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] KeyGenerator.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		KeyGeneratorClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] KeyGenerator.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		KeyGeneratorClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] KeyGenerator.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};


        // ------ KeyPairGenerator
		KeyPairGeneratorClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] GetPairGenerator.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		KeyPairGeneratorClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] GetPairGenerator.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		KeyPairGeneratorClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] GetPairGenerator.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};


        // ------ MessageDigest
		MessageDigestClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] MessageDigest.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		MessageDigestClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] MessageDigest.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		MessageDigestClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] MessageDigest.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
        };


        // ------ SecretKeyFactory
		SecretKeyFactoryClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] SecretKeyFactory.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		SecretKeyFactoryClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] SecretKeyFactory.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		SecretKeyFactoryClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] SecretKeyFactory.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};


		// ------ Signature
		SignatureClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] Signature.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		SignatureClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] Signature.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		SignatureClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] Signature.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};


		// ------ Cipher
		CipherClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] Cipher.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		CipherClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] Cipher.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		CipherClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] Cipher.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};


        // ------ MAC
		MacClass.getInstance.overload('java.lang.String').implementation = function (algorithm) {
			console.log("[*] Mac.getInstance called with algorithm: " + algorithm + "\n");
			return this.getInstance(algorithm);
		};

		MacClass.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (algorithm, provider) {
			console.log("[*] Mac.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

		MacClass.getInstance.overload('java.lang.String', 'java.security.Provider').implementation = function (algorithm, provider) {
			console.log("[*] Mac.getInstance called with algorithm: " + algorithm + " and provider: " + provider + "\n");
			return this.getInstance(algorithm, provider);
		};

	});
});
