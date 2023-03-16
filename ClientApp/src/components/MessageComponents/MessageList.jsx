import * as React from "react";
import { Container, Grid } from '@mui/material'
import { Message } from "./Message";

//se face fetch la toate mesagele din chatroom,se tine cont cand se schimba camera /context sau am un props care se schimba mereu 
export const MessageList = (props) => {

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedTime;
  }
  return (
    <Container>
      {
        <Grid container spacing={4} direction="column" >
          {props.messages.map((message) => (
            <Grid item key={message.id} >
              <div>
                 Posted at {formatTime(message.postedAt)}
              </div>
              <Message sender={message.userName} message={message.contents}  //nu e bine aici trebuie sa faci o functie acolo
              />
            </Grid>
          ))}
        </Grid>}
    </Container>
  );
}

