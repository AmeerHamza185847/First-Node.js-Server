import { createServer } from 'node:http';
import { json } from 'stream/consumers';
const PORT = 3000;

const myServer = createServer((req, res) => {

    const { url, method } = req;
    const baseUrl = `http://${req.headers.host}`;
    const myUrl = new URL(url, baseUrl);

    // Get Request
    if (method === 'GET' && myUrl.pathname === '/api/items') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Get request ==> Fetching all items' }))
    }
    // POST Request
    else if (method === 'POST' && myUrl.pathname === '/api/items/addItems') {
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
    // PUT request
    else if (method === "PUT" && myUrl.pathname.startsWith('/api/items/')) {
        let body = '';
        const itemId = myUrl.pathname.split('/').pop();
        console.log("itemId :", itemId);

        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const updatedItem = JSON.parse(body);
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify({ message: 'PUT request ==>', Data: updatedItem }))
        })

    }

    else {
        res.writeHead(404, { 'content-type': 'application/json' })
        res.end({ message: '404 NOT FOUND' })
    }

})


myServer.listen(PORT, (req, res) => {
    console.log(`Server is listening at PORT ${PORT}`)
})