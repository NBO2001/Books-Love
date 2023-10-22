import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import { ItemSeach } from "../../components";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90vw",
    height: "50vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


  
const ModalItem = ({open, setOpen}) => {

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [tagName, setTagName] = useState("");
    const [describe, setDescribe] = useState("");
    const [ searchBook, setSearchBook ] = useState("");
    const [books, setBooks] = useState([]);

    const handleClose = () => setOpen(false);

    const handleOptionsChange = (event, newSelectedOptions) => {
        setSelectedOptions(newSelectedOptions);
        setSearchBook("");
    };

    const booksBase = JSON.parse(localStorage.getItem("books"));

    useEffect( () => {

        const queryExec = () => {

            if ( searchBook.trim() === "") {
                const first10Books = booksBase.slice(0, 10);
                setBooks(first10Books);
              } else {
                const results = booksBase.filter((book) => {
                  const regex = new RegExp(searchBook.trim(), "i");
                  return regex.test(book.title + " " + book.author);
                });
                setBooks(results);
              }
        }

        queryExec();


    }, [searchBook]);


    const handleSearch = (e) => {
        setSearchBook(e.target.value.trim());
    };

    const handleTag = (e) => setTagName(e.target.value);
    const handleDescribe = (e) => setDescribe(e.target.value);

    const createNewList = (e) => {

        e.preventDefault();

        if(tagName.length < 2) return;
        if(describe.length < 2) return;
        if(selectedOptions.length == 0) return;

        const lists = JSON.parse(localStorage.getItem("lists")) || [];
        const user = JSON.parse(localStorage.getItem("auth/object"));

        let index = lists[lists.length-1].id + 1;

        const books_arr = selectedOptions.map( (book) => book.id);

        const newList = {
            "id": index,
            "title": tagName,
            "cover": selectedOptions[0].src,
            "describe": describe,
            "books": books_arr
        }

        lists.push(newList);
        user.lists.push(index);

        let usersTable = JSON.parse(localStorage.getItem("users"))

        usersTable.users.map((userIter) => {
            if(userIter.id===user.id){
                userIter.lists = user.lists;
            }
            return userIter;
        });

        localStorage.removeItem("users");
        localStorage.removeItem("auth/object");
        localStorage.removeItem("lists");

        localStorage.setItem("users", JSON.stringify(usersTable));
        localStorage.setItem("auth/object", JSON.stringify(user));
        localStorage.setItem("lists", JSON.stringify(lists));

        setTagName("");
        setDescribe("");
        setSearchBook("");
        setSelectedOptions([]);

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
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Inserir uma Nova Lista
            </Typography>
            <TextField value={tagName} onChange={handleTag} id="standard-basic" fullWidth label="Nome da lista" variant="standard" sx={{mb: 3}} />

            <TextField
                id="outlined-multiline-static"
                label="Descrição"
                value={describe}
                onChange={handleDescribe}
                multiline
                fullWidth
                rows={2}
                defaultValue=""/>
            
            <Autocomplete
            multiple
            id="tags-standard"
            options={books}
            getOptionLabel={(option) => option.title}
            value={selectedOptions}
            onChange={handleOptionsChange}  
            renderOption={(props, book) => (
                <li {...props}>
                <ItemSeach item={book} key={book.id} />
                </li>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                onChange={handleSearch}
                value={searchBook}
                variant="standard"
                label="Livros"
                placeholder="Titulo"
                />
            )}
            />
            <Box sx={{  display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'}} >
                <Fab onClick={(e) => setOpen(false)} color="error" sx={{mt:5, mr: 2, width:"180px"}}  variant="extended">Fechar</Fab>
                <Fab onClick={createNewList} color="primary" sx={{mt:5, width:"180px"}}  variant="extended">Criar</Fab>
            </Box>

          </Box>
        </Modal>
      </div>
    );
};


export default ModalItem;