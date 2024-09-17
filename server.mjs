import {createServer} from 'node:http';
const PORT = 8000;

const myServer  = createServer((req,res)=>{

    const {url,method} = req;
    const baseUrl = `http://${req.headers.host}`;
    const myUrl = new URL(url,baseUrl);

    // Get method
    if(method === 'GET' && myUrl.pathname === '/api/items'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(JSON.stringify({message:'Get method ==> Fetching all items'}))
    }

})


myServer.listen(PORT,(req,res)=>{
    console.log(`Server is listening at PORT ${PORT}`)
})