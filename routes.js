const fs = require('fs');

const reqHandler = (req, res) =>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        console.log(req.url);
        console.log("only the url should be logged");   
        res.write('<html>');
        res.write('<head><title> Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        console.log("closing connection");
        return res.end();
    }
    // this block is not necesseraliy executed before the block after 
    // because it is call back
    if(url === '/message' && method === 'POST'){
        // listen to the specific event for the request
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            // chunk at this point is in hex
            body.push(chunk);
        });
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFile('message.txt', message, err => {
            //     res.statusCode = 302;   
            //     res.setHeader('Location', '/');
            // });
            fs.writeFileSync("./message.txt", message);
            res.statusCode = 302;   
            res.setHeader('Location', '/');
            return res.end();
        });
    }
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> My first Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    // tell Node that the thing is done
    res.end();
};

module.exports = reqHandler;