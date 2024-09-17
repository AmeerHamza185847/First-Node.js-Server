import { createServer } from 'node:http';
const PORT = 3000;

const myServer = createServer((req, res) => {

    const { url, method } = req;
    const baseUrl = `http://${req.headers.host}`;
    const myUrl = new URL(url, baseUrl);

    // Get method
    if (method === 'GET' && myUrl.pathname === '/api/items') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Get request ==> Fetching all items' }))
    }
    else if ( method === 'POST' && myUrl.pathname === '/api/items/addItems') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const newItem = JSON.parse(body);
            console.log("New item =>", newItem);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Post request ===> ", Data: newItem }));
        });
    }
    else {
        res.writeHead(404,{'content-type':'application/json'})
        res.end({message:'404 NOT FOUND'})
    }

})


myServer.listen(PORT, (req, res) => {
    console.log(`Server is listening at PORT ${PORT}`)
})