const go = new Go(); // Defined in wasm_exec.js.
const WASM_URL = 'main.wasm';

let importObject = go.importObject;

const initWasm = async () => {
    let response;
    if (!importObject) {
        importObject = {
            env: {
                abort: () => console.log("Abort!")
            }
        };
    }
    if (WebAssembly.instantiateStreaming) {
        response = await WebAssembly.instantiateStreaming(
            fetch(WASM_URL),
            importObject
        );
    } else {
        const fetchAndInstantiateTask = async () => {
            const wasmArrayBuffer = await fetch(WASM_URL).then(response =>
                response.arrayBuffer()
            );
            return WebAssembly.instantiate(wasmArrayBuffer, importObject);
        };
        response = await fetchAndInstantiateTask();
    }
    return response;
};

const wasmModule = await initWasm();
go.run(wasmModule.instance).then(r => console.log(r));

// Call the Add function export from wasm, save the result
const result = wasmModule.instance.exports.add(25, 24);

console.log(result);
console.log(wasmModule.instance.exports.ADD_CONSTANT); // Should return undefined
console.log(wasmModule.instance.exports.addIntegerWithConstant); // Should return undefined
