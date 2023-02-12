import * as React from 'react';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import { CardActionArea,Card,CardContent,CardMedia,Typography,Grid,Divider,Avatar,Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";



const faces = [
  "https://i.pravatar.cc/300?img=1",
  "https://i.pravatar.cc/300?img=2",
  "https://i.pravatar.cc/300?img=3",
  "https://i.pravatar.cc/300?img=4"
];

export const EventCard=(props)=>{
  //verifica daca evenimentul este al asocietiei de care faci parte/participi la acest eveniment
  const ownEvent=( ) => { return <PersonSharpIcon/ >}
  const joinedEvent=( ) => { return <DoneSharpIcon/ >}
  const navigate= useNavigate();

  //ne duce la pagina evenimentului cu id-ul x
  const routeEventPage=()=>{
    navigate(`${props.id}`)
  }

  return (
    <Card sx={{
      boxShadow: 3,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
      color: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
      borderRadius: 2,
      maxWidth:'20vw'
    }}>
      <CardActionArea onClick={()=>routeEventPage()}>
        <CardMedia
          component="img"
          image="https://st2.depositphotos.com/3591429/6307/i/450/depositphotos_63075279-stock-photo-hands-holding-the-word-volunteer.jpg"
          height="100"
          alt="green iguana"
        />
        <CardContent>
        <Grid container spacing={3}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
               {props.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
               {props.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.date.slice(0,-9)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item >
            <Grid item xs >
               {ownEvent()}
            </Grid>
            <Grid item xs >
               {joinedEvent()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        </CardContent>
        <Divider  light />
        <Stack direction="row" spacing={1} sx={{p:2}}>
          {faces.map(face => (
            <Avatar  key={face} src={face} />
          ))}
          </Stack>
      </CardActionArea>
    </Card>
  );
}