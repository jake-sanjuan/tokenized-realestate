
const fetch = require("node-fetch");

var queryEndpoint = "https://api.thegraph.com/subgraphs/name/shashi278/tokenizer";

export var makeQuery = async (queryString)=>{
    try{
        let r = await fetch(queryEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(
                {
                    query: queryString
                })
            })
        
        return await r.json()
    }
    catch(e){
        return e;
    }  
}