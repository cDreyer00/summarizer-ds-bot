const {spawn} = require("child_process");
const wait = require("cdreyer-utilities");

async function summarize(text) {
    return new Promise(async (resolve, reject)=>{
        try{
            const modelFromPython = spawn('python', ['./src/aiModelAccess.py', text]);
            let d;
            
            modelFromPython.stdout.on("data", (data) => {
                d = data.toString();
            })
            
            while(!d){
                await wait(1);
                continue;
            }
            resolve(d);
        }catch(e){
            reject(e.message);
        }
    })
} 

module.exports = summarize