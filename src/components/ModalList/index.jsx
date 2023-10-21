import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Fab from '@mui/material/Fab';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const closeButtonStyle = {
    position: 'absolute',
    top: 0,
    right:"15px",
};

const ModalList = ({ open, setOpen, bookId }) => {

    const handleClose = () => setOpen(false);

    const booksBase = JSON.parse(localStorage.getItem("books")) || [];
    const book = booksBase.find((bk) => bk.id == bookId);

    const user_ = JSON.parse(localStorage.getItem("auth/object"));
    
    const user_list = user_.lists || [];
    const listsBase_ = JSON.parse(localStorage.getItem("lists")) || [];

    const listsBase = listsBase_.filter( (lista) => user_list.includes(lista.id));

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton sx={closeButtonStyle} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', mb: 1 }}>

                        {book ? (<CardMedia
                            component="img"
                            sx={{ maxWidth: "150px", maxHeight: "250px", mr: 2 }}
                            image={book.src}
                            alt="Book img"
                        />) : (<Skeleton variant="rectangular" width={150} height={118} />)}

                        <Box sx={{ mb: 1, minWidth: "300px" }}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{minHeight: "80px", maxWidth: "60%",overflow: "hidden", textOverflow: "ellipsis"}}>
                                {book ? book.title : "Undefined"}
                            </Typography>
                            {book ? (
                                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1.5 }} component="div">
                                    by {book.author ? book.author : "error"}
                                </Typography>) : (<Skeleton variant="rectangular" width={210} height={15} />)
                            }
                            {book ? (
                                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1.5 }} component="div">
                                    {book.stars ? <Rating name="half-rating-read" defaultValue={parseFloat(book.stars.replace(',', '.'))} precision={0.5} readOnly /> : "error"}
                                </Typography>) : (<Skeleton variant="rectangular" width={210} height={15} />)
                            }
                        </Box>

                    </Box>

                    <Autocomplete
                    multiple
                    id="checkboxes-tags-1578"
                    options={listsBase}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.title}
                        </li>
                    )}
                    style={{ maxWidth: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Tags" placeholder="Quais tags?" />
                    )}
                    />
                    <Fab color="secondary" sx={{mt:5, width:"180px"}}  variant="extended">Adicionar</Fab>
                </Box>
                
            </Modal>
        </div>
    );
};

export default ModalList;
