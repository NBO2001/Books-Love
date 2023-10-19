import React from "react";
import { Navbar } from "../../components";
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

const Profile = ({ title }) => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Fictitious data
  const booksRead = 120;
  const followers = 250;
  const following = 80;

  return (
    <Navbar title={title}>
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
              src="https://media.licdn.com/dms/image/D4D03AQFwxvgeUh703Q/profile-displayphoto-shrink_200_200/0/1665617011866?e=1703116800&v=beta&t=TIaVY63Ux9fxvKTCgQJzaCdMUIOtfqfB5Pe6sjVX3n0"
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
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Informações" value="1" />
            <Tab label="Estatísticas" value="2" />
          </TabList>
        </Box>

        {/* Tab Panels */}
        <TabPanel value="1">Informações do Usuário</TabPanel>
        <TabPanel value="2">Estatísticas de Leitura</TabPanel>
      </TabContext>
    </Navbar>
  );
};

export default Profile;
