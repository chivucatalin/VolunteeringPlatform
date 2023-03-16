import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Paper, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { JoinedEventButton } from './JoinedEventButton'
import { EventMap } from './EventMap';
import { PhotoSlideshow } from '../EventPhotosComponents/PhotoSlideshow'
import { AddPhoto } from '../EventPhotosComponents/AddPhoto';
import jwt from 'jwt-decode'
import { useCookies } from 'react-cookie'
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useDispatch } from 'react-redux'
import { coordinatesChange } from '../../store/map';

export const joinedContext = React.createContext();

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f3e5f5',
    ...theme.typography.body2,
    height: 400,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export const EventInformationPage = () => {
    //folosim parametrii din url
    const params = useParams();
    const [cookies] = useCookies(['token', 'name'])

    const [loading, setLoading] = React.useState(false);
    const [event, setEvent] = React.useState({});
    const [prop, setProp] = React.useState('join');
    const [admin, setAdmin] = React.useState(false)
    const [color, setColor] = React.useState('success');
    const dispatch = useDispatch();

    const handleClick = () => {
        const values = {
            "username": cookies.name,
            "eventId": params.id
        }

        if (prop === 'join') {
            setProp('leave');
            setColor('error');

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT-Token': cookies.token
                },
                body: JSON.stringify(values)
            };
            fetch(`JoinedEvent`, requestOptions)
                .then(res => res.json().then(json => ({
                    headers: res.headers,
                    json
                })))
                .catch((err) => console.log('Error!!!!' + err));
        }

        if (prop === 'leave') {
            setProp('join')
            setColor('success')

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT-Token': cookies.token
                },
                body: JSON.stringify(values)
            };
            fetch(`JoinedEvent`, requestOptions)
                .then(res => {
                    if (res.ok) {
                        return res.json().then(json => ({
                            headers: res.headers,
                            json
                        }));
                    } else {
                        return;
                    }
                })
                .catch(error => {
                    console.log(error)
                });

        }

    };

    React.useEffect(() => {
        populateEventData().then(() => {
            checkJoinedEvent();
        }).then(() => {
            const user = jwt(cookies.token);
            if (user.admin === "True") setAdmin(true);
            setLoading(true);

        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    const checkJoinedEvent = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'JWT-Token': cookies.token },
        };
        fetch(`JoinedEvent/${cookies.name}/${params.id}`, requestOptions)
            .then(res => {
                if (res.ok) {
                    return res.json().then(json => ({
                        headers: res.headers,
                        json
                    }));
                } else {
                    return;
                }
            })
            .then(({ headers, json }) => {
                if (json && json.username && json.eventId) {
                    setProp('leave');
                    setColor('error')
                }
            })
            .catch(error => {

                return;
            });
    }

    //se da fetch la eveniment 
    const populateEventData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'JWT-Token': cookies.token },
        };
        fetch("events/" + params.id, requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({ headers, json }) => {
                setEvent(json)
                if (!json.eventNoOfVolunteers) {
                    setProp('full')
                    setColor('grey')
                }
                fetch(`https://nominatim.openstreetmap.org/search/${json.eventAddress}?` + new URLSearchParams({
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
            })
            .catch((err) => console.log('Error!!!!' + err));

    }
    return (
        <joinedContext.Provider value={{ prop, setProp, color, setColor }}>
            <div>
                {loading === true && <Box sx={{
                    flexGrow: 1,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <Typography variant="h3" gutterBottom align='center'> {event.eventName} </Typography>
                        <JoinedEventButton handleClick={handleClick} sx={{ marginTop: '1vw' }} />
                    </div>
                    <Grid container spacing={3} sx={{ marginTop: "10px" }}>
                        <Grid item xs={2}>
                            <div style={{ display: 'flex' }}>
                                <List style={{ marginRight: '24px' }}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Typography variant="h5">•</Typography>
                                        </ListItemIcon>
                                        <ListItemText primary={event.eventDate} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Typography variant="h5">•</Typography>
                                        </ListItemIcon>
                                        <ListItemText primary={event.eventCity} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Typography variant="h5">•</Typography>
                                        </ListItemIcon>
                                        <ListItemText primary={`We need : ${event.eventNoOfVolunteers} volunteers`} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOnIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={event.eventAddress} />
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item lg={6} md={10} xs={12}>
                            <Paper sx={{
                                height: 400,
                                padding: '6px',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    textAlign: 'center',
                                    maxWidth: '800px'
                                }}>
                                    <Typography variant="h5">
                                        {event.eventDescription}
                                    </Typography>
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Item><EventMap type="details" /></Item>
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} sx={{ marginTop: "10px" }}>
                        <Grid item xs={6}>
                            <PhotoSlideshow
                                id={params.id} admin={admin}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {(prop === 'leave' || admin) &&
                                <AddPhoto id={params.id} />}
                        </Grid>
                    </Grid>
                </Box >
                }
            </div>
        </joinedContext.Provider>
    )
}