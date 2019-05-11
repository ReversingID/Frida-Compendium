/*
Compile:
	(x64)
	$ gcc -m64 -shared -o library.dll -Wl,--out-implib,liblibrary.a library.c

	(x86)
	$ gcc -m32 -shared -o library.dll -Wl,--out-implib,liblibrary.a library.c
*/

#include <windows.h>

/* Ekspor fungsi world() dengan __declspec(dllexport) */
__declspec(dllexport) 
void world()
{
	DWORD dwtemp = 62;
	TCHAR szname[64], szbuff[MAX_PATH+1];
	
	if (GetUserName(szname, &dwtemp))
		wsprintf(szbuff, "Halo %s, apa kabar?", szname);
	else
		lstrcpyn(szbuff, "Halo saudara! :D", 18);
	MessageBox(NULL, szbuff, TEXT("Title"), MB_OK | MB_ICONINFORMATION);
}

/* Ekspor fungsi calculate() dengan __declspec(dllexport) */
__declspec(dllexport)
int calculate(int n)
{
	return n + 135;
}

// Fungsi _DllMainCRTStartup digunakan untuk membuat DLL minimalis
// Alternatif: menggunakan DllMain()
BOOL WINAPI _DllMainCRTStartup(HINSTANCE hInst, DWORD dwReason, LPVOID lpReserved)
{
	return 1;
}