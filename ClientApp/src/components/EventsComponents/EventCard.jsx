import * as React from 'react';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { CardActionArea, Card, CardContent, CardMedia, Typography, Grid, Divider, Avatar, Stack } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


const getImage = (id) => {

  switch (id) {
    case 0:
      return 'https://media.istockphoto.com/id/1326509192/photo/lush-green-canopy-of-beech-trees-with-a-sun-star-and-rays-of-sunlight-peeking-through.jpg?s=170667a&w=0&k=20&c=KSGZ-WuBvklnMeng7Nh9CvntwbFN6PiPzxqqtHRHSIU='
    case 1:
      return "https://img.freepik.com/free-photo/book-with-green-board-background_1150-3836.jpg?w=2000"
    case 2:
      return "https://img.freepik.com/premium-vector/people-park-happy-men-women-sitting-bench-city-summer-spring-park-walking-group-yoga-class-outdoor-nature-romantic-dates-children-play-riding-bicycle-vector-colorful-cartoon-concept_176411-3123.jpg?w=2000"
    case 3:
      return "https://media.istockphoto.com/photos/modern-empty-temporary-intensive-care-emergency-room-is-ready-to-picture-id1295301481?b=1&k=20&m=1295301481&s=612x612&w=0&h=rNsbLRIlgPc67UZbXTzlA5PkgUDtS1o4jLK3tonpl8s="
    case 4:
      return "https://thumbs.dreamstime.com/b/sport-equipment-2-22802518.jpg"
    default:
      return "https://st2.depositphotos.com/3591429/6307/i/450/depositphotos_63075279-stock-photo-hands-holding-the-word-volunteer.jpg"
  }


}

export const EventCard = (props) => {

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token', 'name'])
  const [loading, setLoading] = React.useState(false)
  const [participateUsers, setParticipateUsers] = React.useState([]);

  React.useEffect(() => {
    populateUsersData()
    setLoading(true);

  }, [])

  const populateUsersData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'JWT-Token': cookies.token },
    };
    fetch("JoinedEvent/ovload/" + props.id, requestOptions)
      .then(res => res.json().then(json => ({
        headers: res.headers,
        json
      })))
      .then(({ headers, json }) => {

        setParticipateUsers(json.map(user => user.username))

      })
  }

  //ne duce la pagina evenimentului cu id-ul x
  const routeEventPage = () => {
    navigate(`${props.id}`)
  }

  return (
    <div>
      {loading && (
        <Card
          sx={{
            boxShadow: 3,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderRadius: 2,
            maxWidth: "20vw",
            minWidth: "200px",
            marginTop: "6px"
          }}
        >
          <CardActionArea onClick={() => routeEventPage()}>
            <CardMedia
              component="img"
              image={getImage(props.type)}
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
                        {props.date.slice(0, -9)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid item xs>
                      {props.participate.includes(props.id) && <DoneSharpIcon />}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <Divider light />
            <Stack direction="row" spacing={1} sx={{ p: 2 }}>
              {participateUsers.length !== 0 ? (
                participateUsers.slice(0, 4).map((user) => (
                  <Avatar
                    key={user}
                    src={`https://avatars.dicebear.com/api/personas/${user}.svg`}
                  />
                ))
              ) : (
                <div style={{ width: "7vw" }}>Be the first to join!</div>
              )}
            </Stack>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}