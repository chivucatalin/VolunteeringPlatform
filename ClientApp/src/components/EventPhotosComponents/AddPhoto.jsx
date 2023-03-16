import * as React from 'react'
import { Box, TextField, IconButton, Grid } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useCookies } from 'react-cookie';
import { useSnackbar } from 'notistack'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'


export const AddPhoto = (props) => {
    const [cookies] = useCookies(['token', 'name'])
    const [image, setImage] = React.useState(null);
    const { enqueueSnackbar } = useSnackbar()
    const textRef = React.useRef('');
    const fileInputRef = React.useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async () => {
        const data = new FormData();
        data.append(`picture`, image);

        const requestOptions = {
            method: 'POST',
            headers: {
                'JWT-Token': cookies.token
            },
            body: data
        };
        fetch(`eventphoto/${props.id}/${textRef.current.value}`, requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })).then(() => {
                window.location.reload();

                enqueueSnackbar('Photo added!', {
                    autoHideDuration: 5000,
                });
            }))
            .catch((err) => console.log('Error!!!!' + err));
    }


    return (
        <Box
            sx={{
                backgroundColor: "white",
                borderRadius: "16px",
                maxWidth: "30vw",
                height: "auto",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
                marginTop: "20px",
                p: 2, // adds padding
                '@media (max-width: 800px)': {
                    maxWidth: '90vw',
                    margin: '1rem',
                    fontSize: '0.8rem',
                    height: '12vh',
                },
            }}
        >
            <Grid container justifyContent="space-between">
                <Grid item xs={3}>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}
                            style={{ display: "none" }}
                            ref={fileInputRef}
                        />
                        <IconButton onClick={handleButtonClick}>
                            <CameraAltIcon />
                        </IconButton>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    <TextField
                        required
                        id="standard"
                        label="Photo Description"
                        defaultValue="Description"
                        inputRef={textRef}
                        variant="standard"
                        fullWidth={true}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleSubmit}>
                                    <ArrowForwardOutlinedIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}