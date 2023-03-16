import * as React from 'react'
import { Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export const DeletePhoto = (props) => {
    return (
        <Box
            sx={{
                margin: '2vw',
                backgroundColor: 'red',
                borderRadius: '20px',
                maxWidth: '10vw',
                height: '10vh',
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
                p: '1rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1rem',
                '@media (max-width: 800px)': {
                    maxWidth: '80vw',
                    margin: '1rem',
                    fontSize: '0.8rem',
                    height: '8vh',
                },
            }}
            onClick={props.handleDelete}
        >
            <DeleteIcon />
            Remove Photo
        </Box>
    )

}