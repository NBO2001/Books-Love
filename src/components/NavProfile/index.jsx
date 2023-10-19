import React, { Fragment, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

const NavProfile = ({ title, list, toggleDrawer, menu, children }) => {

    const navigate = useNavigate();

    const [value, setValue] = useState(title);

    const profile = (e) => {
        e.preventDefault();
        navigate('/profile');
    }

    const search = (e) => {
        e.preventDefault();
        navigate('/search');
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Fragment>
            

            <AppBar position="static" color="primary" sx={{ bottom: 'auto', top: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="inherit" component="div">
                        Books Love
                    </Typography>

                    <React.Fragment key={'right'}>
                        <Button  color="inherit" onClick={toggleDrawer('right', true)}><MenuIcon /></Button>
                        <Drawer
                            anchor={'right'}
                            open={menu}
                            onClose={toggleDrawer('right', false)}
                        >
                            {list('right')}
                        </Drawer>
                    </React.Fragment>

                </Toolbar>
            </AppBar>
            { children }
            
            {/* Bottom Navigation */}
            <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: '1px solid #ccc' }} value={value} onChange={handleChange}>
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} onClick={search} />
                <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} onClick={profile} />
            </BottomNavigation>
        </Fragment>
    );
};

export default NavProfile;