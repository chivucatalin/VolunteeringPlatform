import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie'

export const Message = (props) => {
    const [cookies, setCookie] = useCookies(['token', 'name']);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const color = (cookies.name !== props.sender) ? theme.palette.primary.main : 'white';

    return (
        <Paper
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2px',
                padding: '16px',
                marginTop: '4px',
                color: theme.palette.text.primary,
                backgroundColor: color,
                minHeight: '60px',
                lineHeight: '20px',
                wordWrap: 'break-word',
                maxWidth: isSmallScreen ? '100%' : '40vw',
            }}
            elevation={3}
        >
            <Avatar
                alt={props.sender}
                src={`https://avatars.dicebear.com/api/personas/${props.sender}.svg`}
                sx={{ marginRight: '16px' }}
            />
            <div>
                <Typography
                    variant="h6"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        ':hover': { overflow: 'visible' },
                    }}
                >
                    {props.sender}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: 'pre-line',
                        wordWrap: 'break-word',
                        paddingTop: '8px',
                        overflowWrap: 'anywhere',
                    }}
                >
                    {props.message}
                </Typography>
            </div>
        </Paper>
    );
};