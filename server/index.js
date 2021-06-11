import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import agentsRoutes from './routes/agents.js';

const app = express();

app.use(cors());
//it means all the route in the students.js will start from /students

app.use(bodyParser.json({limit:"30mb",extended: true})); //你的jsondata不能超过30mb，extended让所有进bodyParser是string
app.use(bodyParser.urlencoded({limit:"30mb",extended: true})); //URL也是一样的
app.use(cors());
//一定要先parse然后再mapp到endpoint上，不然无法获取post
app.use('/agents',agentsRoutes);


//https://www.mongodb.com/cloud/atlas

const CONNECTION_URL = 'mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.nxad3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

//简单来说mongoose返回了一个promise
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,useUnifiedTopology:true
    })
    .then(()=> app.listen(PORT,()=>console.log('Server running on port:',PORT)))
    .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);

