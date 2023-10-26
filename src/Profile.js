import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Button from '@mui/material/Button';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Profile() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then(response => response.json())
      .then(result => { 
        if (result.status === 'ok') {
            setUser(result.user)
            setIsLoaded(false)
        } else if (result.status === 'forbidden') {
            MySwal.fire({
                html: <i>{result.message}</i>,
                icon: 'error'
            }).then((value) => {
                navigate('/')
            })
        }
         console.log(result)
        })
      .catch(error => console.log('error', error));
  }, [])
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  if (isLoaded) return (<div>Loading</div>)
  else {
    return (
        <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  value={user.fname} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  value={user.lname} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="avatar"
                  label="Avatar"
                  name="avatar"
                  autoComplete="avatar"
                  value={user.avatar}  
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Users" variant="body2">
                  Go to CRUE
                </Link>
              </Grid>
            </Grid>
            <Grid>
             <a href="/login" onClick={logout}><Button>logout</Button></a>
            </Grid>
          </Box>
        </Box>
      </Container>
            {/* <div>{user.id}</div>
            <div>{user.fname}</div>
            <div>{user.lname}</div>
            <div>{user.username}</div>
            <div>{user.emil}</div>
            <div><img src={user.avatar} alt={user.id} width={100}/></div>
            <div><button onClick={logout}>logout</button></div>
            <a href="/Users"><Button>CRUD</Button></a> */}
      </div>
    )
  }
}

export default Profile