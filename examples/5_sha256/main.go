package main

import (
	"crypto/sha256"
	"encoding/hex"
	"syscall/js"
	"unsafe"
)

//go:export sha256Hash
func sha256Hash(ptr uintptr, length int) {
	data := string((*[1 << 28]byte)(unsafe.Pointer(ptr))[:length:length])
	h := sha256.New()
	h.Write([]byte(data))
	log(hex.EncodeToString(h.Sum(nil)))
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
