/**
 * Counting number from 0
 * 
 * Compile:
 * 	$ gcc count.c -o count.exe
 */

#include <stdio.h>
#include <unistd.h>

int f(int n)
{
	printf("Argument: %d\n", n);
	return n;
}

int main()
{
	int i = 0;
	printf("f() is at %p\n", f);
	
	while (1)
	{
		printf("Retval: %d\n", f(i++));
		sleep(1);
	}
}
