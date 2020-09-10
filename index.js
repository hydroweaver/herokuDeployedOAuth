const express = require('express');

app = express();

app.get('/', (req, res)=>{
    res.send('Hello Heroku!');
}).listen(8080);