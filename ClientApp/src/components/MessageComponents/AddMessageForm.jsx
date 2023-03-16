import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const formStyle = {

    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
}
const submitStyle = {
    alignSelf: "flex-end"
}

export const AddMessageForm = (props) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.AddMessage(message);
        setMessage("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <TextField
                label="Type your message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                margin="normal"
                variant="standard"
                multiline
                maxRows={4}
                onKeyPress={handleKeyPress}
                InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleSubmit}>
                        <SendIcon />
                      </IconButton>
                    ),
                  }}
            />
        </form>
    );
}