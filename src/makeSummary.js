const { spawn } = require("child_process");
const wait = require("cdreyer-utilities");

async function makeSummary(text) {
    const modelFromPython = spawn('python', ['./src/aiModelAccess.py', text]);
    let d;

    modelFromPython.stdout.on("data", (data) => {
        d = data.toString();
    })

    while (!d) {
        await wait(1);
        continue;
    }
    return d;
}

module.exports = makeSummary;