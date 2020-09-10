
const express = require('express');
const cors = require('cors');

const app = express();
// app.use(cors({credentials: true, origin: true}));
// app.use(express.json());

app.get('/', async (req, res)=>{
    // code = req.query.code;
    // console.log(code);
    // res.send('Authorized');
    res.sendFile(__dirname + '/index.html');
}).listen(8000);

// app.post('/', (req, res)=>{
//     console.log(req.options);
//     console.log(req.body);
//     res.send({message:'Received'});
// });

// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
