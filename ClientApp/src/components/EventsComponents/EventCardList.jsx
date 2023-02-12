import * as React from 'react';
import { Grid } from '@mui/material';
import { EventCard } from './EventCard';
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'reactstrap';
import { useCookies } from 'react-cookie'


import { eventTotalChange } from '../../store/pagination';



export const EventCardList = () => {
    const [eventData, setEventData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false)
    const [cookies, setCookie] = useCookies(['token', 'name']);

    const { filter } = useSelector(state => state.filter)
    const { pagination } = useSelector(state => state.pagination)

    const dispatch = useDispatch()

    //mereu cand se schimba filtrele sau paginarea dam alt fetch cu noile params
    React.useEffect(() => {
        populateEventData();
        console.log(eventData)
        console.log(";")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, pagination])

    //fetch get la backend
    const populateEventData = async () => {

        const requestOptions = {
            method: 'GET',
            headers: { 'JWT-Token': cookies.token },
        };
        const params1 = new URLSearchParams(filter)
        const params2 = new URLSearchParams({
            pageNumber: pagination.eventPage,
            pageSize: pagination.eventItemsPerPage
        })
        const combined = new URLSearchParams({
            ...Object.fromEntries(params1),
            ...Object.fromEntries(params2)
        });
        fetch("events?" + combined, requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({ headers, json }) => {
                const _paginationParams = JSON.parse(headers.get("Pagination"))
                dispatch(eventTotalChange(_paginationParams.TotalItemCount))
                console.log(parseInt(pagination.eventTotal / pagination.eventItemsPerPage) + 1)
                setEventData(json)
            })
            .catch((err) => console.log('Error!!!!' + err));
        setLoading(true);
    }
    return (
        <div>
            <Container>
                {isLoading === true &&
                    <Grid container spacing={4}>
                        {eventData.map((event) => (
                            <Grid item xs={12} sm={3} key={event.eventId}>
                                <EventCard name={event.eventName} city={event.eventCity} date={event.eventDate} id={event.eventId} />
                            </Grid>
                        ))}
                    </Grid>}
            </Container>
        </div>
    )
}