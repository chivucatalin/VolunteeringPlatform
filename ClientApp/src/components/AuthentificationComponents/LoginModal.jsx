import * as React from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";


import {
  Grid,
  TextField,
  Box,
  Button
} from '@mui/material';

import { useDispatch } from 'react-redux'

import { login } from '../../store/user';

const modalStyle = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid ##a2b3a7',
  boxShadow: 24,
  p: 4,
};


export const LoginModal = () => {
  const usernameRef = React.useRef('');
  const passwordRef = React.useRef('');
  const navigate= useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(['token', 'name']);

  const dispatch = useDispatch();



  const handleLogin = async () => {
    dispatch(login(usernameRef.current.value, passwordRef.current.value))

    fetch(`users/${usernameRef.current.value}/${passwordRef.current.value}`)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({ headers, json }) => {
                const _jwtToken = JSON.parse(headers.get("JWT-Token"))
                
                setCookie('token', _jwtToken, { path: '/' });
                setCookie('name', usernameRef.current.value, { path: '/' });
            })
            .then(()=>{
              window.location.reload(false);
            })
            .catch((err) => console.log('Error!!!!' + err));
    

    

  }
  return (
    <div >
      <Box sx={modalStyle}>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Username" inputRef={usernameRef}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} inputRef={passwordRef}></TextField>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={() => {
              handleLogin()
            }}> Login </Button>
            
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth onClick={() => {
              navigate(`create-account`)
              window.location.reload(false);
            }}> Create Account </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
