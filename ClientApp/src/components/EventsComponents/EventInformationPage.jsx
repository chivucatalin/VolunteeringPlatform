import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { EventMap } from './EventMap';
import {useCookies} from 'react-cookie'

import { useDispatch} from 'react-redux'
import { coordinatesChange } from '../../store/map';

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
    const [cookies]=useCookies(['token'])

    const [loading, setLoading] = React.useState(false);
    const [event, setEvent] = React.useState({});
    const dispatch = useDispatch();

    React.useEffect(() => {
        populateEventData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    //se da fetch la eveniment 
    const populateEventData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'JWT-Token': cookies.token },
        };
        fetch("events/" + params.id,requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({ headers, json }) => {
                setEvent(json)
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
        setLoading(true);
    }

    return (
        <div>
            {loading === true && <Box sx={{
                flexGrow: 1,
                backgroundColor: '#E7F5E5'
            }}>
                <Typography variant="h3" gutterBottom align='center'> {event.eventName} </Typography>
                <Grid container spacing={2} justifyContent='space-between'>
                    <Grid item xs={3}>
                        <Item sx={{ whiteSpace: 'pre-line' }}>
                            Event Type:{event.eventType}{"\n"}
                            Address :{event.eventAddress}{"\n"}
                            Date :{event.eventDate}{"\n"}
                        </Item>
                    </Grid>
                    <Grid item xs={5}>
                        <Item sx={{ whiteSpace: 'pre-line' }}>
                            {event.eventDescription}
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <EventMap type="details" />
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Ratings</Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={2}
                            direction="column">
                            < Grid item>
                                <Item sx={{ height: 200 }}>Skills</Item>
                            </Grid>
                            <Grid item >
                                <Item sx={{ height: 200 }}>Ratings</Item>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>Comments</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Media</Item>
                    </Grid>
                </Grid>
            </Box >
            }
        </div>
    )
}