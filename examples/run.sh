#!/usr/bin/env bash

CURR_DIR=$(pwd)
HOME_DIR=$1 || "1_hello_world"

cd "$HOME_DIR" || exit
tinygo build -o main.wasm -target wasm ./main.go
cp "$(tinygo env TINYGOROOT)"/targets/wasm_exec.js .

cd "$CURR_DIR/server" || exit
go run main.go -d ../"$HOME_DIR"