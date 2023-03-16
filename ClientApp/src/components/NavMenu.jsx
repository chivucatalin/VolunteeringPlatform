import * as React from 'react';
import {
  Avatar, AppBar, Box, Toolbar, Typography,
  IconButton, Menu, MenuItem, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwt from 'jwt-decode'
import LogoutIcon from '@mui/icons-material/Logout';

//navigation bar-ul cu paginile de acces si contul tau
export const NavMenu = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookies ,setCookie,removeCookie] = useCookies(['token','name'])
  const [createEventShow, setCreateEventShow] = React.useState(false)

  React.useEffect(() => {
    const user = jwt(cookies.token);
    if (user.admin === "True") setCreateEventShow(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography variant="h6" component="div" sx={{
              cursor:'pointer',
              p: 1,
              m: 1
            }}
              onClick={() => {
                navigate('')
              }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{
              cursor:'pointer',
              p: 1,
              m: 1
            }}
              onClick={() => {
                navigate(`event-page`)
              }}>
              Events
            </Typography>
            <Typography variant="h6" component="div" sx={{
              cursor:'pointer',
              p: 1,
              m: 1
            }} onClick={() => {
              navigate(`chatroom`)
            }}>
              Messages
            </Typography>
            {createEventShow && (
              <Typography variant="h6" component="div" sx={{
                cursor:'pointer',
                p: 1,
                m: 1
              }}
                onClick={() => {
                  navigate(`create-event`)
                }}>
                Create Event
              </Typography>)}
          </Box>
          <Tooltip title={"Logout"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                removeCookie('token');
                removeCookie('name');
                navigate('/')
                window.location.reload(false)
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <Avatar alt="Remy Sharp" sx={{ p: 0 }} src={`https://avatars.dicebear.com/api/personas/${cookies.name}.svg`} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}