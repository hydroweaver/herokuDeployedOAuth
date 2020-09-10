const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.set("view engine","ejs");

app.get('/', (req, res)=>{
    res.render("template", {data: {name: "Test Name", pic: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}});
}).listen(process.env.PORT || 8888);
