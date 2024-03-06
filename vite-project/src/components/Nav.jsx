import * as React from 'react'
import { Box } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import InfoSharpIcon from '@mui/icons-material/InfoSharp'
import StadiumIcon from '@mui/icons-material/Stadium'
import SportsFootballIcon from '@mui/icons-material/SportsFootball'
import GroupsIcon from '@mui/icons-material/Groups'
import { Link } from 'react-router-dom'
import { ListSubheader } from '@mui/material'
const Nav = ({ user, logOut }) => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {user ? (
          <>
            {user?.role === 'customer' &&
              ['MatchesList', 'TeamsList'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <Link
                    to={`/${text.replace(/\s/g, '').toLowerCase()}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {index === 0 && <SportsFootballIcon color="success" />}
                        {index === 1 && <GroupsIcon color="success" />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}

            {(user?.role === 'Admin' || user?.role === 'enterprise') &&
              ['StadiumsList', 'MatchesList', 'TeamsList'].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <Link
                      to={`/${text.replace(/\s/g, '').toLowerCase()}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          {index === 0 && <StadiumIcon color="success" />}
                          {index === 1 && (
                            <SportsFootballIcon color="success" />
                          )}
                          {index === 2 && <GroupsIcon color="success" />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )
              )}
          </>
        ) : (
          <ListItem key="default" disablePadding>
            <Link
              to="/matcheslist"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <SportsFootballIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="MatchesList" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}

        <Divider />
      </List>
      <List>
        {user ? (
          [
            { text: 'Home', icon: <HomeIcon color="success" />, path: 'home' },
            {
              text: 'Profile',
              icon: <AccountBoxIcon color="success" />,
              path: 'profile'
            },
            {
              text: 'About',
              icon: <InfoSharpIcon color="success" />,
              path: 'about'
            }
          ].map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <Link
                to={`/${path}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))
        ) : (
          <ListItem key="default" disablePadding>
            <Link
              to="/home"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>
          </ListItem>
        )}
      </List>
    </Box>
  )

  return (
    <div>
      <nav className="nav-bar ">
        <Button className="Button-Drawer" onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: '#f0a500', fontSize: 20 }} />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <div className="Login">
          {user ? (
            <Link onClick={logOut} to="/home">
              <span className="Logout-Nav">
                Logout
                <LogoutIcon style={{ color: '#f0a500', fontSize: 20 }} />
              </span>
            </Link>
          ) : (
            <Link to="/Login">
              <span className="Logout-Nav">
                Login <LoginIcon style={{ color: '#f0a500', fontSize: 20 }} />
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
export default Nav
