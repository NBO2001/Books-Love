import React, { useState } from "react";
import Menu from '@mui/material/Menu';


const MenuComponent = ({anchorEl, handleClose, id, children}) => {

    return(
        <Menu
            id={id}
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