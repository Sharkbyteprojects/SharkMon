#include <node.h>
#include <math.h>
#if !defined(_WIN32) && ((defined(__unix__) || defined(__unix) || (defined(__APPLE__) && defined(__MACH__))))
#define linux 0x00
#include <sys/statvfs.h>
#else
#define windows 0x00
#include <Windows.h>
#endif
//IT'S NOT EXACT!
namespace wdrive {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  #if !defined(linux)&&defined(windows)
	__int64 val{0};
	if(GetDiskFreeSpaceExA(".", (PULARGE_INTEGER)&val, NULL, NULL) == FALSE){
		val=-1;
	}
	args.GetReturnValue().Set((int)round(val/100000));
  #else
	  struct statvfs sfs;
	  statvfs(".", &sfs);
      args.GetReturnValue().Set((int)round(((long long)(sfs.f_bsize * sfs.f_bfree))/100000));
  #endif
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "windriveUser", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}