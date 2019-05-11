/*
Archive of Reversing.ID 
Frida Compendium - Application

Trace the data flow in SQLite database

*/
'use strict';

setTimeout(function(){
    console.log("[*] Starting script");

    Java.perform(function () {
		var SqliteDbClass = Java.use("android.database.sqlite.SQLiteDatabase");
		
		var OverloadFunc;

        // --------- Execute Query ---------
        // execSQL(String sql)
        OverloadFunc = SqliteDbClass.execSQL.overload('java.lang.String');
        OverloadFunc.implementation = function(query) {
            console.log("[*] SQLiteDatabase.exeqSQL called with query: " + query + "\n");
            return this.execSQL(query);
        };

        // execSqL(String, sql, Obj[] bindArgs)
        OverloadFunc = SqliteDbClass.execSQL.overload('java.lang.String', '[Ljava.lang.Object;');
        OverloadFunc.implementation = function(query, args) {
            console.log("[*] SQLiteDatabase.exeqSQL called with query: " + query +  " and arguments: " + args + "\n");
            return this.execSQL(query, args);
        };

        // query(boolean distinct, String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit)
		OverloadFunc = SqliteDbClass.query.overload('boolean', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4, var5, var6, var7, var8) {
            var methodVal = "[*] SQLiteDatabase.query called.";
            var logVal = "Table: " + var1 + ", selection value: " + var3 + ", selectionArgs: " + var4 + " distinct: " + var0;
            console.log(methodVal + " " + logVal + "\n");
            return this.query(var0, var1, var2, var3, var4, var5, var6, var7, var8);
        };

		// query(String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit)
		OverloadFunc = SqliteDbClass.query.overload('java.lang.String', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4, var5, var6, var7) {
            var methodVal = "[*] SQLiteDatabase.query called.";
            var logVal = "Table: " + var0 + ", selection value: " + var2 + ", selectionArgs: " + var3;
            console.log(methodVal + " " + logVal + "\n");
            return this.query(var0, var1, var2, var3, var4, var5, var6, var7);
        };

		// query(boolean distinct, String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit, CancellationSignal cancellationSignal)
		OverloadFunc = SqliteDbClass.query.overload('boolean', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'android.os.CancellationSignal');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4, var5, var6, var7, var8, var9) {
            var methodVal = "[*] SQLiteDatabase.query called.";
            var logVal = "Table: " + var1 + ", selection value: " + var3 + ", selectionArgs: " + var4;
            console.log(methodVal + " " + logVal + "\n");
            return this.query(var0, var1, var2, var3, var4, var5, var6, var7, var8, var9);
        };

		// query(String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy)
		OverloadFunc = SqliteDbClass.query.overload('java.lang.String', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'java.lang.String', 'java.lang.String');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4, var5, var6) {
            var methodVal = "[*] SQLiteDatabase.query called.";
            var logVal = "Table: " + var0 + ", selection value: " + var2 + ", selectionArgs: " + var3;
            console.log(methodVal + " " + logVal + "\n");
            return this.query(var0, var1, var2, var3, var4, var5, var6);
        };

		// queryWithFactory(SQLiteDatabase.CursorFactory cursorFactory, boolean distinct, String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit, CancellationSignal cancellationSignal)
		OverloadFunc = SqliteDbClass.queryWithFactory.overload('android.database.sqlite.SQLiteDatabase$CursorFactory', 'boolean', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4, var5, var6, var7, var8, var9) {
            var methodVal = "[*] SQLiteDatabase.queryWithFactory called.";
            var logVal = "Table: " + var2 + ", selection value: " + var4 + ", selectionArgs: " + var5 + " distinct: " + var1;
            console.log(methodVal + " " + logVal + "\n");
            return this.queryWithFactory(var0, var1, var2, var3, var4, var5, var6, var7, var8, var9);
        };           

		// queryWithFactory(SQLiteDatabase.CursorFactory cursorFactory, boolean distinct, String table, String[] columns, String selection, String[] selectionArgs, String groupBy, String having, String orderBy, String limit)
		OverloadFunc = SqliteDbClass.queryWithFactory.overload('android.database.sqlite.SQLiteDatabase$CursorFactory', 'boolean', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'android.os.CancellationSignal');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4, var5, var6, var7, var8, var9, var10) {
            var methodVal = "[*] SQLiteDatabase.queryWithFactory called.";
            var logVal = "Table: " + var2 + ", selection value: " + var4 + ", selectionArgs: " + var5 + " distinct: " + var1;
            console.log(methodVal + " " + logVal + "\n");
            return this.queryWithFactory(var0, var1, var2, var3, var4, var5, var6, var7, var8, var9, var10);
        }; 

        // rawQuery(String sql, String[] selectionArgs) 
        OverloadFunc = SqliteDbClass.rawQuery.overload('java.lang.String', '[Ljava.lang.String;');
        OverloadFunc.implementation = function(var0, var1) {
            console.log("[*] SQLiteDatabase.rawQuery called with query: " + var0 + " and contentValues: " + var1 +"\n");
            return this.rawQuery(var0, var1);
        };

        // rawQuery(String sql, String[] selectionArgs, CancellationSignal cancellationSignal)
        OverloadFunc = SqliteDbClass.rawQuery.overload('java.lang.String', '[Ljava.lang.String;', 'android.os.CancellationSignal');
        OverloadFunc.implementation = function(var0, var1, var2) {
            console.log("[*] SQLiteDatabase.rawQuery called with query: " + var0 + " and contentValues: " + var1 +"\n");
            return this.rawQuery(var0, var1, var2);
        };

        // rawQueryWithFactory(SQLiteDatabase.CursorFactory cursorFactory, String sql, String[] selectionArgs, String editTable, CancellationSignal cancellationSignal)
		OverloadFunc = SqliteDbClass.rawQueryWithFactory.overload('android.database.sqlite.SQLiteDatabase$CursorFactory', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String', 'android.os.CancellationSignal');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4) {
            console.log("[*] SQLiteDatabase.rawQueryWithFactory called with query: " + var1 + " and contentValues: " + var2 + "\n");
            return this.rawQueryWithFactory(var0, var1, var2, var3, var4);
        };

		// rawQueryWithFactory(SQLiteDatabase.CursorFactory cursorFactory, String sql, String[] selectionArgs, String editTable)
		OverloadFunc = SqliteDbClass.rawQueryWithFactory.overload('android.database.sqlite.SQLiteDatabase$CursorFactory', 'java.lang.String', '[Ljava.lang.String;', 'java.lang.String');
        OverloadFunc.implementation = function(var0, var1, var2, var3) {
            console.log("[*] SQLiteDatabase.rawQueryWithFactory2 called with query: " + var1 + " and contentValues: " + var2 +"\n");
            return this.rawQueryWithFactory(var0, var1, var2, var3);
        };
        

        // --------- Insert Values ---------

        // insert(String table, String nullColumnHack, ContentValues values)
        OverloadFunc = SqliteDbClass.insert.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues');
        OverloadFunc.implementation = function(var0, var1, var2) {
            console.log("[*] SQLiteDatabase.insert called. Adding new value: " + var2 + " to database: " + var0 + "\n");
            return this.insert(var0, var1, var2);
        };

        // insertOrThrow(String table, String nullColumnHack, ContentValues values)
        OverloadFunc = SqliteDbClass.insertOrThrow.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues');
        OverloadFunc.implementation = function(var0, var1, var2) {
            console.log("[*] SQLiteDatabase.insertOrThrow called. Adding new value: " + var2 + " to database: " + var0 + "\n");
            return this.insertOrThrow(var0, var1, var2);
        };

        // insertOrThrow(String table, String nullColumnHack, ContentValues values)
        OverloadFunc = SqliteDbClass.insertOrThrow.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues');
        OverloadFunc.implementation = function(var0, var1, var2) {
            console.log("[*] SQLiteDatabase.insertOrThrow called. Adding new value: " + var2 + " to database: " + var0 + "\n");
            return this.insertOrThrow(var0, var1, var2);
        };

        // insertWithOnConflict(String table, String nullColumnHack, ContentValues initialValues, int conflictAlgorithm)
        OverloadFunc = SqliteDbClass.insertWithOnConflict.overload('java.lang.String', 'java.lang.String', 'android.content.ContentValues', 'int');
        OverloadFunc.implementation = function(var0, var1, var2, var3) {
            console.log("[*] SQLiteDatabase.insertWithOnConflict called. Adding new value: " + var2 + " to database: " + var0 + " and conflictAlgorithm: " + var3 + "\n");
            return this.insertWithOnConflict(var0, var1, var2, var3);
        };
        

        // --------- Update Values ---------

        // update(String table, ContentValues values, String whereClause, String[] whereArgs)
        OverloadFunc = SqliteDbClass.update.overload('java.lang.String', 'android.content.ContentValues', 'java.lang.String', '[Ljava.lang.String;');
        OverloadFunc.implementation = function(var0, var1, var2, var3) {
            var methodVal = "[*] SQLiteDatabase.update called.";
            var logVal = "Update table: " + var0 + " with where clause: "  + var2 + " whereArgs:" + var3 + " and values to update: " + var1 +"\n";
            console.log(methodVal, logVal);
            
            return this.update(var0, var1, var2, var3);
        };

        // updateWithOnConflict(String table, ContentValues values, String whereClause, String[] whereArgs, int conflictAlgorithm) 
        OverloadFunc = SqliteDbClass.updateWithOnConflict.overload('java.lang.String', 'android.content.ContentValues', 'java.lang.String', '[Ljava.lang.String;', 'int');
        OverloadFunc.implementation = function(var0, var1, var2, var3, var4) {
            var methodVal = "[*] SQLiteDatabase.updateWithOnConflict called.";
            var logVal = "Update table: " + var0 + " with where clause: "  + var2 + " whereArgs:" + var3 + " values to update: " + var1 + " and conflictAlgorithm: " + var4 +"\n";
            console.log(methodVal, logVal);
            
            return this.updateWithOnConflict(var0, var1, var2, var3, var4);
        };
    });
},0);