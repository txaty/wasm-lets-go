package main

func main() {}

//export add
func add(x, y int) int {
	return addIntegerWithConstant(x, y)
}

var AddConstant = 24

func addIntegerWithConstant(x, y int) int {
	return x + y + AddConstant
}
