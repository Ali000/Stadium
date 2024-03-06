import * as React from "react"
import { Box } from "@mui/material"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import HomeIcon from "@mui/icons-material/Home"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import InfoSharpIcon from "@mui/icons-material/InfoSharp"
import StadiumIcon from "@mui/icons-material/Stadium"
import SportsFootballIcon from "@mui/icons-material/SportsFootball"
import GroupsIcon from "@mui/icons-material/Groups"
import { Link } from "react-router-dom"
import { ListSubheader } from "@mui/material"
const Nav = ({ user, logOut }) => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListSubheader>All lists:</ListSubheader>
        {["StadiumsList", "MatchesList", "TeamsList"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link
              to={`/${text.replace(/\s/g, "").toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <StadiumIcon color="success" /> : null}
                  {index === 1 ? <SportsFootballIcon color="success" /> : null}
                  {index === 2 ? <GroupsIcon color="success" /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Settings:</ListSubheader>
        {["Home", "Profile", "About"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <Link
              to={`/${text.replace(/\s/g, "").toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index === 0 ? <HomeIcon color="success" /> : null}
                  {index === 1 ? <AccountBoxIcon color="success" /> : null}
                  {index === 2 ? <InfoSharpIcon color="success" /> : null}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <div>
      <nav className="nav-bar ">
        <Button className="Button-Drawer" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <div className="Login">
          {user ? (
            <Link onClick={logOut}>
              Logout
              <LogoutIcon />
            </Link>
          ) : (
            <Link to="/Login">
              Login <LoginIcon />
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
export default Nav
