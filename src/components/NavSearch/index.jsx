import React, { Fragment, useState } from "react";
import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


const NavSearch = ({ title, filters, setFilters, searchButtom, inputSearch, children }) => {
    const navigate = useNavigate();

    const [state, setState] = useState(false);
    const [nowFilter, setNowFilter] = useState("");

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

    const toggleDrawer = (e, open) => {
        if (
          e &&
          e.type === 'keydown' &&
          (e.key === 'Tab' || e.key === 'Shift')
        ) {
          return;
        }
    
        setState(open);
    };

    const handleDelete = (tag) => {
      const newArray = filters.filter((item) => item !== tag);
      setFilters(newArray);
    };
    
    const addTag = (e) => {
      e.preventDefault();
      setFilters([...filters, nowFilter]);
      setNowFilter("");
    }

    const handleField = (e) => {
        e.preventDefault();
        setNowFilter(e.target.value);
    }

    const list = () => (
        <Box
          sx={{ width: 'auto', padding: 2 }}
          role="presentation"
        >
          <List>
            <ListItem key={"filter"} disablePadding >
              <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { mr: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
                
              >
                <TextField
                  sx={{ height: "48px" }}
                  id="outlined-basic"
                  label="Filtro"
                  variant="outlined"
                  value={nowFilter} 
                  onChange={handleField}
                />
                <Button
                  sx={{ height: "48px" }}
                  variant="outlined"
                  aria-label="add"
                  startIcon={<AddIcon />}
                  onClick={addTag}
                >
                  Add
                </Button>
              </Box>
              
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key={"filterActives"}>
            {filters.map((filter, index) => (
                <Chip
                key={index}
                variant="outlined"
                label={filter}
                onDelete={(e) => handleDelete(filter)}
                />
            ))}
            
            </ListItem>
          </List>
        </Box>
    );

    const handleCloseDrawer = () => {
        toggleDrawer(undefined, false);
      };

    return (
        <Fragment>
            <AppBar position="fixed" color="primary" sx={{ top: 0 }}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                
                
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchButtom}>
                    <SearchIcon />
                </IconButton>

                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Book"
                    onChange={inputSearch}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            searchButtom(e);
                        }
                    }}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                
                <Fragment key={'bottom'}>
                    <IconButton onClick={(e) => toggleDrawer(e, true)}  color="primary" sx={{ p: '10px' }} aria-label="filters">
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                     anchor={'bottom'}
                     open={state}
                     onClose={handleCloseDrawer}
                     onOpen={(e) =>  toggleDrawer(e, true)}
                    >
                    {list()}
                    </SwipeableDrawer>
                </Fragment>
                </Paper>
                
            </AppBar>

            <div style={{ paddingTop: '64px', paddingBottom: '64px' }}>
                {children}
            </div>

            {/* Bottom Navigation */}
            <BottomNavigation sx={{ width: '100%', position: 'fixed', bottom: 0, borderTop: '1px solid #ccc' }} value={value} onChange={handleChange}>
                <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} onClick={search} />
                <BottomNavigationAction label="Book Shelf" value="BookShelf" icon={<AutoStoriesIcon />} onClick={profile} />
            </BottomNavigation>
        </Fragment>
    );
};

export default NavSearch;
