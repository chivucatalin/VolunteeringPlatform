import * as React from 'react';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Button, Grid, Paper } from '@mui/material';

import { VerifyAccount } from './VerifyAccount';

import { useDispatch} from 'react-redux'

import { getCode , getAccount } from '../../store/user';




const formStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid ##a2b3a7',
    boxShadow: 24,
    p: 4,
}
const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.Username = 'Required';
    }
    if (!values.email) {
        errors.Email = 'Required';
    }
    if (!values.password) {
        errors.Password = 'Required';
    }
    if (!values.repeatpassword) {
        errors.repeatPassword = 'Required';
    }
    if (!(values.password === values.repeatpassword)) {
        errors.password = 'Must be the same as repeatPassword';
        errors.repeatpassword = 'Must be the same as Password';
    }
    return errors;
};

export const CreateAccountPage = ({ handleClose }) => {
    const [submitted, setSubmitted] = React.useState(false)

    const dispatch = useDispatch();
    
    //dupa ce dai submit la a crea contul ,datele vor fi salvate in state management si se va trimite un e-mail cu un cod de verificare
    //du-te la verifyaccount pentru urmatorul pas
    const onSubmit = async values => {
        dispatch(getAccount(values.username,values.password,values.email))
        
       
        fetch(`users/${values.email}`,{method: 'HEAD'})
            .then(res =>  ({
                headers: res.headers,
    
            }))
            .then(({ headers }) => {
                const code=headers.get('Verification-Code')
                //console.log(code)
                dispatch(getCode(code))
            })
            .catch((err) => console.log('Error!!!!' + err));
        setSubmitted(true);
    };

    return (
        <div>
        <Form
            onSubmit={onSubmit}
            initialValues={{}}
            validate={validate}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Paper sx={formStyle}>
                        <Grid container alignItems="flex-start" spacing={5} >
                            <Grid item xs={12} key={0}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    margin="none"
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={12} key={1}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    margin="none"
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={6} key={2}>
                                <TextField
                                    label="Password"
                                    name="password"
                                    margin="none"
                                    type='password'
                                    required={true}
                                />
                            </Grid>
                            <Grid item xs={6} key={3}>
                                <TextField
                                    label="Repeat Password"
                                    name="repeatpassword"
                                    margin="none"
                                    type='password'
                                    required={true}
                                />
                            </Grid>
                            <Grid item style={{ marginTop: 300,position:'absolute'}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={submitted}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )} />
            {submitted && <VerifyAccount />}
            </div>
    );
};

