# WASM, Let's Go!

WebAssembly (abbreviated Wasm) is a safe, portable, low-level code format designed for efficient execution and compact
representation. Its main goal is to enable high performance applications on the Web, but it does not make any
Web-specific assumptions or provide Web-specific features, so it can be employed in other environments as well.

## Design Goals

Fast, safe, and portable semantics:

- __Fast__: executes with near native code performance, taking advantage of capabilities common to all contemporary
  hardware.
- __Safe__: code is validated and executes in a memory-safe, sandboxed environment preventing data corruption or
  security breaches.
- __Well-defined__: fully and precisely defines valid programs and their behavior in a way that is easy to reason about
  informally and formally.
- __Hardware-independent__: can be compiled on all modern architectures, desktop or mobile devices and embedded systems
  alike.
- __Language-independent__: does not privilege any particular language, programming model, or object model.
- __Platform-independent__: can be embedded in browsers, run as a stand-alone VM, or integrated in other environments.
- __Open__: programs can interoperate with their environment in a simple and universal manner.
- __Compact__: has a binary format that is fast to transmit by being smaller than typical text or native code formats.
- __Modular__: programs can be split up in smaller parts that can be transmitted cached and consumed separately.
- __Efficient__: can be decoded, validated, and compiled in a fast single pass, equally with either just-in-time (JIT)
  or ahead-of-time (AOT) compilation.
- __Streamable__: allows decoding, validation, and compilation to begin as soon as possible, before all data has been
  seen.
- __Parallelization__: allows decoding, validation, and compilation to be split into many independent parallel tasks.
- __Portable__: makes no architectural assumptions that are not broadly supported across modern hardware.

## Examples

Go to [examples](./examples) folder and run `./run.sh` with directory name to run an example.

For example:

```bash
./run.sh 1_hello_world
```

### 1. Hello World

Writing a simple `add` function and call it from JavaScript.

<div align="center">
    <img src="./assets/1_hello_world.png" alt="1. Hello World" style="width: 90%">
</div>

### 2. Export

Using JavaScript to call a functon exported from WASM.

<div align="center">
    <img src="./assets/2_export.png" alt="2. Export" style="width: 90%">
</div>

### 3. Linear Memory

Using byte (Unsigned 8-bit integer) buffers and pointers (Wasm memory array indexes) as a way to pass memory back and
forth.

1. Writing in WASM, reading in JavaScript.
2. Writing in JavaScript, reading in WASM.

<div align="center">
    <img src="./assets/3_linear_memory.png" alt="3. Linear Memory" style="width: 90%">
</div>

### 4. String Manipulation

Taking the input string from JavaScript, and logging the value from WASM.

<div align="center">
    <img src="./assets/4_string_manipulation.png" alt="4. String Manipulation" style="width: 90%">
</div>

### 5. SHA256

Taking the input string from JavaScript, and computing the SHA256 hash from WASM.

<div align="center">
    <img src="./assets/5_sha256.png" alt="5. SHA256" style="width: 90%">
</div>

## Useful Links

### WebAssembly

- [WebAssembly](https://webassembly.org/)
- [WebAssembly Specification](https://webassembly.github.io/spec/core/)
- [The Art of WebAssembly](https://learning.oreilly.com/library/view/the-art-of/9781098128982/)
- [WASM GitHub Organization](https://github.com/WebAssembly)
- [WebAssembly Guide](https://www.webassembly.guide/webassembly-guide/)
- [WASM by Example](https://wasmbyexample.dev/home.en-us.html)
- [Are We Wasm Yet ? - Part 1](https://elewis.dev/are-we-wasm-yet-part-1)
- [Are We Wasm Yet ? - Part 2](https://elewis.dev/are-we-wasm-yet-part-2)
- [Lin Clark: A Cartoon Intro to WebAssembly | JSConf EU](https://www.youtube.com/watch?v=HktWin_LPf4)
- [Rust - WebAssembly](https://www.rust-lang.org/what/wasm)
- [awesome-wasm](https://github.com/mbasso/awesome-wasm)
- [awesome-wasm-runtime](https://github.com/appcypher/awesome-wasm-runtimes)
- [Twiggy - a code size profiler for WASM](https://github.com/rustwasm/twiggy)
- [binaryen - optimizer and compiler/toolchain library for WebAssembly](https://github.com/WebAssembly/binaryen)

### Golang

- [The Go programming language](https://go.dev/)
- [TinyGo](https://tinygo.org/)
- [awesome-go](https://github.com/avelino/awesome-go)
- [effective-go](https://go.dev/doc/effective_go)
- [uber-go - The Uber Go Style Guide](https://github.com/uber-go/guide)
- [100 Go Mistakes and How to Avoid Them](https://learning.oreilly.com/library/view/100-go-mistakes/9781617299599/)