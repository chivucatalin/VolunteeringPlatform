import * as React from 'react';
import dayjs from 'dayjs';
import { AdvancedFilterModal } from './AdvancedFilterModal.jsx';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Divider, TextField, Stack, IconButton, Button, Grid, Tooltip, Modal } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { useDispatch } from 'react-redux'
import { filterChange } from '../../store/filter.js'
import { eventPageChange } from '../../store/pagination.js';


export const advancedFilterContext = React.createContext();

const dateFormat = (date) => {
    return (date.get('month') + 1).toString() + "-" + date.get('date') + "-" + date.get('year');
}
export const FilterEventBar = () => {
    //hook-urile pentru a filtra
    const [fromDate, setFromDate] = React.useState(dayjs());
    const [toDate, setToDate] = React.useState(dayjs().add(30, 'days'));
    const [open, setOpen] = React.useState(false);

    const name = React.useRef('');
    const address = React.useRef('');

    const dispatch = useDispatch()

    /* hooks used in the advanced filter section ,created here in order to be used in the context provider */
    const [eventType, setEventType] = React.useState(5);
    const [joinedEvent, setJoinedEvent] = React.useState(false);
    const [associationEvent, setAssociationEvent] = React.useState(false);
    const [searchQuery,setSearchQuery] = React.useState('');
    /* hooks used in the advanced filter section ,created here in order to be used in the context provider */
    
    //credeam un obiect cu toate detaliile despre filtrare ce ii vom da dispatch
    const filterObject = (_name, _address, _fromDate, _toDate,_searchQuery,_eventType) => {
        const _filterParams = {
            name: _name,
            address: _address,
            fromDate: dateFormat(_fromDate),
            toDate: dateFormat(_toDate),
            searchQuery: _searchQuery
        }
        if (_eventType!==5) _filterParams.eventType=_eventType;
        return _filterParams;
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeFromDate = (newValue) => {
        setFromDate(newValue);
    };

    const handleChangeToDate = (newValue) => {
        setToDate(newValue);
    };

    return (
        <advancedFilterContext.Provider value={{ eventType ,setEventType ,joinedEvent,setJoinedEvent
        ,associationEvent,setAssociationEvent,searchQuery,setSearchQuery}}>
        <div>
                <Grid
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        padding: 0,
                        margin: 0
                    }}
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    noValidate
                    autoComplete="off"
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="baseline"
                        spacing={1}>
                        <TextField id="name-field" label="Name" variant="outlined" inputRef={name} />

                        <TextField id="address-field" label="Address" variant="outlined" inputRef={address} />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                                id="fromdate-field"
                                label="From Date"
                                inputFormat="MM-DD-YYYY"
                                disablePast={true}
                                value={fromDate}
                                onChange={handleChangeFromDate}
                                renderInput={(params) => <TextField {...params} />}
                            />

                            <MobileDatePicker
                                id="todate-field"
                                label="To Date"
                                inputFormat="MM-DD-YYYY"
                                minDate={fromDate}
                                value={toDate}
                                onChange={handleChangeToDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        spacing={0}
                    >
                        <Tooltip title="Advanced Filters">
                            <IconButton color="primary" aria-label="advanced filter" component="label" onClick={handleOpen}>
                                <FilterAltIcon />
                            </IconButton>
                        </Tooltip>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div>
                            <AdvancedFilterModal />
                            </div>
                        </Modal>
                        <Button onClick={() => {
                            dispatch(filterChange(filterObject(name.current.value, address.current.value, fromDate, toDate,searchQuery,eventType)))
                            dispatch(eventPageChange(1))
                        }} >Filter</Button>
                    </Stack>
                </Grid>
                <Divider />
        </div>
        </advancedFilterContext.Provider>)
}