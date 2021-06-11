import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

//In Rreact function, the first letter assignment has to be uppercase!
export default function CreateStudent() {
  const classes = useStyles();

  const [agent, setAgent] = useState({
      email:'',
      name:'',
      memberID:'',
      gender:''
  });

  const createButtonCallback = (event) => {
      event.preventDefault()
      axios.post('http://localhost:5000/agents',agent)
      .then(res=>{
        console.log(res);
        //window.location.reload(false);
      })
      .catch(error=>{
        console.log(error.response);
      }
      )
  };

  return (
    <div>
    <h2>Create Student</h2>
    <form className={classes.root} noValidate autoComplete="off">
    <TextField id="outlined-basic" label="Email Address" variant="outlined" value= {agent.email} onChange={(event) => setAgent({...agent,email: event.target.value})}/>
    <TextField id="outlined-basic" label="Agent Name" variant="outlined" value= {agent.name} onChange={(event) => setAgent({...agent,name: event.target.value})}/>
    <TextField id="outlined-basic" label="Agent ID" variant="outlined" value= {agent.memberID} onChange={(event) => setAgent({...agent,memberID: event.target.value})}/>
    <TextField id="outlined-basic" label="gender" variant="outlined" value= {agent.gender} onChange={(event) => setAgent({...agent,gender: event.target.value})}/>
    <Button variant="contained" color="primary" onClick={createButtonCallback}>CREAT</Button>
    </form>
    </div>
  );
}
