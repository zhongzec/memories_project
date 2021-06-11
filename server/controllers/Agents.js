import dotenv from 'dotenv';
dotenv.config();

import agentMessage from '../models/agentModel.js';
import sgMail from '@sendgrid/mail';

console.log('process.env.SENDGRID_API_KEY = ', process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// use studentMessage(model) to handle the GET and POST request
// each await has to be in the async function
// Because this student.js is imported in the index.js, so the express is not needed
// to be imported because it is imported in index.js
export const getAgents = async(req,res) => {
  try{
      const agentMessages = await agentMessage.find();
      // One good thing about MERN stack is that all the data format is in JSON
      res.status(200).json(agentMessages);
    }catch(error){
      res.status(404).json({message:error.message});
    }
  }

export const createAgents = async(req,res)=> {
  // get the request body
  //console.log('the result is',req.body)
  await agentMessage.find({email:req.body.email})
  .exec()
  .then(async function(user){
    console.log('the current user is',user)
    if(user.length>=1){
      //console.log("the email already exist")
      return res.status(409).json({
        message:"the email already exist"
      })
    }else{
  const agentPost = req.body;
  //console.log('agent post is',agentPost)
  const {email,name,memberID,gender} = agentPost;
  const newPost = new agentMessage(agentPost);

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject:'Successfully Created With Your Email',
    html:`
      <p>Dear ${name}</p>
      </br>
      <p>Your member id is ${memberID}. Hope you enjoy our web services.</p>
      </br>
      <p>Best,</p>
      </br>
      <p>Antai Global Inc</p>
    `
  }

  try{
    const result = await newPost.save();
    console.log('save result', result);

    const sent = await sgMail.send(emailData);
    console.log('email has been sent', sent);

    return res.status(200).json({
      message:'Email has been sent to the agent for the corresponding account'
    });
  }catch(error){
    console.error('caught error: ', error, error.response.body);
    res.status(409).json({message:error.message});
  }
    }
  })
  
}

export const deleteAgents = async(req,res)=> {
  // get the request body
  const id = req.params.id;
  try{
    await agentMessage.findByIdAndRemove(id).exec();
    res.send('Successfully Deleted');
  }catch(error){
    console.log(error);
  }
}

export const updateAgents = async(req,res)=> {
  // get the request body
  const id = req.params.id;
  const updates = req.body;
  const options = {new:true};
  try{
    const result = await agentMessage.findByIdAndUpdate(id,updates,options);
    res.send(result);
  }catch(error){
    console.log(error.message);
  }
}

//Define escapeRegex function for search feature
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const searchAgents = async(req,res)=>{
  if(req.query.username){
    console.log(req.query.username)
    const regex = new RegExp(escapeRegex(req.query.username),'gi');
    const users = await agentMessage.find({name: regex});
    const data =[]
    if(users){
      users.map(user=>{
        data.push(user)
      })
    }
    return res.status(200).json({data})
  }else{
    const users = await agentMessage.find({})
    const data=[]
    if(users){
      users.map(user => {
        data.push(user)
      })
    }
    return res.status(200).json({data}) 
  }
}

export const paginateAgent = (req,res)=>{
  res.json(res.paginatedResults);

}

export function paginatedResults(model){
  return async(req,res,next)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    //console.log('page is',page)
    //console.log('limit is',limit)
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
  
    const results = {};
  
    if(endIndex<await model.countDocuments().exec()){
      results.next={
      page:page+1,
      limit:limit
      }
    }
  
    if(startIndex>0){
      results.pervious={
        page:page-1,
        limit:limit
      }
    }

    try{
      results.results=await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      console.log(res.paginatedResults);
      next();
    }catch(e){
      res.status(500).json({message:e.message})
    }
    
  }
}



