import express from 'express';
import {getAgents,createAgents,deleteAgents,updateAgents,paginateAgent,paginatedResults,searchAgents} from '../controllers/Agents.js'; //js is necessary
import agentMessage from '../models/agentModel.js';

// initialize an instant that will contain the routers
const router = express.Router();

//adding routes, / means the current directory
router.get('/',getAgents);
router.post('/',createAgents);
router.delete('/:id',deleteAgents);
router.patch('/:id',updateAgents);
router.get('/users',paginatedResults(agentMessage),paginateAgent)
router.get('/searchUsers',searchAgents)

export default router;