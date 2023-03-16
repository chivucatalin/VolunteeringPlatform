import * as React from 'react';
import { Form } from 'react-final-form';
import { TextField, Radios, DatePicker, } from 'mui-rff';
import {
    Typography, Paper, Grid, Button,
    CssBaseline,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CreateEventMapForm } from './CreateEventMapForm'
import { useDispatch, useSelector } from 'react-redux'
import { coordinatesChange, addressChange, addressGetFromField } from '../../store/map';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';


//Pentru ca adresa se foloseste si de harta ,o sa cream o componenta externa pt field-ul adresei ca sa ne putem ocupa de detalii

const CreateEventAddressForm = () => {
    //ca sa folosim state-ul global al hartii
    const dispatch = useDispatch()

    const { map } = useSelector(state => state.map)

    //atunci cand scriem ceva in field,vrem ca adresa din state sa se schimbe si sa 
    function handleChange(event) {
        //cum fac sa nu se dea dispatch mereu cand scriu ceva si doar cand se termina?
        dispatch(addressChange(event.target.value))
        dispatch(addressGetFromField())
    }

    //cand se schimba adresa vrem sa schimbam si locatia de pe harta,verificam mai intai daca 
    //adresa exista si daca adresa nu a fost schimbata in harta

    React.useEffect(() => {
        if (map.address === "") return;
        if (map.turn === false) return;
        changeMapLocation(map.address)
        //setAddress(map.address)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map.address])

    //schimbam adresa pe harta folosind fetch si schimband-o in state global

    const changeMapLocation = async (value) => {
        fetch(`https://nominatim.openstreetmap.org/search/${value}?` + new URLSearchParams({
            format: 'jsonv2',
            addressdetails: 1,
            limit: 1,
        })).then(res => res.json().then(json => ({
            headers: res.headers,
            json
        })))
            .then(({ headers, json }) => {
                const coordinates = {
                    lat: json[0].lat,
                    lng: json[0].lon,
                }
                dispatch(coordinatesChange(coordinates));
            })
            .catch((err) => console.log('Error!!!!' + err));

    }

    return (
        <div>
            <TextField
                fullWidth
                label="Event Address"
                name="eventAddress"
                value={map.address}
                onChange={handleChange}
                margin="none"
            // required={true}
            />
        </div>
    )
}

/*adauga notistack aici!Unde sunt required lasa-le asa ,baga validate si daca cumva este gol doar da o notificare d-aia frumoasa :D */
const validate = values => {
    const errors = {};
    if (!values.eventName) {
        errors.eventName = 'Required';
    }
    if (!values.eventDate) {
        errors.eventDate = 'Required';
    }
    if (!values.eventCity) {
        errors.eventCity = 'Required';
    }
    /*if (!values.eventAddress) {
        errors.eventAddress = 'Required';
    }*/
    if (!values.eventType) {
        errors.eventType = 'Required';
    }
    if (!values.eventNoOfVolunteers) {
        errors.eventNoOfVolunteers = 'Required';
    }
    return errors;
};

export const CreateEventPage = () => {
    const { map } = useSelector(state => state.map)
    const [cookies] = useCookies(['token'])
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    //cand dam submit la form adaugam proprietati noi la values si apoi dam fetch cu post

    const onSubmit = async values => {
        values.eventLongitude = map.longitude
        values.eventLatitude = map.latitude
        values.eventAddress = map.address
        console.log(values)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'JWT-Token': cookies.token
            },
            body: JSON.stringify(values)
        };
        fetch('events', requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({json}) => {
                if (json) {
                    enqueueSnackbar('Event was created :D', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                        autoHideDuration: 5000,
                    });
                    navigate('/event-page');
                } else {
                    enqueueSnackbar('Something was wrong ,please try again!', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                        autoHideDuration: 3000,
                    });
                }
            })
            .catch((err) => console.log('Error!!!!' + err));
    };

    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 700 }}>
            <CssBaseline />
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                <span role="img" aria-label="flag">
                    🏁
                </span>{' '}
                Event Create Form
            </Typography>
            <Typography variant="h5" align="center" component="h2" gutterBottom>
                Create a volunteering event 
            </Typography>
            <Form
                onSubmit={onSubmit}
                initialValues={{}}
                validate={validate}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={12} key={0}>
                                    <TextField
                                        label="Event Name"
                                        name="eventName"
                                        margin="none"
                                    // required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} key={1}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            name="eventDate"
                                            margin="normal"
                                            label="Event Date"
                                        //required={true}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} key={2}>
                                    <TextField
                                        label="Event City"
                                        name="eventCity"
                                        margin="none"
                                    //required={true}
                                    />
                                </Grid>
                                <Grid item xs={10} key={3}>
                                    <CreateEventAddressForm />
                                </Grid>
                                <Grid item xs={2} key={4}>
                                    <CreateEventMapForm />
                                </Grid>
                                <Grid item xs={12} key={5}>
                                    <Radios
                                        label="Event Type"
                                        name="eventType"
                                        formControlProps={{ margin: 'none' }}
                                        radioGroupProps={{ row: true }}
                                        data={[
                                            {

                                                label: 'Enviromental',
                                                value: '0',
                                            },
                                            {

                                                label: 'Educational',
                                                value: '1',
                                            },
                                            {

                                                label: 'Social',
                                                value: '2'
                                            },
                                            {

                                                label: 'Healthcare',
                                                value: '3',
                                            },
                                            {

                                                label: 'Sports',
                                                value: '4',
                                            }
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={6} key={6}>
                                    <TextField
                                        label="Event Number of Volunteers"
                                        type="number"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        name="eventNoOfVolunteers"
                                        margin="none"
                                    //required={true}
                                    />
                                </Grid>
                                <Grid item xs={12} key={7}>
                                    <TextField
                                        label="Event Description"
                                        name="eventDescription"
                                        margin="none"
                                        multiline
                                        rows={6}
                                    //required={false}
                                    />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>       
                    </form>
                )} />
        </div>
    )
}