import React, { useState } from "react";
import Menu from '@mui/material/Menu';


const MenuComponent = ({anchorEl, handleClose, children}) => {

    return(
        <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            { children }
        </Menu>
    );
};

export default MenuComponent;