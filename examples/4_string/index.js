const runButton = document.getElementById('run-button');
const input = document.getElementById('input');
const output = document.getElementById('output');
output.value = '';


// Given the text and a module, insert the string into its memory.
function insertText(text, module) {
    // Get the address of the writable memory.
    let addr = module.exports.getBuffer()
    let buf = module.exports.memory.buffer
    let mem = new Int8Array(buf)
    let view = mem.subarray(addr, addr + text.length + 1)
    for (let i = 0; i < text.length; i++) {
        view[i] = text.charCodeAt(i)
    }
    view[text.length] = 0 // null termination
    // Return the address we started at.
    return addr
}

// Function that returns the actual function we want to attach to the "Run" button
function onRun(runner, module) {
    return () => {
        // First, need to run the module in order to define everything.
        runner.run(module)

        let inputText = input.value
        let addr = insertText(inputText, module)

        // Now just pass the memory location to the relevant function.
        module.exports.echo(addr, inputText.length)
    }
}

window.outputText = (text) => {
    output.value += text + '\n';
}

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

(async () => {
    const wasmModule = await initWasm();
    go.run(wasmModule.instance).then(r => console.log(r));
    runButton.disabled = false
    runButton.addEventListener('click', onRun(go, wasmModule.instance))
})();