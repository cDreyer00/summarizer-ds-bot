const makeSummary = require("./makeSummary")

async function summarize(text) {
    return new Promise(async (resolve, reject)=>{
        try{
            const res = await makeSummary(text);
            resolve(res);
        }catch(e){
            reject(e.message);
        }
    })
} 

module.exports = summarize