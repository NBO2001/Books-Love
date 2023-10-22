import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CardMedia from '@mui/material/CardMedia';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { modalStyle, alterCoverStyle } from './style';
import { ToastContainer, toast } from 'react-toastify';

const ModalEditList = ({ open, setOpen, listId }) => {
  const [list, setList] = useState(null);
  const [ booksCover, setBooksCover ] = useState([])
  const [ modalCover, setModalCover ] = useState(false);
  const [ book, setBook] = useState(null);
  const [ title, setTitle ] = useState("");
  const [ describe, setDescribe ] = useState("");

  useEffect(() => {
    const selectList = async (id) => {
      const dataBase = JSON.parse(localStorage.getItem("lists")) || [];
      const listNow = dataBase.find((lst) => lst.id === id);
      
      if(listNow){
        const dataBaseBooks = JSON.parse(localStorage.getItem("books")) || [];
        const userBooks = dataBaseBooks.filter( (book) =>  listNow.books.includes(book.id));
        const cover = userBooks.find( (bk) => bk.src === listNow.cover);
        setBooksCover(userBooks);
        setBook(cover);

      }

      setList(listNow);
    }

    selectList(listId);

  }, [listId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBooks = (e) => setModalCover(false);

  const handleAutocomple = (e, newValue) => {
    setBook(newValue);
    setModalCover(false);
  }

  const alterList = (e) => {

    e.preventDefault();

    const dataBase = JSON.parse(localStorage.getItem("lists")) || [];

    const baseAlter = dataBase.map( (lst) => {

        if(lst.id === listId ){

            if(book){
                lst.cover = book.src;
            }

            if(title.trim().length > 3){
                lst.title = title.trim();
            }

            if(describe.trim().length > 3){
                lst.describe = describe.trim();
            }

            return lst;

        }else{
            return lst;
        }

    });

    localStorage.removeItem("lists");
    localStorage.setItem("lists", JSON.stringify(baseAlter));
    toast.success("Alterado com sucesso!!!");
    setOpen(false);
  }

  const deleteList = (e) => {

    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem("auth/object"));
    
    user.lists = user.lists.filter( (idx) => idx !== listId);

    const userDataset = JSON.parse(localStorage.getItem("users")) || [];

    userDataset.users = userDataset.users.map( (lt) => {

      if(lt.id === user.id){
        return user;
      }else return lt;

    });

    localStorage.setItem("users", JSON.stringify(userDataset));
    localStorage.setItem("auth/object", JSON.stringify(user));

    toast.success("Removido com sucesso!");

    setOpen(false);

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Card sx={{ width: "100%", height: "100%"}}>
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={(e) => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              }
              title="Alterar lista"
            />
            <Box sx={{ display: "flex", flexDirection: ['column', 'row'], alignItems:"center" }}>
              <CardContent sx={{  flex: '1 0 auto' }}>
                {list && (
                  <TextField
                    required
                    fullWidth
                    id="outlined-required"
                    label="Nome da lista"
                    onChange={ (e) => setTitle(e.target.value)}
                    defaultValue={list.title}
                    sx={{ mb: 2 }}
                  />
                )}
                {list && (
                  <TextField
                    id="outlined-multiline-static"
                    label="Descrição"
                    multiline
                    fullWidth
                    onChange={ (e) => setTitle(e.target.value)}
                    required
                    rows={2}
                    sx={{ mb: 2}}
                    defaultValue={list.describe}
                  />
                )}
              </CardContent>
              <Box>
                {list && (
                    <CardMedia
                    component="img"
                    sx={{ maxWidth: 150, margin: 2 }}
                    image={book ? book.src : list.cover}
                    alt="algum livro"
                    />
                )}
                <IconButton
                    aria-label="upload new picture"
                    size="large"
                    variant="outlined"
                    color="primary"
                    sx={{
                    bgcolor: '#ebf7ef',
                    borderRadius: '50%',
                    position: 'relative',
                    height: 15,
                    width: 15,
                    bottom: 25,
                    right: "-150px",
                    boxShadow: 'sm',
                    }}
                    onClick={ (e) => setModalCover(true) }
                >
                    <EditRoundedIcon />
                </IconButton>

              </Box>

            </Box>
            
            <Box sx={{display: "flex",width:"100%", justifyContent: "center", alignItems: "center"}}>
                <Button onClick={deleteList} size="large" sx={{m:2}} variant="contained" color="error">
                    Apagar
                </Button>
            
                <Button onClick={alterList} size="large" sx={{m:2}} variant="contained" color="success">
                    Alterar
                </Button>
            </Box>

          </Card>
        </Box>
      </Modal>

      <Modal
        open={modalCover}
        onClose={handleCloseBooks}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={alterCoverStyle}>
        <Autocomplete
            disablePortal
            id="combo-box-48451"
            options={booksCover} 
            value={book}
            onChange={handleAutocomple}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField fullWidth {...params} label="Livro" />}
            />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEditList;
