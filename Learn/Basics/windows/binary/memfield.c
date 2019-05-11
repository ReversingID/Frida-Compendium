/**
 * Playground for read/write data
 * 
 * Compile:
 * 	$ gcc memfield.c -o memfield.exe
 */

#include <stdio.h>
#include <string.h>

char global_data[24] = "GLOBAL";

int main()
{
    static char static_data[24] = "STATIC";
    char local_data[24] = "LOCAL";

    do 
    {
        printf("Global: %p | Static: %p | Local: %p\n", global_data, static_data, local_data);
        printf("    [%p] %s\n", global_data, global_data);
        printf("    [%p] %s\n", static_data, static_data);
        printf("    [%p] %s\n", local_data, local_data);
        printf("Press [Enter] to see the update\n\n");

        getchar();
    } while (1);


}