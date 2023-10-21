import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    height: "70vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const closeButtonStyle = {
    position: 'absolute',
    top: 0,
    right:"15px",
};

const ModalBook = ({ open, setOpen, bookId, clickList }) => {

    const handleClose = () => setOpen(false);

    const booksBase = JSON.parse(localStorage.getItem("books")) || [];
    const book = booksBase.find((bk) => bk.id == bookId);

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

                        <Box sx={{ mb: 1 }}>

                            <Typography id="modal-modal-title" variant="h6" component="h2">
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

                    {book ? (
                        <Typography variant="body2" sx={{ maxHeight: "230px", overflow: 'auto', textAlign: "justify" }} component="div">
                            {book.describe}
                        </Typography>) : (<Skeleton variant="rectangular" width={210} height={60} />)
                    }

                    <Fab onClick={(e) => clickList(e, bookId)} size="small" sx={{mt:5,bottom: "5px",left: "15px", zIndex: 0}} color="primary" aria-label="add" >
                        <AddIcon />
                    </Fab>

                </Box>
            </Modal>
        </div>
    );
};

export default ModalBook;
