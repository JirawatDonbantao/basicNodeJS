const express = require('express');
const app = express();
const port = 3000;
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')

app.arguments(morgan('combined'))
app.get("/",(req,res) =>{
    res.send('Hello YaoYao');
})

app.listen(port,()=>{
    debug("Listening on port" + chalk.red(" : "+port));
})