import * as React from 'react';
import Grid from '@mui/material/Grid';
import { ChatRoomList } from './MessageComponents/ChatRoomList';
import { MessageList } from './MessageComponents/MessageList';
import { AddChatRoomForm } from './MessageComponents/AddChatRoomForm';
import { AddMessageForm } from './MessageComponents/AddMessageForm';
import * as signalR from "@microsoft/signalr";
import { useCookies } from 'react-cookie'
import { useSnackbar } from 'notistack';




export const MessagesPage = () => {
    const [connection, setConnection] = React.useState(null);
    const [cookies, setCookie] = useCookies(['token', 'name']);
    const { enqueueSnackbar } = useSnackbar()

    const [rooms, setRooms] = React.useState([])
    const [isLoadingRooms, setLoadingRooms] = React.useState(false)

    const [messages, setMessages] = React.useState([])
    const [currentRoomId, setCurrentRoomId] = React.useState(null)
    const [isLoadingMessages, setLoadingMessages] = React.useState(false)

    React.useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7039/chathub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    const username = cookies.name
                    connection.invoke('GetRooms', username).then((result) => {
                        setRooms(result);
                        setLoadingRooms(true);
                    });

                    connection.on('ReceiveMessage', message => {
                        console.log(currentRoomId === message.roomId)
                        if (currentRoomId === message.roomId) {
                            connection.invoke('ClickedRoom', message.roomId).then((result) => {
                                setMessages(result)
                            }
                            );
                        }
                    });

                    connection.on('ReceiveRoom', room => {
                        if (cookies.name === room.name || cookies.name === room.userName) {
                            connection.invoke('GetRooms', cookies.name).then((result) => {
                                setRooms(result);
                            })
                        }

                    });

                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);


    const ClickedRoom = async (id) => {
        try {
            await connection.invoke('ClickedRoom', id).then((result) => {
                setMessages(result)
                setCurrentRoomId(id);
                setLoadingMessages(true)
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    const AddChatRoom = async (name, username) => {
        try {
            await connection.invoke('AddChatRoom', name, username).then(connection.invoke('GetRooms', name).then((result) => {
                setRooms(result);
                if (result) {
                    enqueueSnackbar('ChatRoom Added-enjoy chatting~ ', {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                        autoHideDuration: 5000,
                    });
                } else {
                    enqueueSnackbar('Something was wrong ,please try again!', {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                        autoHideDuration: 3000,
                    });
                }
            }))
                ;
        }
        catch (e) {
            console.log(e);
        }
    }

    const AddMessage = async (message) => {
        try {
            await connection.invoke('AddMessage', currentRoomId, message, cookies.name).then(connection.invoke('ClickedRoom', currentRoomId).then((result) => {
                setMessages(result)
                setCurrentRoomId(currentRoomId);
                setLoadingMessages(true)

            }))
                ;
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <Grid
            container
        >
            <Grid item xs={4}>
                {
                    <div>
                        {isLoadingRooms && <div><ChatRoomList rooms={rooms} ClickedRoom={ClickedRoom} />
                            <AddChatRoomForm AddChatRoom={AddChatRoom} roomId={currentRoomId} /> </div>}
                    </div>}
            </Grid>
            <Grid item xs={8} alignItems="flex-start">
                {isLoadingMessages && <div>
                    <MessageList messages={messages} />
                    <AddMessageForm AddMessage={AddMessage} />
                </div>}
            </Grid>
        </Grid>
    );
}