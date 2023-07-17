#!/usr/bin/env bash

HOME_DIR=$(pwd)

tinygo build -o main.wasm -target wasm ./main.go
cp "$(tinygo env TINYGOROOT)"/targets/wasm_exec.js .

cd "../server" || exit
go run main.go -d "$HOME_DIR"
