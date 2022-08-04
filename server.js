// const http = require('http');
import http from 'http'
import handleQuery from './requestHandler.js'

let reqformat = ['api_key','q','location']
const app = http.createServer((req,res)=>{ 
    // gathering query------------------------------------------------------------------------------
    let reqobj={}
    let qobj = new URLSearchParams(req.url)

    let i=0
    qobj.forEach((e)=>{
        reqobj[reqformat[i]]=e
        i++;
    })
    // --------------------------------------------------------------------------------------------------
    
    let callback =(s)=>{
        // let p = JSON.stringify(s)
        res.setHeader('Access-Control-Allow-Origin','*')
        res.setHeader('content-type','application/json')
        res.write(s)
        res.end()
    }



    handleQuery(reqobj,callback)




})

app.listen(4000,()=>{
    console.log("server listening at port 4000...............................")
})