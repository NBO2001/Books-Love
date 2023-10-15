import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const Cadastro = () => {
    return (
        <Container component="main" maxWidth="xs" sx={{ bgcolor: '#ffffff', height: "100vh", display: 'flex', flexDirection: 'column', mt:8 }}>
            
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems:"center",
                padding:1,
            }} >
                <IconButton
                    color="primary"
                    aria-label="Voltar"
                    href='/login'
                    sx={{ position: 'absolute', top: 16, left: 16 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" component="div" sx={{ mb: 5 }}> Sign Up </Typography>
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        sx={{ borderRadius: 50, mb: 2 }}
                        autoFocus
                    />
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        sx={{ borderRadius: 50, mb: 2 }}
                        autoFocus
                />
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        sx={{ borderRadius: 50, mb: 2 }}
                        autoFocus
                />
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="confpassword"
                        label="Confirm Password"
                        name="confpassword"
                        autoComplete="confpassword"
                        sx={{ borderRadius: 50, mb: 2 }}
                        autoFocus
                />
                <FormControlLabel
                control={<Checkbox value="useterms" color="primary" />}
                label={
                    <Typography>
                        Concordo com os{' '}
                        <Link href="/termos-de-uso" color="primary">
                            termos de uso
                        </Link>
                    </Typography>
                    }
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#EBCDC3", borderRadius: 50,
                    "&:hover": {
                    bgcolor: "#D5B9A5", // Change the color on hover
                    } }}
                >
                    Sign up
                </Button>
            </Box>
           
        </Container>
    );
};

export default Cadastro;
