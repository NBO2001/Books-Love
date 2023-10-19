import React, { Fragment, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const NavSearch = ({ title, children }) => {
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
            <AppBar position="fixed" color="primary" sx={{ top: 0 }}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Book"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="filters">
                    <MenuIcon />
                </IconButton>
                </Paper>
            </AppBar>

            <div style={{ paddingTop: '64px' }}>
                {children}
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: '1px solid #ccc' }} value={value} onChange={handleChange}>
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} onClick={search} />
                <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} onClick={profile} />
            </BottomNavigation>
        </Fragment>
    );
};

export default NavSearch;
