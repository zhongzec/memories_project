import mongoose from 'mongoose';

//create a schema, mongoose, each post is going to have these properties
const agentSchema = mongoose.Schema({
    email: String,
    name: String,
    memberID: String,
    gender: String
});

//convert the schema to the model，operate database with the model (CURD)
const agentMessage = mongoose.model('agentMessage',agentSchema);

export default agentMessage;