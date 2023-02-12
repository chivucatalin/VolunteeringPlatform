import * as React from 'react'
import { Typography } from '@mui/material'

const bodyText="Make a world of difference with our Volunteering Platform! Join or create events to help your community, connect with like-minded people and use our chat feature to find the perfect event for you. We make volunteering easy and fun, so you can make a real impact – anytime, anywhere. Take action today and start making a difference!\nReady to do something amazing with your time? Join Volunteering Platform and find the perfect way to give back. Connect with inspiring causes and join events to make a difference in your community. Get involved, chat with people who have the same values and passions as you, and make a difference in the world – it’s all possible on this Volunteering Platform!"

export const HomeDescription = () => {
    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    return (
        <div>
            <Typography variant="h3" align="center">
                Volunteering Platform
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 24 }}>
                {bodyText}
            </Typography>
            <Typography variant="button" display="block" align="center" gutterBottom sx={{ marginRight: '10%' }}>
                What kind of events can I find on this platform?
            </Typography>
            <Typography variant="body2" gutterBottom>
                This volunteering platform offers a wide range of events that will help you do just that! 
                From food drives and beach cleanups, to fundraising events and community service projects, 
                you can find something that fits your interests and skillset. You'll have the opportunity to meet 
                new people, make an impact in your local area, and gain valuable experience. So join us today and 
                start making a difference!
            </Typography>
            <Typography variant="button" display="block" align="center" gutterBottom sx={{ marginRight: '10%' }}>
                What are the best ways to stay informed about upcoming events?
            </Typography>
            <Typography variant="body2" gutterBottom>
                Every event is made successful due to the hard work of individuals working behind the scenes. 
                In case of any hitches along the journey, notifications are sent via email or phone immediately 
                by an admin of the event.
            </Typography>
            <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{height:'50px' , width:'500px'}}>
                {isHovering && (<Typography variant="overline" display="block" gutterBottom>
                    overline text
                </Typography>)}
            </div>
        </div>)

}