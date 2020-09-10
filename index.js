const {google} = require('googleapis');
const express = require('express');
const cors = require('cors');

var apiKey;
var clientID;
var clientSecret;
let code = '';

const oauth2Client = new google.auth.OAuth2(
    clientID,
    clientSecret,
    'https://afternoon-tor-58445.herokuapp.com/oauthcallback'
  );

const youtube = google.youtube({
    version: 'v3',
    //auth needs to change to oauth2Client when you need to Oauth to work, not APIKEY
    auth: oauth2Client,
  });

  const scopes = [
    'https://www.googleapis.com/auth/youtube.readonly',
  ];

let publicChannelCall = {
    "part" : "snippet,contentDetails",
    "forUsername" : "GoogleDevelopers"
};

let authUserChannelCall = {
    "part" : "snippet,contentDetails",
    "mine" : "true"
};

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.set("view engine","ejs");

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
    // res.send('Welcome to the app, this is a GET / response');
});

app.get('/oauthcallback', async (req, res)=>{
    code = req.query.code;
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    youtube.channels.list(authUserChannelCall, (err, response)=>{
        if(err){
            console.log('some error occurred');
        }
        res.redirect('/dat?'+ 'title=' + response.data.items[0].snippet.title + '&'+  'img=' + response.data.items[0].snippet.thumbnails.medium.url);
        oauth2Client.revokeCredentials(()=>{});
    });
});

app.get('/dat', (req, res)=>{
    res.render("template", {data: {name: req.query.title, pic: req.query.img}});
}).listen(process.env.PORT || 8888);

app.post('/', (req, res)=>{
    oauth2Client.apiKey = req.body.key;
    oauth2Client._clientId = req.body.id;
    oauth2Client._clientSecret = req.body.secret;

    const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
    res.send(url);
});
