import * as React from 'react'
import { Tooltip, IconButton,Modal ,Box} from '@mui/material'
import { EventMap } from './EventMap'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'50vw',
    height:'60vh',
    border: '4px solid #000',
    boxShadow: 24,
};

//Pe form-ul de creare a evenimentelor vrem sa putem vedea harta intr-un popup cand apasem pe un buton
export const CreateEventMapForm = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
    
    <div>
        <Tooltip title="Address on Map">
            <IconButton onClick={()=>{handleOpen()}}>
                <MapOutlinedIcon />
            </IconButton>
        </Tooltip>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <EventMap type="details"/>
            </Box>
            
        </Modal>
    </div>)
}