const express = require('express');

app = express();

app.get('/', (req, res)=>{
    res.render("template", {data: {name: "Test Name", pic: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}});
}).listen(process.env.PORT || 8888);
