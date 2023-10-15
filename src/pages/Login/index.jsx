import React from "react";
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


const Login = () => {
    const navigate = useNavigate();

    const authenticatorUse = (e) => {
        e.preventDefault();
        console.log("Authhenti");
        // Obtendo o objeto history do React Router
       
        navigate('/');
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ bgcolor: '#ffffff', height: "100vh", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        sx={{ borderRadius: 50 }}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        sx={{ borderRadius: 50 }}
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