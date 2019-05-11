/**
 * Pass a struct as argument.
 * 
 * Compile:
 * 	$ gcc hi-struct.c -o hi-struct.exe
 */

#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>

struct memory_block
{
    uint32_t length;
    char     buffer[256];
    uint32_t count;
};

int f(struct memory_block * block)
{
	printf("[%d] String: %.*s\n", block->count, block->length, block->buffer);
    block->count ++;
	return 0;
}

int main(int argc, char *argv[])
{
    struct memory_block block;

    strcpy(block.buffer, "Testing!");
    block.length = strlen(block.buffer);
    block.count  = 0;
	
	printf("f() is at %p\n", f);
    printf("sizeof(memory_block) is %d\n", sizeof(struct memory_block));
	
	while (1)
	{
		f(&block);
		sleep(1);
	}
}