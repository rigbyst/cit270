const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const Redis = require('redis');

//import { createHash } from 'node:crypto'
const port = 3000;
const { createHash } = require('node:crypto');

const redisClient = Redis.createClient({url:'redis://127.0.0.1'});

const https = require('https')
const fs = require('fs')
//...

//https.createServer({
//  key: fs.readFileSync('server.key'),
//  cert: fs.readFileSync('server.cert')
//}, app).listen(3000, () => {
//  console.log('Listening...')
//});

//app.listen(port, ()=> {
//    redisClient.connect(); //api server is tring to connect with Redis
//    console.log("Listening on port: " + port);
    
//});
// https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/archive/brorigby.cit270.com/privkey1.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/archive/brorigby.cit270.com/cert1.pem'),
//   chain: fs.readFileSync('/etc/letsencrypt/archive/brorigby.cit270.com/chain1.pem')
  
// },
 app.listen(port, () => {
   redisClient.connect();
   console.log('Listening...')
 });



app.use(bodyParser.json()); //allow json (Javascript Object Notation)requests

app.get('/', (req, res) => {
    res.send("Welcome to your Node Server");

});

app.post('/login',async (req,res)=>{
        const loginBody = req.body;
        const userName = loginBody.userName;
        const password = loginBody.password; //we need to hash the password the user gave us.
        const hashedPassword = password==null? null : createHash('sha3-256').update(password).digest('hex');
        console.log("Hashed Password: "+hashedPassword);
        const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords',userName);
    
        console.log("Password for"+userName+" "+redisPassword);
        if ( password!=null && hashedPassword===redisPassword) {
            //This happens if password is correct.
            res.send("Welcome "+userName);
            res.status(401);

        }else{
            res.send("Incorrect Password");

        }
        
});