const go = new Go()

const runButton = document.getElementById('run-button')
const input = document.getElementById('input')
const output = document.getElementById('output')
output.value = ''

let wasm

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
    output.value += text + '\n'
}

WebAssembly.instantiateStreaming(fetch('main.wasm'), go.importObject)
    .then(module => {
        wasm = module.instance
        runButton.disabled = false
        runButton.addEventListener('click', onRun(go, wasm))
    })