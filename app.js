const express = require('express');// here all the const are the tools that we are going to use 
const fs = require('fs');
const math = require('./math');

const app = express();// this is to create our server app
app.use(express.json());// this is to allow the server to read incoming data

let users = [];

app.get('/',(req,res)=>{
    res.send('welcome to my Node.js app');// here is the message the users recieve when they want to go in home page  
});

app.get('/add',(req,res)=>{
   const result = math.add(5,3);
   res.send(`Result is : ${result}`);// when the user want to see the math output it routes to the math.js 
});

app.get('/file',(req,res) =>{
    const data = fs.readFileSync('data.txt','utf-8');// this is to get the info in the data.txt 
    res.send(data)
});

app.get('/create',(req,res) =>{
    fs.writeFileSync('new.txt','New File  created');// here it is to create a new file and write inside
    res.send('file created!');
});
app.post('/user',(req,res)=>{// here we receive the data --> server receives it
    const { name, age }= req.body;
// stored in memory, save to file 
    users.push({name,age});

    fs.writeFileSync('users.json',JSON.stringify(users,null,2));

    res.send(`User ${name} added🎉`)
});
app.get('/users',(req,res)=>{
    res.json(users);
});

app.listen(3000,()=>{
    console.log('server running on http://localhost:3000');// this tell the node start listening to the port of 3000

    });