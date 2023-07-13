#!/usr/bin/env bash

tinygo build -o main.wasm -target wasm ./main.go
cp "$(tinygo env TINYGOROOT)"/targets/wasm_exec.js .
if ! live-server; then
  npm install -g live-server
fi