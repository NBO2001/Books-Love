import React, { Fragment, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Navbar = ({ title, children }) => {
    const navigate = useNavigate();

    const profile = (e) => {
        e.preventDefault();
        navigate('/profile');
    }

    const search = (e) => {
        e.preventDefault();
        navigate('/search');
    }
    
    const [value, setValue] = useState(title);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            <AppBar position="static" color="primary" sx={{ bottom: 'auto', top: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" color="inherit" component="div">
                        Books Love
                    </Typography>
                </Toolbar>
            </AppBar>
            { children }
            
            {/* Bottom Navigation */}
            <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: '1px solid #ccc' }} value={value} onChange={handleChange}>
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} onClick={search} />
                <BottomNavigationAction label="Book Shelf" value="BookShelf" icon={<AutoStoriesIcon />} onClick={profile} />
            </BottomNavigation>
        </Fragment>
    );
};

export default Navbar;
