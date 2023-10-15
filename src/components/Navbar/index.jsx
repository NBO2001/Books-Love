import React, { Fragment } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

const Navbar = ({ children }) => {
    return (
        <Fragment>
            <AppBar position="static" color="primary" sx={{ bottom: 'auto', top: 0}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Typography variant="h6" color="inherit" component="div">
                    Books Love
                    </Typography>
                    
                </Toolbar>

            </AppBar>
            { children }
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    
                    <IconButton color="inherit">
                        <HomeIcon />
                    </IconButton>

                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>

                    <IconButton color="inherit">
                        <PersonIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

export default Navbar;