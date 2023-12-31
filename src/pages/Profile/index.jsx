import React, {Fragment, useState} from "react";
import { NavProfile, ItemList, ItemSeach, ModalItem, MenuComponent, ModalEditList,ModalBook } from "../../components";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Typography from '@mui/joy/Typography';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

import { useNavigate } from 'react-router-dom';


const Profile = ({ title }) => {
  const [value, setValue] = useState('0');
  const [open, setOpen] = useState(false);
  const [anchorElList, setAnchorElList] = useState(null);
  const [anchorElBook, setAnchorElBook] = useState(null);
  const [ idList, setIdList ] = useState(null);
  const [ modalEditList, setModalEditList ] = useState(false);
  const [ bookRemoveId, setBookRemoveId ] = useState(null);
  const [ openModalBook, setOpenModalBook ] = useState(false);
  const [ bookId, setBookId] = useState(null);
  
  const user_local = localStorage.getItem("auth/object");
  const user = JSON.parse(user_local);

  const [state, setState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState(open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openModal = (e) => {
    setOpen(true);
  }

  const navigate = useNavigate();
  
  const logout = (e) => {

    localStorage.removeItem("auth/id");
    localStorage.removeItem("auth/login");
    localStorage.removeItem("auth/name");
    localStorage.removeItem("auth/object");
    localStorage.removeItem("auth/username");
    
    navigate('/search');
  }

  const list = (anchor) => (
    <Box
      sx={{ width: 300, height: "100vh", display: 'flex', flexDirection: 'column', justifyContent:"space-between"}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      

      <List>
        <ListItem key={"Account"} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                  <InsertEmoticonIcon />
                </ListItemIcon>
                <ListItemText primary={"Account"} />
            </ListItemButton>
        </ListItem>

        
      </List>
      
      <Box>

        <Divider />
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', bottom: 0 }}>
          <Avatar
            variant="outlined"
            size="sm"
            src={user.img_profile}
          />

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">{ user.username }</Typography>
            <Typography level="body-xs">{user.email}</Typography>
          </Box>
          <IconButton onClick={logout} size="sm" variant="plain" color="neutral">
            <LogoutRoundedIcon />
          </IconButton>
        </Box>

      </Box>

    </Box>
  );

  // Fictitious data
  const booksRead = 120;

  const dataTags_all = JSON.parse(localStorage.getItem("lists")) || []; 

  const listsOfUser = user.lists;

  const dataTags = dataTags_all.filter( (listIn) => listsOfUser && listsOfUser.includes(listIn.id) );

  const books_ = localStorage.getItem("books");
  const books = JSON.parse(books_) || [];
  
  const booksOfTag = (ids) => {
    const bookSelected = books.filter( (book) => ids.includes(book.id) );
    return bookSelected;
  }

  const openSettings = (e, idList) => {
    e.stopPropagation();
    setIdList(idList);
    setAnchorElList(e.currentTarget); 
  };

  const bookOptions = (e, idBook) => {
    e.stopPropagation();
    setBookRemoveId(idBook);
    setAnchorElBook(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorElList(null);
  };

  const handleCloseBook = () => {
    setAnchorElBook(null);
  };
  
  const deleteList = (e) => {

    e.preventDefault();
    
    user.lists = user.lists.filter( (idx) => idx !== idList);

    const userDataset = JSON.parse(localStorage.getItem("users")) || [];

    userDataset.users = userDataset.users.map( (lt) => {

      if(lt.id === user.id){
        return user;
      }else return lt;

    });

    localStorage.setItem("users", JSON.stringify(userDataset));
    localStorage.setItem("auth/object", JSON.stringify(user));

    toast.success("Removido com sucesso!");

    setAnchorElList(null);

  }

  const deleteBookList = (e) => {

    if(bookRemoveId){

      const newData = dataTags_all.map( (lst) => {
        if(lst.id == bookRemoveId.list){
          lst.books = lst.books.filter( (bkId) => bkId !==  bookRemoveId.book);
        }

        return lst;
      });

      localStorage.setItem("lists", JSON.stringify(newData));
      toast.success("Removido com sucesso!");
      setAnchorElBook(null);

    };

  };
  
  const viewDetalhes = (e, bookIdR) => {
    e.preventDefault();
    setBookId(bookIdR);
    setOpenModalBook(true);

  }

  return (
    <NavProfile title={title} list={list} toggleDrawer={toggleDrawer} menu={state}>
      <ToastContainer />
      <Box
        sx={{
          width: '100%',
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Stack direction="column" spacing={1}>
          {/* Profile Picture */}
          <AspectRatio ratio="1" maxHeight={200} sx={{ minWidth: 120, borderRadius: '50%', padding:2 }}>
            <img
              src={user.img_profile}
              loading="lazy"
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </AspectRatio>
          {/* Edit Button */}
          <IconButton
            aria-label="upload new picture"
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{
              bgcolor: 'background.body',
              borderRadius: '50%',
              position: 'relative',
              height: 15,
              width: 15,
              top: -50,
              right: -100,
              boxShadow: 'sm',
            }}
          >
            <EditRoundedIcon />
          </IconButton>
         
        </Stack>

        <Box>
            {user && (
              <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                {user.name}
              </Typography>
            )}
            
            <Typography variant="subtitle1" color="text.secondary">
                {booksRead} Lidos
            </Typography>
        </Box>
      </Box>

      {/* Tabs Section */}
      <TabContext value={value}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
            <Tab  key={0} label="Minhas listas" value="0" />
            { dataTags && dataTags.map( (onceList) => (
              <Tab key={onceList.id}  label={onceList.title} value={onceList.id}  />
            ))}
            
          </TabList>
        </Box>
        
        <TabPanel value="0">
        {/* Tab Panels */}
        {dataTags && dataTags.map( (onceList) => (
          
          <Fragment>
              <ItemList 
              value={onceList.id}
              onClick={(e) => setValue(onceList.id)}
              openSettings={ (e) => openSettings(e, onceList.id)}
              listName={onceList.title}
              qtnLivos={onceList.books.length}
              describe={onceList.describe}
              linkImg={onceList.cover} />
              
          </Fragment>

        
        ) ) }
        <Tooltip title="Adicionar Lista" placement="left">
          <Fab sx={{position:"fixed", bottom: "40px", right: "15px"}} color="primary" aria-label="add" onClick={openModal}>
            <AddIcon />
          </Fab>
        </Tooltip>
        </TabPanel>

        { dataTags && dataTags.map( (onceList) => (
          <TabPanel key={onceList.id} value={onceList.id}>
            { onceList.books.length ?
             booksOfTag(onceList.books).map( (book) => (<ItemSeach onClick={ (e) => viewDetalhes(e, book.id)} openSettings={(e) => bookOptions(e, { book: book.id, list: onceList.id})} item={book} />))
            : <Typography> Sem livros aqui!! </Typography> }
          </TabPanel>
        ) ) }
      

      </TabContext>
      
      <MenuComponent id={"myMenus"} anchorEl={anchorElBook} handleClose={handleCloseBook}>
        <MenuItem onClick={deleteBookList} ><DeleteIcon /> Remove</MenuItem>
      </MenuComponent>

      <MenuComponent id={"15481-comp"} anchorEl={anchorElList} handleClose={handleClose}>
        <MenuItem onClick={(e) => setModalEditList(true)}><ModeIcon /> Edit</MenuItem>
        <MenuItem onClick={deleteList}><DeleteIcon /> Delete</MenuItem>
      </MenuComponent>


      

      
      <ModalItem open={open} setOpen={setOpen} />
      <ModalEditList open={modalEditList} setOpen={setModalEditList} listId={idList}/>
      <ModalBook open={openModalBook} setOpen={setOpenModalBook} bookId={bookId}/>
    </NavProfile>
  );
};

export default Profile;
