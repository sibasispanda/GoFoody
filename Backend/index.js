const express = require('express');
const app = express()
const port = 5000
const mongoDB = require('./db')
const cors=require("cors");
mongoDB();


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// for blocked cors error
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","https://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type,Accept"
//     );
//     next();
// })

app.use(express.json())
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));
app.use('/api',require('./Routes/GetLocation'));
app.get('/',(req,res)=>{
    res.send('hello world!')
})
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})