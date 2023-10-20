import React, {useState} from "react";
import { NavProfile, ItemList } from "../../components";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Profile = ({ title }) => {
  const [value, setValue] = React.useState('0');
  
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

  const list = (anchor) => (
    <Box
      sx={{ width: 250, height: "100vh", display: 'flex', flexDirection: 'column', justifyContent:"space-between"}}
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
            <Typography level="title-sm">{ user.name }</Typography>
            <Typography level="body-xs">{user.email}</Typography>
          </Box>
          <IconButton size="sm" variant="plain" color="neutral">
            <LogoutRoundedIcon />
          </IconButton>
        </Box>

      </Box>

    </Box>
  );

  // Fictitious data
  const booksRead = 120;
  const followers = 250;
  const following = 80;

  const dataTags = [
    {
      "id": 1,
      "title": "Lidos",
      "cover": "https://m.media-amazon.com/images/I/81S4dsWUoFL._SL1500_.jpg",
      "describe": "Os meus livros lidos",
      "books": [1,8,6,3,7,2]
    },
    {
      "id": 2,
      "title": "Lendo",
      "cover": "https://m.media-amazon.com/images/I/81sGirC3z5L._SL1500_.jpg",
      "describe": "Minhas atuais leituras",
      "books": [6,7,5]
    },
    {
      "id": 3,
      "title": "Quero ler",
      "cover": "https://m.media-amazon.com/images/I/91bWAiUqgGL._SL1500_.jpg",
      "describe": "Os livros que quero ler em um futuro breve",
      "books": [158,554,154,841,359,1585,61657,15486,135,6958,36,58]
    }
    ,
    {
      "id": 4,
      "title": "Perfeição em livros",
      "cover": "https://m.media-amazon.com/images/I/71D7UgWOv1L._SL1500_.jpg",
      "describe": "Meus livros favoritos",
      "books": [978,513,697,58]
    }
  ]



  return (
    <NavProfile title={title} list={list} toggleDrawer={toggleDrawer} menu={state}>
      
      <Box
        sx={{
          width: '100%',
          display: "flex",
          justifyContent: "space-around",
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

        <Box sx={{ display: "flex", justifyContent: "space-around", width: '100%' }}>
          {/* Fictitious User Statistics */}
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                {booksRead}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Lidos
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                {followers}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Seguidores
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                {following}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Seguindo
            </Typography>
          </Box>

        </Box>
      </Box>

      {/* Tabs Section */}
      <TabContext value={value}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant="scrollable" onChange={handleChange} aria-label="lab API tabs example">
            <Tab  key={0} label="Minhas listas" value="0" />
            { dataTags.map( (onceList) => (
              <Tab key={onceList.id}  label={onceList.title} value={onceList.id}  />
            ))}
            
          </TabList>
        </Box>
        
        <TabPanel value="0">
        {/* Tab Panels */}
        { dataTags.map( (onceList) => (
          

          <ItemList 
          value={onceList.id}
          onClick={(e) => setValue(onceList.id)}
          listName={onceList.title}
          qtnLivos={onceList.books.length}
          describe={onceList.describe}
          linkImg={onceList.cover} />

        
        ) ) }
        </TabPanel>

        { dataTags.map( (onceList) => (
          <TabPanel key={onceList.id} value={onceList.id}>
             <Typography variant="subtitle1" color="text.secondary">
             {onceList.title}
            </Typography>
          </TabPanel>
        ) ) }
      

      </TabContext>
    </NavProfile>
  );
};

export default Profile;
