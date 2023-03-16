import * as React from 'react';
import * as signalR from "@microsoft/signalr";
import { useCookies } from 'react-cookie'

export const ChatHub = () => {
    const [ connection, setConnection ] = React.useState(null);
    const [messages, setMessages] = React.useState([]);

    const [cookies, setCookie] = useCookies(['token', 'name']);

    const {name}=cookies.name;

    //redux primesti username-ul si currentRoom

    React.useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('/chathub')
            .withAutomaticReconnect()
            .build();
        
        setConnection(newConnection);
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', message => {
                       
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    // Render method and other component logic goes here
}