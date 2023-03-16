import * as React from 'react';
import { TextField, Typography, Grid, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'


import { useSelector } from 'react-redux'

const fieldStyle = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    width: 500,
    transform: 'translate(-50%, -50%)',
    p: 4,
}

export const VerifyAccount = () => {
    const navigate = useNavigate();
    const verify = React.useRef('')
    const { user } = useSelector(state => state.user)
    const { enqueueSnackbar } = useSnackbar()

    //daca ce se scrie in text field e la fel ca codul salvat in state management ,e treu
    const checkCode = () => {
        if (verify.current.value === user.verifyCode)
            return true
        return false
    }

    //Dupa ce codul a fost verificat-trimitem detaliile contului catre backend cu Post si dam refresh la pagina ca sa se poata loga user-ul
    const sendAccountDetails = async () => {
        const Username = user.username
        const Password = user.password
        const Email = user.email
        const isAdmin = false
        const AssociationId = 3
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username, Password, Email, isAdmin, AssociationId
            })
        };
        fetch('users', requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .catch((err) => console.log('Error!!!!' + err));

            navigate(`/`)
            window.location.reload(false);

            enqueueSnackbar('Account created! ', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                autoHideDuration: 2000,
            });
    }
    return (
        <Grid container={true} sx={fieldStyle}>
            <Typography id="verify-email" variant="subtitle1" >
                Check your email and write the verification code:
            </Typography>
            <TextField id="name-field" inputRef={verify} />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => {
                    if (checkCode) sendAccountDetails()
                }}
                sx={{
                    left: '10px',
                    height: 40
                }}
            >
                Submit
            </Button>
        </Grid>
    )
}