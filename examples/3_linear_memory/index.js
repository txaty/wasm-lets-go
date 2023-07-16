import {wasmBrowserInstantiate} from "../utils/instantiateWasm.js";

const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.

const runWasm = async () => {
    const importObject = go.importObject;

    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./main.wasm", importObject);

    // You have to run the go instance before doing anything else, or else println and things won't work
    go.run(wasmModule.instance).then(r => console.log(r));

    /**
     * Part one: Write in Wasm, Read in JS
     */
    console.log("Write in Wasm, Read in JS, Index 0:");
    // First, let's have wasm write to our buffer
    wasmModule.instance.exports.storeValueInWASMMemoryBufferIndexZero(24);

    // Next, let's create a Uint8Array of our wasm memory
    let wasmMemory = new Uint8Array(wasmModule.instance.exports.memory.buffer);

    // Then, let's get the pointer to our buffer that is within wasmMemory
    let bufferPointer = wasmModule.instance.exports.getWASMMemoryBufferPointer();

    // Then, let's read the written value at index zero of the buffer,
    // by accessing the index of wasmMemory[bufferPointer + bufferIndex]
    console.log(wasmMemory[bufferPointer + 0]); // Should log "24"

    /**
     * Part two: Write in JS, Read in Wasm
     */
    console.log("Write in JS, Read in Wasm, Index 1:");

    // First, let's write to index one of our buffer
    wasmMemory[bufferPointer + 1] = 15;

    // Then, let's have wasm read index one of the buffer,
    // and return the result
    console.log(
        wasmModule.instance.exports.readWASMMemoryBufferAndReturnIndexOne()
    ); // Should log "15"
};

runWasm().then(r => console.log(r));