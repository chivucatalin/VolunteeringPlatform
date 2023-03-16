import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { Photo } from './Photo';
import { useCookies } from 'react-cookie';
import { DeletePhoto } from './DeletePhoto';

export const PhotoSlideshow = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animateDirection, setAnimateDirection] = useState('left');
    const [loading, setLoading] = useState(false)
    const [cookies] = useCookies(['token', 'name'])
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        populatePhotosData();
        setLoading(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'JWT-Token': cookies.token
            },

        };
        fetch(`eventphoto/${photos[activeIndex].id}`, requestOptions)
            .then(res => {
                if (res.ok) {
                    populatePhotosData();
                    return res.json().then(json => ({
                        headers: res.headers,
                        json
                    }));
                } else {
                    return;
                }
            })
            .catch((err) => console.log('Error!!!!' + err));

    }

    const populatePhotosData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'JWT-Token': cookies.token,
            },
        };
        fetch("eventphoto?id=" + props.id, requestOptions)
            .then(res => res.json().then(json => ({
                headers: res.headers,
                json
            })))
            .then(({ headers, json }) => {
                setPhotos(json)
            })

        setActiveIndex(0);
    }

    const handleLeftArrowClick = () => {
        setActiveIndex(activeIndex === 0 ? photos.length - 1 : activeIndex - 1);
        setAnimateDirection('left');
    };

    const handleRightArrowClick = () => {
        setActiveIndex(activeIndex === photos.length - 1 ? 0 : activeIndex + 1);
        setAnimateDirection('right');
    };

    return (
        <div>
            {loading &&
                <div>
                    {photos.length !== 0 &&
                        <div>
                            <Grid container alignItems="center" sx={{ display: 'flex', flexWrap: 'nowrap', position: 'relative' }}>
                                <Grid item xs={1}>
                                    <IconButton onClick={handleLeftArrowClick}>
                                        <KeyboardArrowLeft />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} >
                                    <AnimatePresence>
                                        <div style={{ display: 'flex' }}>
                                            <motion.div
                                                key={activeIndex}
                                                initial={{ opacity: 0, x: animateDirection === 'left' ? '-100%' : '100%' }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: animateDirection === 'left' ? '100%' : '-100%' }}
                                                transition={{ duration: 0.5 }}
                                                style={{ flex: 1 }}
                                            >
                                                <Photo {...photos[activeIndex]} />
                                            </motion.div>
                                        </div>
                                    </AnimatePresence>
                                </Grid>
                                <Grid item xs={1}>
                                    <IconButton onClick={handleRightArrowClick}>
                                        <KeyboardArrowRight />
                                    </IconButton>
                                </Grid>

                            </Grid>
                            {props.admin &&
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <DeletePhoto handleDelete={handleDelete} />
                            </div>}
                        </div>}
                </div>}
        </div>

    );
};

