const {google} = require('googleapis');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

url = 'https://www.google.com';

const app = express();
app.use(cors({credentials: true, origin: true}));

// static serving wasted a lot of time with EJS, the ejs file image source should not be relative path like ../images/xyz, 
//rather that path to image since its being served by index.js which knows the correct folder for static content
// which is 'images' as noted below.
// app.use(express.static(__dirname + './images'));
app.use(express.static('images'));

app.use(express.json());
app.set("view engine","ejs");

app.get('/', (req, res)=>{
    res.render("indexTemplate", {oauthurl: url});
    // res.sendFile(__dirname + '/index.html');
}).listen(8000);