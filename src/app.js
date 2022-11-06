const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const fs = require('fs');
const http = require('http');
const https = require('https');

/*const httpsServerOptions = {
    key:  fs.readFileSync(""),
    cert: fs.readFileSync("")
};*/

const app = express()
/*const server = http.createServer(app);
server.listen('80','');

const serverHttps = https.createServer(httpsServerOptions, app);
serverHttps.listen('','');

app.use((req, res, next) => {
    if (req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`);
});*/


//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(cors())


//Routes API
app.use(require('./routes/indexRoute'))


app.get('/', (req, res) => {
    res.send('API Sistema Control de Tareas')
})


app.listen(3000, () => {
    console.log('Server on port 3000')
})