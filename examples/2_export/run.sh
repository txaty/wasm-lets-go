#!/usr/bin/env bash

tinygo build -o main.wasm -target wasm ./main.go
cp "$(tinygo env TINYGOROOT)"/targets/wasm_exec.js .
http-server -p 8080