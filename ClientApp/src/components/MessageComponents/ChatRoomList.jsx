import * as React from 'react';
import { useCookies } from 'react-cookie'
import { Container, Grid } from '@mui/material';
import { ChatRoom } from './ChatRoom';

//se face fetch la toate chat room-urile 
export const ChatRoomList = (props) => {
  const [cookies, setCookie] = useCookies(['token', 'name']);

  const chooseName = (name, username) => {

    if (name === cookies.name) return username;

    return name;
  }

  return (
    <Container>
      {
        <Grid container spacing={4}>
          {props.rooms.map((room) => (
            <Grid item xs={12} key={room.id}>
              <ChatRoom person={chooseName(room.name,room.userName)} id={room.id} ClickedRoom={props.ClickedRoom} />
            </Grid>
          ))}
        </Grid>}
    </Container>
  );
}
