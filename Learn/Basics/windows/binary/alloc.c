/**
 * Allocate some block from memory
 * 
 * Compile:
 * 	$ gcc alloc.c -o alloc.exe
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct {
	int a;
	int b;
	char c[8];
} structure;

int main()
{
	printf("Prese anything to start allocation ... ");
	getchar();
	
	int* a = malloc(5*sizeof(int));
	int* b = malloc(10*sizeof(int));
	structure* c = malloc(2*sizeof(structure));
	
	return 0;
}