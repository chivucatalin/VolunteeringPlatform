import React, { useState } from "react";
import { TextField, IconButton, InputLabel } from "@mui/material";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useCookies } from 'react-cookie'

export const AddChatRoomForm = (props) => {
  const [text, setText] = useState("");
  const [cookies, setCookie] = useCookies(['token', 'name']);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {

    props.AddChatRoom(cookies.name, text);

    setText("");
  };

  return (
    <div>
      <TextField
        label="Add Chat Room"
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '12px',
          boxSizing: 'border-box',
          marginTop:'5vh'
        }}
        value={text}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSubmit}>
              <ArrowForwardOutlinedIcon />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}
