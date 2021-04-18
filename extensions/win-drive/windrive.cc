#include <node.h>
#include <Windows.h>
#include <math.h>
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
  __int64 val{0};
  if(GetDiskFreeSpaceExA(".", (PULARGE_INTEGER)&val, NULL, NULL) == FALSE){
      val=-1;
  }
  args.GetReturnValue().Set((int)round(val/100000));
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "windriveUser", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}