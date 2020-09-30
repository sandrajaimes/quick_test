const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = require('./src/routers/index');
const app = express();

app.set('llave',"pormastesting2020");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

app.listen(3000,()=>{
    console.log('Server Start in port 3000')
});
