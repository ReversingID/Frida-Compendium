/*
Compile:
	(x64)
	$ g++ -m64 dllfunc.c -o dllfunc.exe -L. -llibrary
	
	(x86)
	$ g++ -m32 dllfunc.c -o dllfunc.exe -L. -llibrary
*/
#include <windows.h>
#include <stdio.h>

/*
Deklarasi semua fungsi yang akan diimpor.
Selain mendeklarasikan secara manual, prototipe fungsi dapat pula
dideklarasikan di sebuah file header.
*/
__declspec(dllimport) void world();
__declspec(dllimport) int  calculate(int n);

int main()
{
	int result;

	// Memanggil fungsi static world()
	world();

	// Memanggil calculate()
	result = calculate(0);
	printf("Hasil dari calculate(0) adalah %d\n", result);
	
	return 0;
}