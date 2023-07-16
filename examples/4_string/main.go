package main

import (
	"syscall/js"
	"unsafe"
)

//go:export echo
func echo(ptr uintptr, length int) {
	msg := string((*[1 << 28]byte)(unsafe.Pointer(ptr))[:length:length])
	log(msg)
}

var buf [1024]byte

//go:export getBuffer
func getBuffer() *byte {
	return &buf[0]
}

func log(msg string) {
	js.Global().Get("outputText").Invoke(js.ValueOf(msg))
}

func main() {}
