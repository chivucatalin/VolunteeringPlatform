import * as React from 'react';
import {
  Avatar, AppBar, Box, Toolbar, Typography,
  IconButton, Menu, MenuItem, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import jwt from 'jwt-decode'
import LogoutIcon from '@mui/icons-material/Logout';



const settings = ['Profile', 'Archive', 'Orders and Payments'];

//navigation bar-ul cu paginile de acces si contul tau
export const NavMenu = () => {
  const navigate = useNavigate();
  const [cookies ,setCookie,removeCookie] = useCookies(['token','name'])
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [createEventShow, setCreateEventShow] = React.useState(false)

  React.useEffect(() => {
    const user = jwt(cookies.token);
    if (user.admin === "True") setCreateEventShow(true)
  }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            borderRadius: 1, flexGrow: 1
          }}>
            <Typography variant="h6" component="div" sx={{
              p: 1,
              m: 1
            }}
              onClick={() => {
                navigate('')
              }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{
              p: 1,
              m: 1
            }}
              onClick={() => {
                navigate(`event-page`)
              }}>
              Events
            </Typography>
            <Typography variant="h6" component="div" sx={{
              p: 1,
              m: 1
            }}>
              Messages
            </Typography>
            {createEventShow && (
              <Typography variant="h6" component="div" sx={{
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
                removeCookie('user');
                navigate('/')
                window.location.reload(false)
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={`https://avatars.dicebear.com/api/personas/${cookies.name}.svg`} />
          </IconButton>
        </Toolbar>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </AppBar>
    </Box>
  );
}