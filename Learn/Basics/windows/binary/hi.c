/**
 * Pass string to function and then print it
 * 
 * Compile:
 * 	$ gcc hi.c -o hi.exe
 */

#include <stdio.h>
#include <unistd.h>
#include <string.h>

int f(const char *s)
{
	printf("String: %s\n", s);
	return 0;
}

int main(int argc, char *argv[])
{
	char s[256];
	strcpy(s, "Testing!");
	
	printf("f() is at %p\n", f);
	printf("s is at %p\n", s);
	
	while (1)
	{
		f(s);
		sleep(1);
	}
}