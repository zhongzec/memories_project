import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function ShowStudent() {
  const classes = useStyles();

  const [agentList,setAgentList]= useState([]);

  const deleteAgent = (id) =>{
    console.log(id);
    const url = 'http://localhost:5000/agents/'+id;
    axios.delete(url)
    .then(()=>{
      window.location.reload(false);
    })
  }

  useEffect(()=>{
    axios.get('http://localhost:5000/agents')
    .then((allAgents)=>{
      console.log(allAgents.data);
      setAgentList(allAgents.data);
    })
  },[])

  return (
    <div>
    <h2>All Agents</h2>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Agent Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Agent ID</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agentList.map((agent,key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {agent.name}
              </TableCell>
              <TableCell align="right">{agent.email}</TableCell>
              <TableCell align="right">{agent.memberID}</TableCell>
              <TableCell align="right">{agent.gender}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" onClick={()=>{deleteAgent(agent._id)}}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
