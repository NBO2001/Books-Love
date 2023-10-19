import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";

import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [inputError, setInputError] = useState({ username: false, password: false });


    useEffect(() => {
        // Função para carregar os dados do arquivo JSON
        const loadData = async () => {
          try {
            // Faça a requisição para o arquivo JSON
            const response = await fetch("/fake_base/books.json");
            const data = await response.json();
            localStorage.setItem("books", JSON.stringify(data));
          } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar a base de dados.");
          }
        };

        const loadUsers = async () => {

            try{
                const response = await fetch("/fake_base/users.json");
                const data = await response.json();
                localStorage.setItem("users", JSON.stringify(data));
            }catch(error){
                console.error(error);
                toast.error("Erro ao carregar a base de dados.");
            }
        }

    
        if (!localStorage.getItem("books")) {
          loadData();
        }

        if (!localStorage.getItem("users")) {
            loadUsers();
        }

      }, []);
    
    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);

    const handlePassword = (e) => setPassword(e.target.value);

    const defineVariables = (user) => {

        try{
            localStorage.removeItem('auth/id');
            localStorage.removeItem('auth/name');
            localStorage.removeItem('auth/login');
            
            if(user){
                localStorage.setItem('auth/id', user.id);
                localStorage.setItem('auth/name', user.name);
                localStorage.setItem('auth/username', user.username);
                localStorage.setItem('auth/login', true);
                navigate('/home');
            }else{
                toast.error('Incorrect username or password.');
            }

        }catch(e){
            console.log(e);
            toast.error('Error ao carregar a base!');
        }

    }

    const authenticatorUse = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            
            setInputError({
                username: !username,
                password: !password
            });
            return;
        }
        
        setInputError({ username: false, password: false });

        let usersBase = JSON.parse(localStorage.getItem("users")) || undefined;
        
        if(!usersBase){
            
            try{
                const response = await fetch("/fake_base/users.json");
                const data = await response.json();
                localStorage.setItem("users", JSON.stringify(data));
                usersBase = data || undefined;
                const user = usersBase.users.find((user) => user.username === username && user.password === password);
                defineVariables(user);

            }catch(e){
                console.log(e);
                toast.error('Error ao carregar a base!');
            }
        }else{
            const user = usersBase.users.find((user) => user.username === username && user.password === password);
            defineVariables(user);
        }
        
        
        

    }

    return (
        <Container component="main" maxWidth="xs" sx={{ bgcolor: '#ffffff', height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ToastContainer />
            <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems:"center",
                padding:1,

                
                }} >
                
                <Box component="form" sx={{ mt: 1, }}>
                    <Typography variant="h3" component="div" sx={{mb: 4}}>
                        Login
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        onChange={handleUsername}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        sx={{ borderRadius: 50 }}
                        error={inputError.username}
                        helperText={inputError.username && "Username cannot be empty"}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        onChange={handlePassword}
                        type="password"
                        id="password"
                        sx={{ borderRadius: 50 }}
                        error={inputError.password}
                        helperText={inputError.password && "Password cannot be empty"}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={ authenticatorUse }
                        sx={{ mt: 3, mb: 2, bgcolor: "#EBCDC3", borderRadius: 50,
                        "&:hover": {
                            bgcolor: "#D5B9A5", // Change the color on hover
                        } }}
                    >Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" sx={{ color: 'black', textDecoration: "none" }}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" sx={{ color: 'black' , textDecoration: "none"  }}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>


                    

                </Box>
            </Box>

            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Divider sx={{ mt: 2, mb: 2 }} />
                        <Typography component="h3" variant="div" sx={{ textAlign: 'center' }}>
                            Or sign in with:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            onClick={() => {
                                // Handle Google login
                            }}
                            sx={{ borderRadius: 50, borderColor:"#000000" }}
                        >
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<TwitterIcon />}
                            
                            onClick={() => {
                                // Handle Twitter login
                            }}
                            sx={{ borderRadius: 50, borderColor:"#000000" }}
                        >
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
};

export default Login;