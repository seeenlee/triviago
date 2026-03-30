import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAppBar() {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/profile')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
            Triviago
          </Typography>
          <AddIcon color="inherit" sx={{ width:"20%" }} onClick={() => navigate('/add')}/>
          {/* <Button color="inherit" onClick={event => navigate('/add')}>Add Question</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
