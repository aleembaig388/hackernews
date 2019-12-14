const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() =>{
    createServer((req, res)=>{
    const parsedURL = parse(req.url);
    const {pathName, query} = parsedURL();
    if(pathName === '\a'){
        app.render(req, res, '\a', query);
    }
    else if(pathName == '\b'){
        app.render(req, res, '\b', query);
    }else{
        return handle(req, res);
    }
    }).listen(port, err => {
        if(err) throw err;
        console.log(`listing on PORT: ${port}`);
    });
});