import {wasmBrowserInstantiate} from "../utils/instantiateWasm.js";

const go = new Go(); // Defined in wasm_exec.js. Don't forget to add this in your index.html.

const runWasm = async () => {
    // Get the importObject from the go instance.
    const importObject = go.importObject;

    // Instantiate our wasm module
    const wasmModule = await wasmBrowserInstantiate("./main.wasm", importObject);

    // Allow the wasm_exec go instance, bootstrap and execute our wasm module
    go.run(wasmModule.instance).then(r => console.log(r));

    // Call the Add function export from wasm, save the result
    const result = wasmModule.instance.exports.add(25, 24);

    console.log(result);
    console.log(wasmModule.instance.exports.ADD_CONSTANT); // Should return undefined
    console.log(wasmModule.instance.exports.addIntegerWithConstant); // Should return undefined
};

runWasm().then(r => console.log(r));