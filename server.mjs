import {createServer} from 'node:http';
const PORT = 8000;

const myServer  = createServer((req,res)=>{

    const {url,method} = req;
    const baseUrl = `http://${req.headers.host}`;

})


myServer.listen(PORT,(req,res)=>{
    console.log(`Server is listening at PORT ${PORT}`)
})