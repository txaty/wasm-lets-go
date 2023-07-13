package main

const BufferSize = 2

var buffer [BufferSize]uint8

func main() {}

//export getWASMMemoryBufferPointer
func getWASMMemoryBufferPointer() *[BufferSize]uint8 {
	return &buffer
}

//go:export storeValueInWASMMemoryBufferIndexZero
func storeValueInWASMMemoryBufferIndexZero(value uint8) {
	buffer[0] = value
}

//go:export readWASMMemoryBufferAndReturnIndexOne
func readWASMMemoryBufferAndReturnIndexOne() uint8 {
	return buffer[1]
}
