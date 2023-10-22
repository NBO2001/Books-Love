import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { ToastContainer, toast } from 'react-toastify';

const Cadastro = () => {

    const [ name, setName ]                 = useState("");
    const [ username, setUsername ]         = useState("");
    const [ password, setPassword ]         = useState("");
    const [ confPassword, setConfPassword ] = useState("");
    const [ useTerms, setUseTerms ]         = useState(false);
    const [ erros, setErros ] = useState({ 
        inputName: false, 
        inputUsername: false, 
        inputPasswd: false, 
        inputConfPasswd: false,
        terms: false,
    });
    const navigate = useNavigate();

    const handleName = (e) => setName(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handlePasswd = (e) => setPassword(e.target.value);
    const handleCPass = (e) => setConfPassword(e.target.value);
    const handleTerms = (e) => setUseTerms(e.target.checked);

    const defineVariables = (user) => {

        try{
            localStorage.removeItem('auth/id');
            localStorage.removeItem('auth/name');
            localStorage.removeItem('auth/login');
            
            if(user){
                localStorage.setItem('auth/id', user.id);
                localStorage.setItem('auth/name', user.name);
                localStorage.setItem('auth/username', user.username);
                localStorage.setItem('auth/object', JSON.stringify(user));
                localStorage.setItem('auth/login', true);
                navigate('/');
            }else{
                toast.error('Incorrect username or password.');
            }

        }catch(e){
            console.log(e);
            toast.error('Error ao carregar a base!');
        }

    }

    const createNewList = () => {

        const lists = JSON.parse(localStorage.getItem("lists")) || [];

        let index = lists[lists.length-1].id + 1;

        const lidos = {
            "id": index,
            "title": "Lidos",
            "cover": "https://m.media-amazon.com/images/I/817D4UYzM6L._SL1500_.jpg",
            "describe": "Livros lidos.",
            "books": []
        }

        const lendo = {
            "id": index+1,
            "title": "Lendo",
            "cover": "https://m.media-amazon.com/images/I/817D4UYzM6L._SL1500_.jpg",
            "describe": "Livros que eu estou lendo.",
            "books": []
        }

        const queroler = {
            "id": index + 2,
            "title": "Quero ler",
            "cover": "https://m.media-amazon.com/images/I/817D4UYzM6L._SL1500_.jpg",
            "describe": "Livros que eu quero ler",
            "books": []
        }

        const abandonados = {
            "id": index + 3,
            "title": "Abandonei",
            "cover": "https://m.media-amazon.com/images/I/817D4UYzM6L._SL1500_.jpg",
            "describe": "Livros que eu fiz a mesma coisa que a pessoa que gosto fez comigo; abandonei",
            "books": []
        }

        lists.push(lidos);
        lists.push(lendo);
        lists.push(queroler);
        lists.push(abandonados);


        localStorage.setItem("lists", JSON.stringify(lists));

        return [index, index+1, index+2, index+3];


    }


    const sendForback = async (e) => {

        e.preventDefault();
        
        if(!name || !username || !password || !confPassword || !useTerms || !(password === confPassword)){

            setErros({ 
                inputName: !name, 
                inputUsername: !username, 
                inputPasswd: !password, 
                inputConfPasswd:  !confPassword || !(password === confPassword),
                terms: !useTerms
            });

            return;
        }

        let usersTable = JSON.parse(localStorage.getItem("users")) || undefined;

        const links = [
            "https://st2.depositphotos.com/7214818/10819/i/600/depositphotos_108195990-stock-illustration-illustration-of-a-boy-and.jpg",
            "https://st5.depositphotos.com/77990272/66333/v/600/depositphotos_663334652-stock-illustration-children-reading-bible-happy-smiling.jpg",
            "https://st.depositphotos.com/1026266/4961/i/600/depositphotos_49618727-stock-photo-open-book-with-hand-drawn.jpg",
            "https://st2.depositphotos.com/1000423/5253/i/600/depositphotos_52531379-stock-photo-man-with-book.jpg",
            "https://st2.depositphotos.com/1000423/7817/i/600/depositphotos_78178168-stock-photo-businesswoman-evades-splash-ideas.jpg",
            "https://st.depositphotos.com/1000423/5047/i/600/depositphotos_50472539-stock-photo-challenge-in-business.jpg"
        ]

        const choiceLink = links[ parseInt( (Math.random() * 6) % 6 ) ];


        if(!usersTable){
            try{
                const response = await fetch("/fake_base/users.json");
                const data = await response.json();
                localStorage.setItem("users", JSON.stringify(data));
                usersTable = data || undefined;

                let maxIdx = 0;

                usersTable.users.map( (user) => {
                    if(user.id > maxIdx) maxIdx = user.id;
                });

                const newUser = {
                    "id": maxIdx+1, 
                    "name": name, 
                    "username": username, 
                    "password": password,
                    "email": username+"@booklove.com",
                    "img_profile": choiceLink,
                    "lists": createNewList()
                }

                const updatedUsers = {"users": [...usersTable.users, newUser]};

                localStorage.setItem("users", JSON.stringify(updatedUsers));
                
                defineVariables(user);

                return;

            }catch(e){
                console.log(e);
                toast.error('Error ao carregar a base!');
            }
            return;
        }else{

            let maxIdx = 0;

            usersTable.users.map( (user) => {
                if(user.id > maxIdx) maxIdx = user.id;
            });

            const newUser = {
                "id": maxIdx+1, 
                "name": name, 
                "username": username, 
                "password": password,
                "email": username+"@booklove.com",
                "img_profile": choiceLink,
                "lists": createNewList()
            }

            const updatedUsers = {"users": [...usersTable.users, newUser]};

            localStorage.setItem("users", JSON.stringify(updatedUsers));

            defineVariables(newUser);

        }

    }

    return (
        <Container component="main" maxWidth="xs" sx={{ bgcolor: '#ffffff', height: "100vh", display: 'flex', flexDirection: 'column', mt:8 }}>
            <ToastContainer />
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
                        onChange={handleName}
                        autoComplete="name"
                        error={erros.inputName}
                        helperText={erros.username && "Name cannot be empty"}
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
                        onChange={handleUsername}
                        error={erros.inputUsername}
                        helperText={erros.inputUsername && "Username cannot be empty"}
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
                        onChange={handlePasswd}
                        error={erros.inputPasswd}
                        helperText={erros.inputPasswd && "Password cannot be empty"}
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
                        onChange={handleCPass}
                        error={erros.inputConfPasswd}
                        helperText={erros.inputConfPasswd && "Senhas diferentes."}
                        sx={{ borderRadius: 50, mb: 2 }}
                        autoFocus
                />
                <FormControl error={!!erros.terms}>
                    <FormControlLabel
                        control={<Checkbox value="useterms" color="primary" required onChange={handleTerms}/>}
                        label={
                        <Typography>
                            Concordo com os{' '}
                            <Link href="/termos-de-uso" color="primary">
                            termos de uso
                            </Link>
                        </Typography>
                        }
                    />
                    {erros.terms && <FormHelperText>Para usar o app, é necessário aceitar os termos.</FormHelperText>}
                </FormControl>

                

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={sendForback}
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
