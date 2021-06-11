import React from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';

import ShowAgent from './components/showStudent/showAgent';
import CreateAgent from './components/createStudent/createAgent';
import memories from './images/memories.png';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    //this Container and AppBar or Grod..., these are just React component already been created with Material UI
    return(
        <div className='App'>
            <Container maxidth = 'lg'>
                <AppBar className={classes.appBar} position = 'static' color = 'inherit'>
                    <Typography className={classes.heading} variant='h3' align = 'center'>Agent Managment Page</Typography>
                    <img src={memories} alt="memories" height="70"/>
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid container justify = "space-between" alignItems="stretch" spacing={3}>
                            <Grid item xs={12} sm={7}> 
                                <AppBar className={classes.appBar} position='static' color='inherit'>
                                    <ShowAgent/>
                                </AppBar>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <AppBar className={classes.appBar} position='static' color='inherit'>
                                    <CreateAgent/>
                                </AppBar>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </div>
    );
}

export default App;