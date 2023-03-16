import * as React from 'react';
import { Box, Typography, Stack, TextField, MenuItem, IconButton } from '@mui/material';
import { advancedFilterContext } from './FilterEventBar'
import CheckIcon from '@mui/icons-material/Check';
import { eventItemsChange, eventPageChange } from '../../store/pagination.js'

import { useDispatch, useSelector } from 'react-redux'


/*
    Advanced Filter Modal - cand apesi pe butonul de advanced filters va apara un pop up care te poata lasa sa alegi ce filtre 
    vrei sa pui pe evenimentele tale: ce fel de eveniment sa fie , daca asociatia ta detine acel eveniment , sa cauti un eveniment
    bazat pe un query(in descriere sau nu) sau cum vrei sa fie paginarea evenimentelor
*/

//Cate elemente o sa dorim pe pagina si ce tipuri de evenimente exista
const elementsPerPage = [4, 16, 32, 64]
const types = [
    {
        value: 5,
        label: 'All types'
    },
    {
        value: 0,
        label: 'Enviromental',
    },
    {
        value: 1,
        label: 'Educational',
    },
    {
        value: 2,
        label: 'Social',
    },
    {
        value: 3,
        label: 'Healthcare',
    },
    {
        value: 4,
        label: 'Sports',
    }
];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const AdvancedFilterModal = () => {
    //Hook-urile luate de la FilterBar prin context,ca sa putem sa le folosim intre componente

    const { eventType, setEventType, joinedEvent, setJoinedEvent, searchQuery, setSearchQuery } = React.useContext(advancedFilterContext);

    //Ca sa putem folosi globabl state-ul paginarii ce este folosit si la componenta PageChoose
    const dispatch = useDispatch()
    const { pagination } = useSelector(state => state.pagination)

    //Ca sa se vada frumos la ochi unde vrem sa fie evenimentul asociatiei/eveniment la care participam , primary-vrem disabled-nu vrem
    const handleButtonColor = (_eventBoolean) => {
        return (_eventBoolean ? "primary" : "disabled");
    }
 
    const handleChangeType = (event) => {
        setEventType(event.target.value);
    };


    return (<div>
        <Box sx={modalStyle}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="row"
                    alignItems="baseline"
                    spacing={1}
                >
                    <Typography id="search-query" variant="subtitle1" >
                        Search description of events:
                    </Typography>
                    <TextField id="searchquery-field" variant="outlined" value={searchQuery} onChange={(ev) => { setSearchQuery(ev.target.value) }} />
                </Stack>
                <Stack
                    direction="row"
                    alignItems="baseline"
                    spacing={1}
                >
                    <Typography id="event-type" variant="subtitle1" >
                        Select event type:
                    </Typography>
                    <TextField
                        select
                        value={eventType}
                        onChange={handleChangeType}
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="baseline"
                    spacing={1}
                >
                    <Typography id="event-type" variant="subtitle1" >
                        Select events per page:
                    </Typography>
                    <TextField
                        select
                        value={pagination.eventItemsPerPage}
                        onChange={(ev) => {
                            dispatch(eventItemsChange(ev.target.value))
                            dispatch(eventPageChange(1))
                        }}>
                        {elementsPerPage.map((option, index) => (
                            <MenuItem key={index} value={elementsPerPage[index]}>
                                {elementsPerPage[index]}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="centere"
                    spacing={1}
                >
                    <Typography id="joined-events" variant="caption" >
                        Show joined events:
                    </Typography>
                    <IconButton onClick={() => {
                        setJoinedEvent(!joinedEvent)
                    }}>
                        <CheckIcon color={handleButtonColor(joinedEvent)} />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    </div>)

}