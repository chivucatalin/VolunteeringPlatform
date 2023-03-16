import * as React from 'react';

import { Typography, Avatar } from "@mui/material"
import { ArrowForward } from "@mui/icons-material";

const rootStyle = {
  display: "flex",
  alignItems: "center",
  padding: "16px",
  borderBottom: "1px solid #ddd",
  width: '20vw',
  cursor: "pointer"
};

const avatarStyle = {
  marginRight: "16px"
};


export const ChatRoom = (props) => {
  const handleClick=()=>{
    props.ClickedRoom(props.id)
  }
  return (
    <div style={rootStyle} onClick={handleClick} >
      <Avatar sx={avatarStyle} src={`https://avatars.dicebear.com/api/personas/${props.person}.svg`} />
      <Typography variant="h6">{props.person}</Typography>
      <ArrowForward/>
    </div>
  );

}