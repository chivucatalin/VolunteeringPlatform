import * as React from 'react';
import Button from '@mui/material/Button';
import { joinedContext } from './EventInformationPage';

export const JoinedEventButton = (props) => {

    const { prop, setProp, color, setColor } = React.useContext(joinedContext);

    return (
        <div>
                <Button variant="contained" color={color} onClick={props.handleClick}>
                    {prop}
                </Button>
        </div>
    );
};